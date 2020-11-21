import React from "react";
import EnemigoFacil from "../components/enemigos/Nivel/Facil";
import EnemigoNormal from "../components/enemigos/Nivel/Normal";
import EnemigoDificil from "../components/enemigos/Nivel/Dificil";
import Daniel from "../components/enemigos/Nivel/Dani";
import { withAuth } from "../lib/AuthProvider";

let Juego = (props) => {
  return (
    <>
      {props.location.state.dificultad === "facil" ? (
        <EnemigoFacil
          personaje={props.location.state.personaje}
          amountKill={props.location.state.amountKills}
          amountVinculos={props.location.state.amountVinculos}
          user={props.user.facilKill}
        />
      ) : null}
      {props.location.state.dificultad === "normal" ? (
        <EnemigoNormal
          personaje={props.location.state.personaje}
          amountKill={props.location.state.amountKills}
          amountVinculos={props.location.state.amountVinculos}
          user={props.user.normalKill}
        />
      ) : null}
      {props.location.state.dificultad === "dificil" ? (
        <EnemigoDificil
          personaje={props.location.state.personaje}
          amountKill={props.location.state.amountKills}
          amountVinculos={props.location.state.amountVinculos}
          user={props.user.dificilKill}
        />
      ) : null}
      {props.location.state.dificultad === "dani" ? (
        <Daniel
          personaje={props.location.state.personaje}
          amountKill={props.location.state.amountKills}
          amountVinculos={props.location.state.amountVinculos}
          user={props.user.daniKill}
        />
      ) : null}
    </>
  );
};

export default withAuth(Juego);
