import React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import ReactAudioPlayer from "react-audio-player";
import astronomia from "../musica/Astronomia.mp3";

let LandingPage = (props) => {
  return (
    <>
     <audio autoPlay>
        <source src={astronomia} />
      </audio>
      <div className="fondo-landing-page">
        <h1 className="title-landing-page">IRON LEAGUE</h1>
       
  {/* <button onClick={() => props.logout()}></button> */}
        <Link to="/validacion" style={{ textDecoration: "none" }}>
          <h2 className="empezar-landing-page">Empezar</h2>
        </Link>
      </div>
    </>
  );
};

export default withAuth(LandingPage);
