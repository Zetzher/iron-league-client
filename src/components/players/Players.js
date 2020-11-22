import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import zeldaPlayers from "../../musica/zelda-escogerPersonaje.mp3";
import Flip from "react-reveal/Flip";
import ReactAudioPlayer from "react-audio-player";

let Players = (props) => {
  let [listadoPlayers, setListadoPlayers] = useState();
  let getPlayers = async () => {
    try {
      let petition = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URI}/players`,
      });
      let players = petition.data;
      setListadoPlayers(players);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <>
      <ReactAudioPlayer src={zeldaPlayers} autoPlay volume={0.4} />
      <div className="flex-carousel">
        <Flip>
          {listadoPlayers ? (
            listadoPlayers.map((data) => (
              <span
                key={data._id}
                className="span-players"
                style={{
                  backgroundImage: `url(${data.carta_url})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  color: "black",
                }}
              >
                <img
                  src={data.image_url}
                  className="fotos-alumnos"
                  alt="alumnos"
                ></img>
                <span className="posicion-escoger-pnj">
                  <h1
                    className="nombre"
                    style={{ backgroundColor: `rgba(${data.color[1]}, 0.5)` }}
                  >
                    {data.nombre}
                  </h1>
                  {props.actualUserInfo.personaje.find(
                    (datos) => datos.nombre === data.nombre
                  ) ? (
                    <h4 style={{ paddingTop: 30, fontSize: 30 }}>{null}</h4>
                  ) : (
                    <Link
                      to={{
                        pathname: "/estas-seguro-?",
                        state: {
                          id: data._id,
                          personaje: data,
                          actualUserInfo: props.actualUserInfo,
                        },
                      }}
                      style={{
                        textDecoration: "none",
                        marginTop: 10,
                        backgroundColor: `rgba(255, 255, 255, 0.7)`,
                        marginLeft: 10,
                      }}
                    >
                      <h3 className="seleccionar-boton-personaje">
                        Seleccionar
                      </h3>
                    </Link>
                  )}
                </span>
              </span>
            ))
          ) : (
            <h5>Waiting for response</h5>
          )}
        </Flip>
      </div>
    </>
  );
};

export default withAuth(Players);
