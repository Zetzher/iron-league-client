import React from "react";
import { Link } from "react-router-dom";
import introduccionJose from "../musica/definitivo-introduccion.mp3";
import ReactAudioPlayer from "react-audio-player";

let Introduccion = () => {
  return (
    <>
      <ReactAudioPlayer src={introduccionJose} autoPlay />
      <div className="fondo-introduccion-page">
        <article>
          <h1 className="introduccion-1">
            Érase una vez, 29 alumnos que decidieron dar un giro de 180º a sus
            vidas y el destino los reunió en una aventura de una magnitud épica.
          </h1>
          <h1 className="introduccion-2">
            Sabían como iba a empezar, pero ni siquiera pueden imaginar el
            desenlace que les depara.
          </h1>
          <h1 className="introduccion-3">
            Solo unos pocos conseguirán llegar a la gran cima en la que se
            enfrentarán al final.
          </h1>
          <h1 className="introduccion-4">
            Pero dependiendo de sus acciones, hará que esta historia se
            desarrolle de una forma u otra.
          </h1>
          <h1 className="introduccion-5">
            Estaré observando todas vuestras acciones aténtamente.
          </h1>
          <h1 className="introduccion-6">
            Ahora, ¡Armaos de valor y osadía, pues comienza vuestra aventura,
            insensatos!
          </h1>
        </article>
        <Link to="/perfil" className="introduccion-7">
          Comenzar
        </Link>
      </div>
    </>
  );
};

export default Introduccion;
