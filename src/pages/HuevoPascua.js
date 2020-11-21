import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useHistory } from "react-router";

let HuevoPascua = () => {
  const history = useHistory();


  let Redirigir = () => {
    setTimeout(() => {
      history.push({
        pathname: "/perfil"
      })
    }, 44000)
  }


  useEffect(() => {
    Redirigir()
  }, [])
  return (
    <>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=YT_n2NGOZMo"
        volume="0.4"
        playing
        width="100%"
        height="100vh"
      />
    </>
  );
};

export default HuevoPascua;
