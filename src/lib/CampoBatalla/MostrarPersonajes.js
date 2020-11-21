import React from "react";
import CampoBatalla from "./CampoBatalla";
import { withAuth } from "../../lib/AuthProvider";

let MostrarPersonajes = (props) => {
  return (
    <>
      <CampoBatalla enemigo={props.enemigo} enemigoStats={props.stats} player={props.player} audio={props.audio} kills={props.killAmount} vinculos={props.amountVinculos} />
    </>
  );
};

export default withAuth(MostrarPersonajes);
