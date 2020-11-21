import React from "react";
import Players from "../components/players/Players";

let ChooseCharacter = (props) => {

  return (
    <>
      <div className="fondo-choose-character">
        <Players actualUserInfo={props.location.state.actualUserInfo} />
      </div>
    </>
  );
};

export default ChooseCharacter;
