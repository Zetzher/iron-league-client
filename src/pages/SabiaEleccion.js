import React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import zeldaSabiaEleccion from "../musica/zelda-confirmarpersonaje.mp3";
import ReactAudioPlayer from "react-audio-player";

let SabiaEleccion = (props) => {
  return (
    <>
     <ReactAudioPlayer src={zeldaSabiaEleccion} autoPlay />
      <section className="page-eleccion">
        <h1 className="link-perfil-eleccion-main-text">Mira tu Cuenta</h1>
        <div className="animation-for-sub-text">
          <Link to="/perfil" style={{ textDecoration: "none" }}>
            <h1 className="link-perfil-eleccion-sub-text">Gracias</h1>
          </Link>
        </div>
      </section>
    </>
  );
};

export default withAuth(SabiaEleccion);
