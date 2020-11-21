import React, { useEffect, useState } from "react";
import axios from "axios";
import EnemigoFacil from '../../../lib/CampoBatalla/MostrarPersonajes';
import enemigoFacilMusica from '../../../musica/enemigoFacil.mp3';

let FacilEnemigo = (props) => {
  let [enemigo, setEnemigo] = useState();



  let infoEnemigo = async () => {
    try {
      let petition = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URI}/enemigos`,
      });
      let filterFacil = await petition.data.filter(
        (data) => data.nivelEnemigo === "facil"
      );

      setEnemigo(filterFacil[Math.floor(Math.random() * filterFacil.length)]);
      
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    infoEnemigo();
  }, []);

  return enemigo ? <EnemigoFacil estado={'facil'} enemigo={enemigo} stats={enemigo.stats} player={props.personaje} audio={enemigoFacilMusica} killAmount={props.amountKill}  amountVinculos={props.amountVinculos} /> : null;
};

export default FacilEnemigo;
