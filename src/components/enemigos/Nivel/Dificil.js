import React, { useEffect, useState } from "react";
import axios from "axios";
import EnemigoDificil from '../../../lib/CampoBatalla/MostrarPersonajes';

import enemigoDificilMusica from '../../../musica/enemigoDificil.mp3';

let HabilidadesEnemigos = (props) => {
    let [enemigo, setEnemigo] = useState();

  let infoEnemigo = async () => {
    try {
      let petition = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URI}/enemigos`,
      });
      
      let filterDificil = await petition.data.filter(
        (data) => data.nivelEnemigo === "dificil"
      );

      setEnemigo(
        filterDificil[Math.floor(Math.random() * filterDificil.length)]
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    infoEnemigo();
  }, []);

  return enemigo ? <EnemigoDificil estado={'dificil'} enemigo={enemigo} stats={enemigo.stats} player={props.personaje} audio={enemigoDificilMusica} killAmount={props.amountKill} amountVinculos={props.amountVinculos} /> : null;
};

export default HabilidadesEnemigos;
