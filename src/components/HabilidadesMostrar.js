import React from "react";

let HabilidadesMostrar = (props) => {

  return (
    <>
        {props.descripcion.descripcion.habilidades.descripcion_habilidades.map((data) => {
              return <><h2>{data}</h2><br></br></>;
            })}
    </>
  );
};

export default HabilidadesMostrar;
