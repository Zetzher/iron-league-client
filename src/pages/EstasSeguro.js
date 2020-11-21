import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import { useHistory } from "react-router-dom";

let EstasSeguro = (props) => {
  let history = useHistory();
  console.log(props, 'actualUser')

  let pushPersonaje = async (personaje) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URI}/user/pushPlayer/${props.user._id}`,
        { personaje }
      );

      history.push({ pathname: "/sabia-eleccion" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex-carousel-seguro">
        <span className="span-players-eleccion-seguro">
          <span className="posicion-img-nombre-tipo-seguro">
            <img
              src={props.location.state.personaje.image_url}
              className="fotos-alumnos-seguro"
              alt="alumnos"
            ></img>
            <h1 className="nombre-seguro">
              {props.location.state.personaje.nombre}
            </h1>
            <h2 className="tipo-eleccion">
              {props.location.state.personaje.tipo}
            </h2>
          </span>
          <span className="posicion-habilidades-seguro">
            {props.location.state.personaje.habilidades.descripcion_habilidades.map(
              (data) => (
                <h2 className="habilidades-eleccion" style={{ marginTop: 5 }}>
                  {data}
                </h2>
              )
            )}

            <div className="posicion-botones-eleccion">
              <button
                onClick={() => pushPersonaje(props.location.state.personaje)}
                style={{ background: "none", border: "none" }}
              >
                <h3 className="seleccionar-boton-seguro-personaje">
                  Confirmar
                </h3>
              </button>
              <Link
                to={{
                  pathname: "/escoge-bien-a-tu-personaje",
                  state: {
                    id: props.location.state.personaje._id,
                    actualUserInfo: props.location.state.actualUserInfo,
                  },
                }}
                style={{ textDecoration: "none" }}
              >
                <h3 className="seleccionar-boton-seguro-personaje">Volver</h3>
              </Link>
            </div>
          </span>
        </span>
      </div>
    </>
  );
};

export default withAuth(EstasSeguro);
