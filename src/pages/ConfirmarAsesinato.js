import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import { useHistory } from "react-router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";
import { faFistRaised } from "@fortawesome/free-solid-svg-icons";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import died_darksouls from "../musica/AsesinatoConfirmado.mp3";
import ReactAudioPlayer from "react-audio-player";

let ConfirmarAsesinato = (props) => {
  let [equipoRandom, setEquipoRandom] = useState();
  const history = useHistory();

  let getObjects = async () => {
    let llamada = await axios.get(`${process.env.REACT_APP_API_URI}/objetos`);

    let armaFiltrada = llamada.data[0].armas.filter(
      (objetoApi) =>
        !props.location.state.player.objeto.some(
          (objetoPlayer) => objetoPlayer._id === objetoApi._id
        )
    );
    let armaduraFiltrada = llamada.data[0].armaduras.filter(
      (objetoApi) =>
        !props.location.state.player.objeto.some(
          (objetoPlayer) => objetoPlayer._id === objetoApi._id
        )
    );
    let auraFiltrada = llamada.data[0].auras.filter(
      (objetoApi) =>
        !props.location.state.player.objeto.some(
          (objetoPlayer) => objetoPlayer._id === objetoApi._id
        )
    );
    let arrayRandomEquipo = [
      {
        objeto: armaFiltrada[Math.floor(Math.random() * armaFiltrada.length)],
      },
      {
        objeto:
          armaduraFiltrada[Math.floor(Math.random() * armaduraFiltrada.length)],
      },
      {
        objeto: auraFiltrada[Math.floor(Math.random() * auraFiltrada.length)],
      },
    ];
    setEquipoRandom(arrayRandomEquipo);
  };
  let subidaServidorObjeto = async (objeto) => {
    if (props.location.state.dificultad === "facil") {
      let dificultad = "facilKill";
      props.location.state.player.objeto.push(objeto);
      await axios.post(
        `${process.env.REACT_APP_API_URI}/perfil/${props.user._id}/personajePull`,
        { nombre: props.location.state.player.nombre }
      );
      await axios.post(
        `${process.env.REACT_APP_API_URI}/objetos/${props.user._id}/pushObjeto`,
        { player: props.location.state.player, objeto }
      );
      await axios.post(
        `${process.env.REACT_APP_API_URI}/user/pushKill/${props.user._id}`,
        { dificultad, cantidadKill: props.location.state.kill }
      );
      return history.push({
        pathname: "/perfil",
      });
    } else if (props.location.state.dificultad === "normal") {
      let dificultad = "normalKill";
      props.location.state.player.objeto.push(objeto);
      await axios.post(
        `${process.env.REACT_APP_API_URI}/perfil/${props.user._id}/personajePull`,
        { nombre: props.location.state.player.nombre }
      );
      await axios.post(
        `${process.env.REACT_APP_API_URI}/objetos/${props.user._id}/pushObjeto`,
        { player: props.location.state.player, objeto }
      );
      await axios.post(
        `${process.env.REACT_APP_API_URI}/user/pushKill/${props.user._id}`,
        { dificultad, cantidadKill: props.location.state.kill }
      );
      return history.push({
        pathname: "/perfil",
      });
    } else if (props.location.state.dificultad === "dificil") {
      let dificultad = "dificilKill";
      props.location.state.player.objeto.push(objeto);
      await axios.post(
        `${process.env.REACT_APP_API_URI}/perfil/${props.user._id}/personajePull`,
        { nombre: props.location.state.player.nombre }
      );
      await axios.post(
        `${process.env.REACT_APP_API_URI}/objetos/${props.user._id}/pushObjeto`,
        { player: props.location.state.player, objeto }
      );
      await axios.post(
        `${process.env.REACT_APP_API_URI}/user/pushKill/${props.user._id}`,
        { dificultad, cantidadKill: props.location.state.kill }
      );
      return history.push({
        pathname: "/perfil",
      });
    } else if (props.location.state.dificultad === "daniel") {
      let dificultad = "daniKill";
      props.location.state.player.objeto.push(objeto);
      await axios.post(
        `${process.env.REACT_APP_API_URI}/perfil/${props.user._id}/personajePull`,
        { nombre: props.location.state.player.nombre }
      );
      await axios.post(
        `${process.env.REACT_APP_API_URI}/user/pushKill/${props.user._id}`,
        { dificultad, cantidadKill: props.location.state.kill }
      );
      await axios.post(
        `${process.env.REACT_APP_API_URI}/objetos/${props.user._id}/pushObjeto`,
        { player: props.location.state.player, objeto }
      );
      return history.push({
        pathname: "/perfil",
      });
    }
  };

  useEffect(() => {
    getObjects();
  }, []);

  return (
    <>
      <ReactAudioPlayer src={died_darksouls} autoPlay />
      <section className="page-eleccion-asesinato">
        <h1 className="link-perfil-eleccion-main-text-asesinato">
          Asesinato Confirmado
        </h1>
        <h1 className="link-perfil-eleccion-sub-text-asesinato">
          Escoge un Objeto
        </h1>
        <span className="posicion-objetos-confirmar-asesinato">
          {equipoRandom
            ? equipoRandom.map((data) => {
                return (
                  <div key={data._id}>
                    <button onClick={() => subidaServidorObjeto(data.objeto)}>
                      <h2>{data.objeto.nombre}</h2>
                      <h3>{data.objeto.efecto}</h3>
                    </button>
                  </div>
                );
              })
            : null}
        </span>
      </section>
    </>
  );
};

export default withAuth(ConfirmarAsesinato);
