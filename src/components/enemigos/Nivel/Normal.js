import React, { useEffect, useState } from "react";
import axios from "axios";
import EnemigoNormal from '../../../lib/CampoBatalla/MostrarPersonajes';
import enemigoNormalMusica from '../../../musica/enemigoNormal.mp3';
import { withAuth } from "../../../lib/AuthProvider";

let HabilidadesEnemigos = (props) => {
    let [enemigo, setEnemigo] = useState();

  let infoEnemigo = async () => {
    try {
      let petition = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URI}/enemigos`,
      });
      let filterNormal = await petition.data.filter(
        (data) => data.nivelEnemigo === "normal"
      );

      setEnemigo(
        filterNormal[Math.floor(Math.random() * filterNormal.length)]
      );
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    infoEnemigo();
  }, []);
  return enemigo ? <EnemigoNormal estado={'normal'} enemigo={enemigo} stats={enemigo.stats} player={props.personaje} audio={enemigoNormalMusica} killAmount={props.amountKill} amountVinculos={props.amountVinculos} /> : null;
};

export default withAuth(HabilidadesEnemigos);
