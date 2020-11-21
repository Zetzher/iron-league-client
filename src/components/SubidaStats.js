import React, { useState, useEffect } from "react";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";
import { faFistRaised } from "@fortawesome/free-solid-svg-icons";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";

let SubidaStats = (props) => {
  let [motivacion, setMotivacion] = useState();
  let [fuerza, setFuerza] = useState();
  let [habilidad, setHabilidad] = useState();
  let [vinculo, setVinculo] = useState();
  let [statsGanados, setStatsGanados] = useState();
  let history = useHistory();
  //STATS MÍNIMOS
  let [motivacionMinima, setMotivacionMinima] = useState();
  let [fuerzaMinima, setFuerzaMinima] = useState();
  let [habilidadMinima, setHabilidadMinima] = useState();
  let pushStats = async () => {
    try {
      let player = props.player;
      player.stats = {
        fuerza: fuerza,
        habilidad: habilidad,
        vinculo: vinculo,
      };
      player.motivación = motivacion;
      player.asesinatos = props.enemigoAsesinado;
      console.log(player, 'player')
      history.push({
        pathname: "/confirmar-asesinato",
        state: {
          player: player,
          dificultad: props.dificultad,
          kill: props.kills,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  let situarStats = () => {
    setMotivacion(props.player.motivación);
    setFuerza(props.player.stats.fuerza);
    setHabilidad(props.player.stats.habilidad);
    setVinculo(props.player.stats.vinculo);
    setStatsGanados(props.puntosStats);
    setMotivacionMinima(props.player.motivación);
    setFuerzaMinima(props.player.stats.fuerza);
    setHabilidadMinima(props.player.stats.habilidad);
  };
  let subirStats = (props) => {
    switch (props) {
      case "masMot":
        if (statsGanados > 0) {
          setStatsGanados(statsGanados - 1);
          setMotivacion(motivacion + 1);
        }
        break;
      case "menosMot":
        if (motivacion > motivacionMinima) {
          setStatsGanados(statsGanados + 1);
          setMotivacion(motivacion - 1);
        }
        break;
      case "masFu":
        if (statsGanados > 0) {
          setStatsGanados(statsGanados - 1);
          setFuerza(fuerza + 1);
        }
        break;
      case "menosFu":
        if (fuerza > fuerzaMinima) {
          setStatsGanados(statsGanados + 1);
          setFuerza(fuerza - 1);
        }
        break;
      case "masHab":
        if (statsGanados > 0) {
          setStatsGanados(statsGanados - 1);
          setHabilidad(habilidad + 1);
        }
        break;
      case "menosHab":
        if (habilidad > habilidadMinima) {
          setStatsGanados(statsGanados + 1);
          setHabilidad(habilidad - 1);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    situarStats();
  }, []);

  return (
    <>
      <div className="subida-stats-position">
        <div className="subida-stats-container">
          <h2>Reparte tus puntos {statsGanados}</h2>
          <span style={{ display: "flex", flexDirection: "row" }}>
            <button
              onClick={() => subirStats("menosMot")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                marginRight: 20,
                background: "none",
                border: "none",
              }}
            >
              <h3>-</h3>
            </button>
            <h3>
              {" "}
              <FontAwesomeIcon
                icon={faHeartbeat}
                style={{ fontSize: 30 }}
              />{" "}
              {motivacion}
            </h3>
            <button
              onClick={() => subirStats("masMot")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                marginLeft: 20,
                background: "none",
                border: "none",
              }}
            >
              <h3>+</h3>
            </button>
          </span>
          <span style={{ display: "flex", flexDirection: "row" }}>
            <button
              onClick={() => subirStats("menosFu")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                marginRight: 20,
                background: "none",
                border: "none",
              }}
            >
              <h3>-</h3>
            </button>
            <h3>
              <FontAwesomeIcon icon={faFistRaised} style={{ fontSize: 30 }} />{" "}
              {fuerza}
            </h3>
            <button
              onClick={() => subirStats("masFu")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                marginLeft: 20,
                background: "none",
                border: "none",
              }}
            >
              <h3>+</h3>
            </button>
          </span>
          <span style={{ display: "flex", flexDirection: "row" }}>
            <button
              onClick={() => subirStats("menosHab")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                marginRight: 20,
                background: "none",
                border: "none",
              }}
            >
              <h3>-</h3>
            </button>
            <h3>
              <FontAwesomeIcon icon={faHatWizard} style={{ fontSize: 30 }} />
              {habilidad}
            </h3>
            <button
              onClick={() => subirStats("masHab")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                marginLeft: 20,
                background: "none",
                border: "none",
              }}
            >
              <h3>+</h3>
            </button>
          </span>
          {statsGanados === 0 ? (
            <button
              onClick={() => pushStats()}
              style={{
                width: 200,
                height: 30,
                border: "none",
                background: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4>Subir los stats</h4>
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default withAuth(SubidaStats);
