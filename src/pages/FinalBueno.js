import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { useHistory } from "react-router-dom";

let FinalBueno = (props) => {
    const history = useHistory();
  let reinicio = async () => {
    let llamada = await axios.post(
      `${process.env.REACT_APP_API_URI}/final/bueno/${props.match.params.id}`
    );
    return llamada;
  };


  let Redirigir = () => {
    setTimeout(() => {
      history.push({
        pathname: "/"
      })
    }, 48000)
  }

  useEffect(() => {
    reinicio();
    Redirigir();
  }, []);

  return (
    <>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=LhK0NXqan14"
        playing
        volume="0.4"
        width="100%"
        height="100vh"
      />
    </>
  );
};

export default FinalBueno;
