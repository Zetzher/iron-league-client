import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import vinculoVictoria from "../musica/VinculoVictoria.mp3";
import axios from "axios";
import { useHistory } from "react-router";
import ReactAudioPlayer from "react-audio-player";

let ConfirmarAmistad = (props) => {
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
      let dificultad = "facilVinculo";
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
        `${process.env.REACT_APP_API_URI}/user/pushVinculo/${props.user._id}`,
        { dificultad, cantidadVinculo: props.location.state.vinculo }
      );
      return history.push({
        pathname: "/perfil",
      });
    } else if (props.location.state.dificultad === "normal") {
      let dificultad = "normalVinculo";
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
        `${process.env.REACT_APP_API_URI}/user/pushVinculo/${props.user._id}`,
        { dificultad, cantidadVinculo: props.location.state.vinculo }
      );
      return history.push({
        pathname: "/perfil",
      });
    } else if (props.location.state.dificultad === "dificil") {
      let dificultad = "dificilVinculo";
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
        `${process.env.REACT_APP_API_URI}/user/pushVinculo/${props.user._id}`,
        { dificultad, cantidadVinculo: props.location.state.vinculo }
      );
      return history.push({
        pathname: "/perfil",
      });
    } else if (props.location.state.dificultad === "daniel") {
      let dificultad = "daniVinculo";
      props.location.state.player.objeto.push(objeto);
      await axios.post(
        `${process.env.REACT_APP_API_URI}/perfil/${props.user._id}/personajePull`,
        { nombre: props.location.state.player.nombre }
      );
      await axios.post(
        `${process.env.REACT_APP_API_URI}/user/pushVinculo/${props.user._id}`,
        { dificultad, cantidadVinculo: props.location.state.vinculo }
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
      <ReactAudioPlayer src={vinculoVictoria} autoPlay />
      <section className="page-eleccion-vinculo">
        <h1 className="link-perfil-eleccion-main-text-vinculo">
          Vínculo Confirmado
        </h1>
        <h1 className="link-perfil-eleccion-sub-text-vinculo">
          Escoge un Objeto
        </h1>
        <span className="posicion-objetos-confirmar-vinculo">
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

export default withAuth(ConfirmarAmistad);
