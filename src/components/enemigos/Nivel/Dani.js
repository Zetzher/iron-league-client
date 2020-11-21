import React, { useEffect, useState } from "react";
import axios from "axios";
import Daniel from '../../../lib/CampoBatalla/MostrarPersonajes';
import enemigoDani from '../../../musica/enemigoDani.mp3';

let HabilidadesEnemigos = (props) => {
  let [dani, setDani] = useState();

  //Estados alterados
  let infoEnemigo = async () => {
    try {
      let petition = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URI}/enemigos`,
      });

      let filterDani = await petition.data.filter(
        (data) => data.nivelEnemigo === "daniel"
      );
      setDani(filterDani);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    infoEnemigo();
  }, []);
  return dani ? <Daniel estado={'dani'} enemigo={dani[0]} stats={dani[0].stats} player={props.personaje} audio={enemigoDani} killAmount={props.amountKill} amountVinculos={props.amountVinculos} /> : null;
};

export default HabilidadesEnemigos;
