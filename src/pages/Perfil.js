import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";
import { faFistRaised } from "@fortawesome/free-solid-svg-icons";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import zeldaPerfil from "../musica/zelda-perfil.mp3";
import Flip from "react-reveal/Flip";
import ReactAudioPlayer from "react-audio-player";

let Perfil = (props) => {
  let [user, setUser] = useState();

  let getPerfil = async () => {
    let llamada = await axios.get(
      `${process.env.REACT_APP_API_URI}/perfil/${props.user._id}`
    );
    setUser(llamada.data);
  };

  let eliminarPnj = async (nombre, pnjId) => {
    await axios.post(
      `${process.env.REACT_APP_API_URI}/perfil/${props.user._id}/personajePull`,
      { nombre }
    );
    getPerfil();
  };

  let BotonEscoger = () => {
    if (user && user.personaje.length === 4) {
      return null;
    } else {
      return (
        <Link
          to={{
            pathname: "/escoge-bien-a-tu-personaje",
            state: { actualUserInfo: user },
          }}
          style={{ textDecoration: "none", width: 300 }}
        >
          <h2 className="escoge-personaje-boton">
            Escoge<br></br>un<br></br>personaje
          </h2>
        </Link>
      );
    }
  };
  console.log(user ? user : null, "user");

  let FinalEscogido = () => {
    if (
      user &&
      user.facilVinculo >= 1 &&
      user.normalVinculo >= 1 &&
      user.dificilVinculo >= 1 &&
      user.facilKill >= 1 &&
      user.normalKill >= 1 &&
      user.dificilKill >= 1
    ) {
      return (
        <Link to={`/finalNeutral/${props.user._id}`} className="link-finales">
          Limbo
        </Link>
      );
    } else if (
      user &&
      user.facilVinculo >= 4 &&
      user.normalVinculo >= 4 &&
      user.dificilVinculo >= 4 &&
      user.daniVinculo >= 1
    ) {
      return (
        <Link to={`/finalBueno/${props.user._id}`} className="link-finales">
          Ciudad de La Luz
        </Link>
      );
    } else if (
      user &&
      user.facilKill >= 4 &&
      user.normalKill >= 4 &&
      user.dificilKill >= 4 &&
      user.daniKill >= 1
    ) {
      return (
        <Link to={`/finalMalo/${props.user._id}`} className="link-finales">
          Infierno
        </Link>
      );
    } else {
      return (
        <Flip top>
          <BotonEscoger />
          <div className="posicion-flex-pnj">
            {user
              ? user.personaje.map((data) => (
                  <div
                    className="flip-container"
                    onTouchStart="this.classList.toggle('hover');"
                    key={data._id}
                  >
                    <div className="flipper">
                      <div
                        className="front"
                        style={{
                          background: "none",
                          border: "5px outset white",
                        }}
                      >
                        <img
                          src={data.image_url}
                          className="fotos-alumnos-profile"
                          alt="alumnos"
                        ></img>
                        <h1 className="nombre-perfil-pnj">{data.nombre}</h1>
                      </div>

                      <div
                        className="back"
                        style={{
                          background: "none",
                        }}
                      >
                        <span className="posicion-stats-back">
                          <FontAwesomeIcon
                            icon={faHeartbeat}
                            style={{ fontSize: 20 }}
                          />
                          <h2 style={{ color: "white" }}>
                            {` Mot.
          ${data.motivación}`}
                          </h2>
                          <FontAwesomeIcon
                            icon={faFistRaised}
                            style={{ fontSize: 20 }}
                          />
                          <h2 style={{ color: "white" }}>
                            {` Fu.
          ${data.stats.fuerza}`}
                          </h2>
                          <FontAwesomeIcon
                            icon={faHatWizard}
                            style={{ fontSize: 20 }}
                          />
                          <h2 style={{ color: "white" }}>
                            {` Ha. 
          ${data.stats.habilidad}`}
                          </h2>
                          <span className="posicion-botones-perfil">
                            <Link
                              to={{
                                pathname: "/nivel",
                                state: { id: data._id, personaje: data },
                              }}
                              style={{ textDecoration: "none" }}
                            >
                              <h3>Jugar</h3>
                            </Link>
                            <button
                              onClick={() => eliminarPnj(data.nombre, data._id)}
                              style={{ background: "none", border: "none" }}
                            >
                              <h3>Eliminar</h3>
                            </button>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </Flip>
      );
    }
  };

  useEffect(() => {
    getPerfil();
  }, []);

  

  return (
    <>
    <ReactAudioPlayer src={zeldaPerfil} autoPlay volume={0.4} />
      <div className="posicion-flex-perfil">
        <FinalEscogido />
        {props.user.rutaNeutral &&
        props.user.rutaBueno &&
        props.user.rutaMalo ? (
          <Link to="/huevoPascua" className="link-gran-creador">
            Gran Creador
          </Link>
        ) : null}
      </div>
    </>
  );
};

export default withAuth(Perfil);
