import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";
import HabilidadesMostrar from "../components/HabilidadesMostrar";
import ReactAudioPlayer from "react-audio-player";
import astronomia from "../musica/Astronomia.mp3";

let Nivel = (props) => {
  let [user, setUser] = useState();
  let [enseñarHabs, setEnseñarHabs] = useState();

  let getPerfil = async () => {
    let llamada = await axios.get(
      `${process.env.REACT_APP_API_URI}/perfil/${props.user._id}`
    );
    setUser(llamada.data);
  };
  let OcultarHabilidades = () => {
    setEnseñarHabs(false);
  };
  let Descripcion = (habilidades) => {
    if (enseñarHabs) {
      return (
        <div className="enseñar-descripcion-habilidades">
          <HabilidadesMostrar descripcion={habilidades} />
          <button
            onClick={() => OcultarHabilidades()}
            className="link-nivel-habilidades"
            style={{ background: "white", color: "black" }}
          >
            Quitar
          </button>
        </div>
      );
    } else {
      return null;
    }
  };

  let EnseñarHabilidades = () => {
    setEnseñarHabs(true);
    Descripcion();
  };

  useEffect(() => {
    getPerfil();
  }, []);

  return (
    <>
      <audio autoPlay>
        <source src={astronomia} />
      </audio>
      <div className="fondo-nivel-pagina">
        <div className="posicion-descripcion-habilidades">
          <Descripcion descripcion={props.location.state.personaje} />
        </div>
        <div className="posicion-nivel-pagina">
          <Link
            to={{
              pathname: "/juego",
              state: {
                personaje: props.location.state.personaje,
                dificultad: "facil",
                amountKills: user ? user.facilKill : null,
                amountVinculos: user ? user.facilVinculo : null,
              },
            }}
            style={{ textDecoration: "none" }}
          >
            <h2 className="link-nivel">Fácil</h2>
          </Link>
          {(user && user.facilKill > 4) || (user && user.facilVinculo > 4) ? (
            <Link
              to={{
                pathname: "/juego",
                state: {
                  personaje: props.location.state.personaje,
                  dificultad: "normal",
                  amountKills: user ? user.normalKill : null,
                  amountVinculos: user ? user.normalVinculo : null,
                },
              }}
              style={{ textDecoration: "none" }}
            >
              <h2 className="link-nivel">Normal</h2>
            </Link>
          ) : null}
          {(user && user.normalKill > 4) || (user && user.normalVinculo > 4) ? (
            <Link
              to={{
                pathname: "/juego",
                state: {
                  personaje: props.location.state.personaje,
                  dificultad: "dificil",
                  amountKills: user ? user.dificilKill : null,
                  amountVinculos: user ? user.dificilVinculo : null,
                },
              }}
              style={{ textDecoration: "none" }}
            >
              <h2 className="link-nivel">Difícil</h2>
            </Link>
          ) : null}
          {(user && user.dificilKill > 4) ||
          (user && user.dificilVinculo > 4) ? (
            <Link
              to={{
                pathname: "/juego",
                state: {
                  personaje: props.location.state.personaje,
                  dificultad: "dani",
                  amountKills: user ? user.daniKill : null,
                  amountVinculos: user ? user.daniVinculo : null,
                },
              }}
              style={{ textDecoration: "none", width: 300 }}
            >
              <h2 className="link-nivel">Boss Final</h2>
            </Link>
          ) : null}
        </div>
        <div className="posicion-boton-nivel-habilidades">
          <button
            onClick={() => EnseñarHabilidades()}
            className="boton-habilidades-nivel"
          >
            <h2 className="link-nivel-habilidades-texto">Habilidades</h2>
          </button>
        </div>
      </div>
    </>
  );
};

export default withAuth(Nivel);
