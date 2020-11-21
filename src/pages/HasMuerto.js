import React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import Scramble from "react-scramble";
import Fortuna from "../musica/oh_fortuna.mp3";
import ReactAudioPlayer from "react-audio-player";

let HasMuerto = (props) => {
  return (
    <>
      <ReactAudioPlayer src={Fortuna} autoPlay />
      <section className="page-eleccion-muerto">
        <h1 className="link-perfil-eleccion-main-text-muerto">Has Muerto</h1>
        <div className="animation-for-sub-text">
          <Link to="/perfil" style={{ textDecoration: "none" }}>
            <h1 className="link-perfil-eleccion-sub-text-muerto">Que pena</h1>
          </Link>
        </div>
        <span className="posicion-enemigo-has-muerto">
          <h1>Te ha matado</h1>
          <h2>{props.location.state.enemigo.nombre}</h2>
          <h3>{props.location.state.enemigo.tipo}</h3>
          <img
            src={props.location.state.enemigo.image_url}
            className="foto-enemigo-has-muerto"
            alt="enemigo-foto"
          ></img>
        </span>
      </section>
    </>
  );
};

export default withAuth(HasMuerto);
