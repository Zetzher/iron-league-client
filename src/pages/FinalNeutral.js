import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useHistory } from "react-router";
import axios from "axios";

let FinalNeutral = (props) => {
  const history = useHistory();
  let reinicio = async () => {
    let llamada = await axios.post(
      `${process.env.REACT_APP_API_URI}/final/neutral/${props.match.params.id}`
    );
    return llamada;
  };

  let Redirigir = () => {
    setTimeout(() => {
      history.push({
        pathname: "/"
      })
    }, 43000)
  }

  
  useEffect(() => {
    reinicio();
    Redirigir();
  }, []);

  return (
    <>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=JTo7Aqsc9_A"
        playing
        volume="0.5"
        width="100%"
        height="100vh"
      />
    </>
  );
};

export default FinalNeutral;
