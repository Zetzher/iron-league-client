import React from "react";
import { withAuth } from "../lib/AuthProvider";
import Signup from "../components/Signup";
import Login from "../components/Login";
import musicaLanding from "../musica/musica_landing.mp3";
import ReactAudioPlayer from "react-audio-player";

let Validacion = () => {
  return (
    <>
     <ReactAudioPlayer src={musicaLanding} autoPlay />
      <div className="fondo-validacion-page">
        <Signup />
        <Login />
      </div>
    </>
  );
};

export default withAuth(Validacion);
