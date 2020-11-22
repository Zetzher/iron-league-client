import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { useHistory } from "react-router-dom";

let FinalMalo = (props) => {
  const history = useHistory();
  let reinicio = async () => {
    let llamada = await axios.post(
      `${process.env.REACT_APP_API_URI}/final/malo/${props.match.params.id}`
    );
    return llamada;
  };

  let Redirigir = () => {
    setTimeout(() => {
      history.push({
        pathname: "/",
      });
    }, 46000);
  };

  useEffect(() => {
    reinicio();
    Redirigir();
  }, []);

  return (
    <>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=MuBsj1nwzgk"
        playing
        volume="0.5"
        width="100%"
        height="100vh"
      />
    </>
  );
};

export default FinalMalo;
