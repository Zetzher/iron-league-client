import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";
import { faFistRaised } from "@fortawesome/free-solid-svg-icons";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import SubidaStats from "../../components/SubidaStats";
import SubidaStatsVinculo from "../../components/SubirStatsVinculo";
import { withAuth } from "../AuthProvider";
import ReactAudioPlayer from "react-audio-player";

let CampoBatalla = (props) => {
  const history = useHistory();

  //PLAYER
  let [fuerzaPlayer, setFuerzaPlayer] = useState();
  let [habilidadPlayer, setHabilidadPlayer] = useState();
  let [vinculoPlayer, setVinculoPlayer] = useState();
  let [motivacionPlayer, setMotivacionPlayer] = useState();

  //ENEMIGO
  let [fuerzaEnemigo, setFuerzaEnemigo] = useState();
  let [habilidadEnemigo, setHabilidadEnemigo] = useState();
  let [vinculoEnemigo, setVinculoEnemigo] = useState();
  let [motivacionEnemigo, setMotivacionEnemigo] = useState();

  //Estados Alterados
  let [contMitadDaño, setContMitadDaño] = useState();
  //End modificar
  let [contIndestructible, setContIndestructible] = useState();
  let [contIndestructibleEnemigo, setContIndestructibleEnemigo] = useState();
  let [contMitadDañoEnemigo, setContMitadDañoEnemigo] = useState();
  let [contVeneno, setContVeneno] = useState();
  let [contVenenoEnemigo, setContVenenoEnemigo] = useState();
  let [contPuntoVital, setContPuntoVital] = useState();

  //ENEMIGO
  let funcionalidadBoton = (info) => {
    let infoLowerCase = info.toLowerCase().split(" ").join("");
    let habilidadesEnemigo =
      props.enemigo.habilidades.nombres[
        Math.floor(Math.random() * props.enemigo.habilidades.nombres.length)
      ];
    let infoLowerCaseEnemigo = habilidadesEnemigo
      .toLowerCase()
      .split(" ")
      .join("");
    let fuerzaMitad = Math.round(fuerzaEnemigo / 2);
    let fuerzaTerciaria = Math.round(fuerzaMitad / 2);
    let fuerzaDoble = Math.round(fuerzaEnemigo * 2);
    let habilidadMitad = Math.round(habilidadEnemigo / 2);
    let vidaTercio = Math.round(motivacionEnemigo / 3);

    if (contVenenoEnemigo > 0) {
      setContVenenoEnemigo(contVenenoEnemigo - 1);
      setMotivacionEnemigo(motivacionEnemigo - 2);
    }

    let Quetzalcoatl = props.player.objeto.find(
      (dato) => dato.nombre === "Quetzalcoatl"
    );

    let Carnicera = props.player.objeto.find(
      (dato) => dato.nombre === "Carnicera"
    );

    let Destripavientres = props.player.objeto.find(
      (dato) => dato.nombre === "Destripavientres"
    );

    let LenguaDeLucifer = props.player.objeto.find(
      (dato) => dato.nombre === "Lengua de Lucifer"
    );

    let LuzDeSelene = props.player.objeto.find(
      (dato) => dato.nombre === "Luz de Selene"
    );

    let CentellaRapida = props.player.objeto.find(
      (dato) => dato.nombre === "Centella Rápida"
    );

    let FinDeLaOdisea = props.player.objeto.find(
      (dato) => dato.nombre === "Fín de la Odisea"
    );

    if (Quetzalcoatl && contIndestructibleEnemigo === 0) {
      setMotivacionEnemigo(motivacionEnemigo - 3);
    }

    if (Destripavientres && LuzDeSelene) {
      setMotivacionPlayer(motivacionPlayer + 5);
      if (motivacionPlayer >= props.player.motivación) {
        setMotivacionPlayer(props.player.motivación);
      }
    } else if (Destripavientres) {
      setMotivacionPlayer(motivacionPlayer + 3);

      if (motivacionPlayer >= props.player.motivación) {
        setMotivacionPlayer(props.player.motivación);
      }
    } else if (LuzDeSelene) {
      setMotivacionPlayer(motivacionPlayer + 2);
      if (motivacionPlayer >= props.player.motivación) {
        setMotivacionPlayer(props.player.motivación);
      }
    }

    if (LenguaDeLucifer) {
      setMotivacionPlayer(motivacionPlayer + 2);
      if (motivacionPlayer >= props.player.motivación) {
        setMotivacionPlayer(props.player.motivación);
        document.querySelector(
          "#player-accion"
        ).innerHTML = `Acuerdate que no puedes curarte más de tu vida máxima.`;
      }
    }

    if (CentellaRapida && contIndestructibleEnemigo === 0) {
      setMotivacionEnemigo(motivacionEnemigo - 1);
    }

    if (FinDeLaOdisea && contPuntoVital >= 1) {
      setContPuntoVital(contPuntoVital + 1);
    }
    if (infoLowerCase === "html") {
      switch (infoLowerCaseEnemigo) {
        case "¿section?¿id?¿class?¿esosecome?":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaEnemigo} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaDoble);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaMitad} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaMitad);
            }
          } else {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaDoble} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaDoble);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaEnemigo} de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            }
          }
          break;

        case "¿creesqueasívasasubirelseo?":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector("#enemigo-accion").innerHTML = `${
                props.enemigo.nombre
              } hace ${8} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - 8);
            } else {
              document.querySelector("#enemigo-accion").innerHTML = `${
                props.player.nombre
              } recibe ${4} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - 4);
            }
          } else {
            if (Carnicera) {
              document.querySelector("#enemigo-accion").innerHTML = `${
                props.enemigo.nombre
              } hace ${16} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - 16);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace 8 de daño.`;
              setMotivacionPlayer(motivacionPlayer - 8);
            }
          }
          break;
        default:
          break;
      }
    }
    if (infoLowerCase === "css") {
      switch (infoLowerCaseEnemigo) {
        case "usaelputoflexboxdeunafuckingvez":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaEnemigo} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaMitad} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaMitad);
            }
          } else {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaDoble} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaDoble);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaEnemigo} de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            }
          }
          break;

        case "¿aesolollamasposition:relative?":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `Ya soy indestructible.`;
          } else {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.enemigo.nombre} ha usado ${info}, no recibirá daño en sus 1 siguientes turnos.`;
            setContIndestructibleEnemigo(1);
          }
          break;
        default:
          break;
      }
    }
    if (infoLowerCase === "javascript") {
      switch (infoLowerCaseEnemigo) {
        case "¿quieresunakata,guapo?":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaEnemigo} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaMitad} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaMitad);
            }
          } else {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaDoble} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaDoble);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaEnemigo} de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            }
          }
          break;

        case "mapisnotafunction":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace 6 de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - 6);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe 3 por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - 3);
            }
          } else {
            if (Carnicera) {
              document.querySelector("#enemigo-accion").innerHTML = `${
                props.enemigo.nombre
              } hace ${9} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - 9);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace 6 de daño.`;
              setMotivacionPlayer(motivacionPlayer - 6);
            }
          }
          break;
        default:
          break;
      }
    }
    if (infoLowerCase === "handlebars") {
      switch (infoLowerCaseEnemigo) {
        case "nosetevenada,¿notehabrásolvidadodeponerellayout?":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaEnemigo} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaMitad} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaMitad);
            }
          } else {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaDoble} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaDoble);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaEnemigo} de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            }
          }
          break;

        case "ah,quequiereshacervalidacionescondomytuusuarioenbasededatos,puesprepáratequevasaflipar":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace 15 de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - 15);
            } else {
              document.querySelector("#enemigo-accion").innerHTML = `${
                props.player.nombre
              } recibe ${Math.round(15 / 2)} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - Math.round(15 / 2));
            }
          } else {
            if (Carnicera) {
              document.querySelector("#enemigo-accion").innerHTML = `${
                props.enemigo.nombre
              } hace ${30} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - 30);
            } else {
              document.querySelector("#enemigo-accion").innerHTML = `${
                props.enemigo.nombre
              } hace ${15} de daño.`;
              setMotivacionPlayer(motivacionPlayer - 15);
            }
          }
          break;
        default:
          break;
      }
    }
    if (infoLowerCase === "node.js") {
      switch (infoLowerCaseEnemigo) {
        case "req.paramsyres.send":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaEnemigo} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaMitad} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaMitad);
            }
          } else {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaDoble} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaDoble);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaEnemigo} de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            }
          }
          break;
        case "¿pensabasqueenviarinformaciónsequedabaenlalocalstorage?hahaha":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaDoble} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaDoble);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaEnemigo} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            }
          } else {
            if (Carnicera) {
              document.querySelector("#enemigo-accion").innerHTML = `${
                props.enemigo.nombre
              } hace ${fuerzaDoble * 2} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaDoble * 2);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaDoble} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaDoble);
            }
          }
          break;
        default:
          break;
      }
    }
    if (infoLowerCase === "julián") {
      switch (infoLowerCaseEnemigo) {
        case "porelpoderdelaluna":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaEnemigo} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaMitad} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaMitad);
            }
          } else {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaDoble} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaDoble);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaEnemigo} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            }
          }
          break;
        case "labiaintensa":
          if (!contIndestructibleEnemigo || contIndestructibleEnemigo === 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.enemigo.nombre} ha usado ${info}, en los 3 siguientes turnos no recibirá daño.`;
            setContIndestructibleEnemigo(3);
          } else {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
          }
          break;
        case "ritmohipster":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${habilidadEnemigo} de daño por efecto de Carnicera y se cura ${habilidadEnemigo}.`;
              setMotivacionPlayer(motivacionPlayer - habilidadEnemigo);
              setMotivacionEnemigo(motivacionEnemigo + habilidadEnemigo);
              if (motivacionEnemigo >= props.enemigo.motivación) {
                document.querySelector(
                  "#enemigo-accion"
                ).innerHTML = `${props.enemigo.nombre} intenta curarse más de su vida máxima, pero no es efectivo.`;
                setMotivacionEnemigo(props.enemigo.motivación);
              }
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} te hace ${habilidadMitad} de daño y se cura ${habilidadMitad}.`;
              setMotivacionPlayer(motivacionPlayer - habilidadMitad);
              setMotivacionEnemigo(motivacionEnemigo + habilidadMitad);
              if (motivacionEnemigo >= props.enemigo.motivación) {
                document.querySelector(
                  "#enemigo-accion"
                ).innerHTML = `${props.enemigo.nombre} intenta curarse más de su vida máxima, pero no es efectivo.`;
                setMotivacionEnemigo(props.enemigo.motivación);
              }
            }
          } else {
            if (Carnicera) {
              document.querySelector("#enemigo-accion").innerHTML = `${
                props.enemigo.nombre
              } hace ${
                habilidadEnemigo * 2
              } de daño por efecto de Carnicera y se cura ${
                habilidadEnemigo * 2
              }.`;
              setMotivacionPlayer(motivacionPlayer - habilidadEnemigo * 2);
              setMotivacionEnemigo(motivacionEnemigo + habilidadEnemigo * 2);
              if (motivacionEnemigo >= props.enemigo.motivación) {
                document.querySelector(
                  "#enemigo-accion"
                ).innerHTML = `${props.enemigo.nombre} intenta curarse más de su vida máxima, pero no es efectivo.`;
                setMotivacionEnemigo(props.enemigo.motivación);
              }
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} le hace ${habilidadEnemigo} de daño y se cura ${habilidadEnemigo}.`;
              setMotivacionPlayer(motivacionPlayer - habilidadEnemigo);
              setMotivacionEnemigo(motivacionEnemigo + habilidadEnemigo);
              if (motivacionEnemigo >= props.enemigo.motivación) {
                document.querySelector(
                  "#enemigo-accion"
                ).innerHTML = `${props.enemigo.nombre} intenta curarse más de su vida máxima, pero no es efectivo.`;
                setMotivacionEnemigo(props.enemigo.motivación);
              }
            }
          }
          break;
        default:
          break;
      }
    }
    if (infoLowerCase === "marina") {
      switch (infoLowerCaseEnemigo) {
        case "calmayrectitud":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaEnemigo} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaMitad} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaMitad);
            }
          } else {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaDoble} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaDoble);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaEnemigo} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            }
          }
          break;
        case "vozpasiva-agresiva":
          if (!contIndestructibleEnemigo || contIndestructibleEnemigo === 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.enemigo.nombre} ha usado ${info}, en los 2 siguientes turnos no recibirá daño.`;
            setContIndestructibleEnemigo(2);
          } else {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.enemigo.nombre} ha usado ${info}, pero no ha surtido efecto.`;
          }
          break;
        case "mardepaciencia":
          if (!contMitadDañoEnemigo || contMitadDañoEnemigo === 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.enemigo.nombre} ha usado ${info}, en el siguiente turno recibirá la mitad de daño.`;
            setContMitadDañoEnemigo(1);
          } else {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.enemigo.nombre} ha usado ${info}, pero no ha surtido efecto.`;
          }
          break;
        default:
          break;
      }
    }
    if (infoLowerCase === "leandro") {
      switch (infoLowerCaseEnemigo) {
        case "elseñordelosmates":
          if (!contVenenoEnemigo || contVenenoEnemigo === 0) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `${props.enemigo.nombre} ha usado ${info}, inflijes 5 puntos de daño por veneno a ${props.player.nombre} durante 3 turnos.`;
            setContVeneno(3);
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `${props.enemigo.nombre} ha usado ${info}, pero ${props.player.nombre} ya está envenenado.`;
          }
          break;
        case "descansodebootcamp":
          document.querySelector(
            "#enemigo-accion"
          ).innerHTML = `${props.enemigo.nombre} ha usado ${info}, se cura ${vidaTercio}.`;
          setMotivacionEnemigo(motivacionEnemigo + vidaTercio);
          if (motivacionEnemigo >= props.enemigo.motivación) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.enemigo.nombre} intenta curarse más de su vida máxima, pero no es efectivo.`;
            setMotivacionEnemigo(props.enemigo.motivación);
          }
          break;
        case "queeseseerror":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaEnemigo} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaMitad} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaMitad);
            }
          } else {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaDoble} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaDoble);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaEnemigo} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            }
          }
          break;
        default:
          break;
      }
    }
    if (infoLowerCase === "react.js") {
      switch (infoLowerCaseEnemigo) {
        case "¿componente?¿redirect?¿tagsdiferentes?esesoyyo,¡dio!digo,¡react!":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaEnemigo} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaMitad} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaMitad);
            }
          } else {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaDoble} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaDoble);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaEnemigo}.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            }
          }
          break;
        case "accesstohttps:iron-league.comhasbeenblockedbycorspolicy":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.enemigo.nombre} ha usado ${info} pero ${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace 20 de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - 20);
            } else {
              document.querySelector("#enemigo-accion").innerHTML = `${
                props.enemigo.nombre
              } ha usado ${info}, ${props.player.nombre} recibe ${Math.round(
                20 / 2
              )} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - Math.round(20 / 2));
            }
          } else {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace 40 de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - 40);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} ha usado ${info}, ${props.player.nombre} recibe 20 puntos de daño.`;
              setMotivacionPlayer(motivacionPlayer - 20);
            }
          }
          break;
        default:
          break;
      }
    }
    if (infoLowerCase === "daniel") {
      switch (infoLowerCaseEnemigo) {
        case "sensillo":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaEnemigo} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaMitad} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaMitad);
            }
          } else {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaDoble} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaDoble);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaEnemigo} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            }
          }
          break;
        case "entenderawilly":
          if (contIndestructible > 0) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.player.nombre} no recibe daño.`;
          } else if (contMitadDaño > 0) {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaMitad} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaMitad);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaTerciaria} por la reducción de daño.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaTerciaria);
            }
          } else {
            if (Carnicera) {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.enemigo.nombre} hace ${fuerzaEnemigo} de daño por efecto de Carnicera.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaEnemigo);
            } else {
              document.querySelector(
                "#enemigo-accion"
              ).innerHTML = `${props.player.nombre} recibe ${fuerzaMitad}.`;
              setMotivacionPlayer(motivacionPlayer - fuerzaMitad);
            }
          }
          break;
        case "conocimientodebitcoin":
          document.querySelector(
            "#enemigo-accion"
          ).innerHTML = `${props.enemigo.nombre} ha usado ${info}, se cura ${habilidadEnemigo} puntos de vida.`;
          setMotivacionEnemigo(motivacionEnemigo + habilidadEnemigo);
          if (motivacionEnemigo >= props.enemigo.motivación) {
            document.querySelector(
              "#enemigo-accion"
            ).innerHTML = `${props.enemigo.nombre} intenta curarse más de su vida máxima, pero no es efectivo.`;
            setMotivacionEnemigo(props.enemigo.motivación);
          }
          break;
        default:
          break;
      }
    }

    if (contIndestructible > 0) {
      setContIndestructible(contIndestructible - 1);
    }

    if (contMitadDaño > 0) {
      setContMitadDaño(contMitadDaño - 1);
    }

    if (contIndestructibleEnemigo > 0) {
      setContIndestructibleEnemigo(contIndestructibleEnemigo - 1);
    }

    if (contMitadDañoEnemigo > 0) {
      setContMitadDañoEnemigo(contMitadDañoEnemigo - 1);
    }
  };

  //PLAYER
  let funcionalidadBotonPlayer = (info) => {
    let infoLowerCase = info.toLowerCase().split(" ").join("");
    let numberRandom = Math.floor(Math.random() * 5);
    let dañoFinal = fuerzaPlayer + numberRandom;
    let dañoMitadFinal = Math.round(dañoFinal / 2);
    let curaMáxima = Math.round(habilidadPlayer + dañoFinal);
    let daño10 = Math.floor(Math.random() * 10);
    let numberRandomMax = Math.floor(Math.random() * (10 - 5) + 5);
    let probabilidad = Math.floor(Math.random() * 100);
    let dañoTercio = Math.floor(motivacionPlayer / 3);
    let dañoDobleFuerza = Math.floor(fuerzaPlayer * 2);
    let dañoMitadFuerza = Math.floor(fuerzaPlayer / 2);
    let mitadHabilidad = Math.round(habilidadPlayer / 2);

    let latigoFunesto = props.player.objeto.find(
      (dato) => dato.nombre === "Látigo funesto"
    );

    let HundeOrganos = props.player.objeto.find(
      (dato) => dato.nombre === "Hundeorganos"
    );

    if (contVeneno > 0) {
      setContVeneno(contVeneno - 1);
      setMotivacionPlayer(motivacionPlayer - 5);
    }

    switch (infoLowerCase) {
      case "vínculo":
        document.querySelector("#player-accion").innerHTML = `Tu vínculo con ${
          props.enemigo.nombre
        } ha subido ${Math.round(vinculoPlayer + numberRandom)}.`;
        setVinculoPlayer(
          vinculoPlayer + Math.round(vinculoPlayer + numberRandom)
        );
        break;
      case "kobold":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tus 2 siguientes turnos.`;
          setContIndestructible(2);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "amorpaternal":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `${props.enemigo.nombre} recibe ${dañoMitadFinal} por la reducción de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, ${props.enemigo.nombre} recibe ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "evolucióninquisitiva":
        document.querySelector(
          "#player-accion"
        ).innerHTML = `Has usado ${info}, recibes una curación de ${numberRandomMax}.`;
        setMotivacionPlayer(motivacionPlayer + numberRandomMax);
        if (motivacionPlayer >= props.player.motivación) {
          setMotivacionPlayer(props.player.motivación);
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Acuerdate que no puedes curarte más de tu vida máxima.`;
        }
        break;
      case "chessmaster":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "lenguajefrancés":
        if (!contMitadDaño || contMitadDaño === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, recibes la mitad de daño en tus 3 siguientes turnos.`;
          setContMitadDaño(3);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero ya estás recibiendo la mitad de daño por parte de ${props.enemigo.nombre}.`;
        }
        break;
      case "lagraciademathi":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          let numberRandom = Math.floor(Math.random() * 5);
          let daño = fuerzaPlayer + numberRandom;
          if (probabilidad > 51) {
            if (latigoFunesto) {
              document.querySelector(
                "#player-accion"
              ).innerHTML = `Has usado ${info}, con probabilidad de ${probabilidad}, ${props.enemigo.nombre} se ríe y le haces ${daño} puntos de daño, mas 3 de daño por látigo funesto.`;
              setMotivacionEnemigo(
                motivacionEnemigo - Math.round(daño / 2 + 3)
              );
            } else {
              document.querySelector(
                "#player-accion"
              ).innerHTML = `Has usado ${info}, ${
                props.enemigo.nombre
              } se ríe y se hace ${Math.round(daño / 2)}.`;
              setMotivacionEnemigo(motivacionEnemigo - Math.round(daño / 2));
            }
          } else if (probabilidad < 49) {
            let numberRandom = Math.floor(Math.random() * 5);
            let daño = fuerzaPlayer + numberRandom;
            if (!contMitadDaño || contMitadDaño === 0) {
              document.querySelector(
                "#player-accion"
              ).innerHTML = `Has usado ${info}, ${props.enemigo.nombre} no se ríe y te hace ${daño}.`;
              setMotivacionPlayer(motivacionPlayer - daño);
            } else {
              let numberRandom = Math.floor(Math.random() * 5);
              let daño = fuerzaPlayer + numberRandom;
              document.querySelector(
                "#player-accion"
              ).innerHTML = `Has usado ${info}, ${
                props.enemigo.nombre
              } no se ríe y te hace ${Math.round(daño / 2)}.`;
              setMotivacionPlayer(motivacionPlayer - Math.round(daño / 2));
            }
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info} pero no surtió efecto, no le eches la culpa al programador del juego, échasela a la suerte...`;
          }
        } else {
          if (probabilidad >= 51) {
            let numberRandom = Math.floor(Math.random() * 5);
            let daño = fuerzaPlayer + numberRandom;
            if (latigoFunesto) {
              document.querySelector(
                "#player-accion"
              ).innerHTML = `Has usado ${info}, con probabilidad de ${probabilidad}, ${props.enemigo.nombre} se ríe y le haces ${daño} puntos de daño, mas 3 de daño por látigo funesto.`;
              setMotivacionEnemigo(motivacionEnemigo - (daño + 3));
            } else {
              document.querySelector(
                "#player-accion"
              ).innerHTML = `Has usado ${info} con probabilidad de ${probabilidad}, ${props.enemigo.nombre} se ríe y se hace ${daño}.`;
              setMotivacionEnemigo(motivacionEnemigo - daño);
            }
          } else if (probabilidad <= 49) {
            let numberRandom = Math.floor(Math.random() * 5);
            let daño = fuerzaPlayer + numberRandom;
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info} con probabilidad de ${probabilidad}, ${props.enemigo.nombre} no se ríe y te hace ${daño}.`;
            setMotivacionPlayer(motivacionPlayer - daño);
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info} pero no surtió efecto, no le eches la culpa al programador del juego, échasela a la suerte...`;
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "diva":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFuerza} puntos de daño, mas 3 de daño por látigo funesto y te curas ${dañoMitadFuerza}.`;
            setMotivacionPlayer(motivacionPlayer + dañoMitadFuerza);
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFuerza + 3));
            if (motivacionPlayer >= props.player.motivación) {
              setMotivacionPlayer(props.player.motivación);
              document.querySelector(
                "#player-accion"
              ).innerHTML = `No puedes curarte más de la vida máxima que tienes.`;
            }
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFuerza}, y tu te curas ${dañoMitadFuerza}.`;
            setMotivacionPlayer(motivacionPlayer + dañoMitadFuerza);
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFuerza);
            if (motivacionPlayer >= props.player.motivación) {
              setMotivacionPlayer(props.player.motivación);
              document.querySelector(
                "#player-accion"
              ).innerHTML = `No puedes curarte más de la vida máxima que tienes.`;
            }
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${fuerzaPlayer} puntos de daño, mas 3 de daño por látigo funesto y te curas ${fuerzaPlayer}.`;
            setMotivacionPlayer(motivacionPlayer + fuerzaPlayer);
            setMotivacionEnemigo(motivacionEnemigo - (fuerzaPlayer + 3));
            if (motivacionPlayer >= props.player.motivación) {
              setMotivacionPlayer(props.player.motivación);
              document.querySelector(
                "#player-accion"
              ).innerHTML = `No puedes curarte más de la vida máxima que tienes.`;
            }
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${fuerzaPlayer}, y tu te curas ${fuerzaPlayer}.`;
            setMotivacionPlayer(motivacionPlayer + fuerzaPlayer);
            setMotivacionEnemigo(motivacionEnemigo - fuerzaPlayer);
            if (motivacionPlayer >= props.player.motivación) {
              setMotivacionPlayer(props.player.motivación);
              document.querySelector(
                "#player-accion"
              ).innerHTML = `No puedes curarte más de la vida máxima que tienes.`;
            }
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "abanicodeidiomas":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tus 2 siguientes turno.`;
          setContIndestructible(2);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "flashdelafama":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoTercio} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionPlayer(motivacionPlayer - dañoTercio);
            setMotivacionEnemigo(motivacionEnemigo - (dañoTercio + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, te haces ${Math.round(
              dañoTercio / 2
            )} para infringirlo a ${props.enemigo.nombre}.`;
            setMotivacionPlayer(motivacionPlayer - Math.round(dañoTercio));
            setMotivacionEnemigo(
              motivacionEnemigo - Math.round(dañoTercio / 2)
            );
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoTercio} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionPlayer(motivacionPlayer - dañoTercio);
            setMotivacionEnemigo(motivacionEnemigo - (dañoTercio + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, te haces ${dañoTercio} para infringirlo a ${props.enemigo.nombre}.`;
            setMotivacionPlayer(motivacionPlayer - dañoTercio);
            setMotivacionEnemigo(motivacionEnemigo - dañoTercio);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "masterofgames":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFuerza} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFuerza + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFuerza}.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFuerza);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${fuerzaPlayer} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (fuerzaPlayer + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${fuerzaPlayer}.`;
            setMotivacionEnemigo(motivacionEnemigo - fuerzaPlayer);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "lenguajemadrileño":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tus 2 siguientes turnos.`;
          setContIndestructible(2);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "simpatíayamistad":
        document.querySelector(
          "#player-accion"
        ).innerHTML = `Has usado ${info}, te curas ${habilidadPlayer}, si es que qué chico tan majo.`;
        setMotivacionPlayer(motivacionPlayer + habilidadPlayer);
        if (motivacionPlayer >= props.player.motivación) {
          setMotivacionPlayer(props.player.motivación);
          document.querySelector(
            "#player-accion"
          ).innerHTML = `No puedes curarte más de la vida máxima que tienes.`;
        }
        break;
      case "miayhulk":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${
              props.enemigo.nombre
            } le haces ${Math.round(
              daño10 / 2 + 3
            )} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(
              motivacionEnemigo - Math.round(daño10 / 2 + 3)
            );
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${
              props.enemigo.nombre
            } ${Math.round(daño10 / 2)} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - Math.round(daño10 / 2));
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${daño10} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (daño10 + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${daño10} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - daño10);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "cierreimpenetrable":
        if (!contMitadDaño || contMitadDaño === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, recibes la mitad de daño en tus 3 siguientes turno.`;
          setContMitadDaño(3);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "curacióndelalma":
        document.querySelector(
          "#player-accion"
        ).innerHTML = `Has usado ${info}, recibes una curación de ${habilidadPlayer}.`;
        setMotivacionPlayer(motivacionPlayer + habilidadPlayer);
        if (motivacionPlayer >= props.player.motivación) {
          setMotivacionPlayer(props.player.motivación);
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Acuerdate que no puedes curarte más de tu vida máxima.`;
        }
        break;
      case "lacueva":
        if (
          contIndestructibleEnemigo > 0 &&
          (!contIndestructible || contIndestructible === 0)
        ) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño pero en tu siguiente turno recibes la mitad de daño.`;
          setContMitadDaño(1);
        } else if (contIndestructibleEnemigo > 0 && contMitadDaño > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño y no recibes el buff.`;
        } else if (
          contMitadDañoEnemigo > 0 &&
          (!contMitadDaño || contMitadDaño === 0)
        ) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFuerza} puntos de daño, mas 3 de daño por látigo funesto y en tu siguiente turno recibes la mitad de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFuerza + 3));
            setContMitadDaño(1);
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, ${props.enemigo.nombre} recibe ${dañoMitadFuerza} puntos de daño y en tu siguiente turno recibes la mitad de daño..`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFuerza);
            setContMitadDaño(1);
          }
        } else if (contMitadDañoEnemigo > 0 && contMitadDaño > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFuerza} puntos de daño, mas 3 de daño por látigo funesto pero, el buff está activo.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFuerza + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, ${props.enemigo.nombre} recibe ${dañoMitadFuerza} puntos de daño pero el buff está activo.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFuerza);
          }
        } else if (!contMitadDaño || contMitadDaño === 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${fuerzaPlayer} puntos de daño, mas 3 de daño por látigo funesto y en tu siguiente turno recibes la mitad de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - (fuerzaPlayer + 3));
            setContMitadDaño(1);
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, ${props.enemigo.nombre} recibe ${fuerzaPlayer} puntos de daño y en tu siguiente turno recibes la mitad de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - fuerzaPlayer);
            setContMitadDaño(1);
          }
        } else if (contMitadDaño > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${fuerzaPlayer} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (fuerzaPlayer + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, ${props.enemigo.nombre} recibe ${fuerzaPlayer} puntos de daño pero el buff ya está activo.`;
            setMotivacionEnemigo(motivacionEnemigo - fuerzaPlayer);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "vozsensual":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "hacedordecódigo":
        document.querySelector(
          "#player-accion"
        ).innerHTML = `Has usado ${info}, te curas ${habilidadPlayer}.`;
        setMotivacionPlayer(motivacionPlayer + habilidadPlayer);
        if (motivacionPlayer >= props.player.motivación) {
          setMotivacionPlayer(props.player.motivación);
          document.querySelector(
            "#player-accion"
          ).innerHTML = `No puedes curarte más cantidad que tu vida máxima.`;
        }
        break;
      case "acupunturabélica":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${
              props.enemigo.nombre
            } le haces ${Math.round(
              dañoFinal / 2 + 3
            )} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(
              motivacionEnemigo - Math.round(dañoFinal / 2 + 3)
            );
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${
              props.enemigo.nombre
            } ${Math.round(dañoFinal / 2)} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - Math.round(dañoFinal / 2));
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Le haces a ${info} ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "pasodelassombras":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tus dos turnos siguientes.`;
          setContIndestructible(2);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "besomortal":
        if (!contVenenoEnemigo || contVenenoEnemigo === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, le inflijes 2 de veneno a ${props.enemigo.nombre} durante 5 turnos.`;
          setContVenenoEnemigo(5);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `El enemigo ya está envenenado.`;
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "látigocapilar":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${fuerzaPlayer} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (fuerzaPlayer + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${fuerzaPlayer} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - fuerzaPlayer);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoDobleFuerza} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoDobleFuerza + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoDobleFuerza} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoDobleFuerza);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "movimientoletal":
        if (probabilidad > 61) {
          setContPuntoVital(contPuntoVital + 1);
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, has acertado en un punto vital.`;
        } else if (probabilidad < 59) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no has acertado.`;
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} se pasa tu habilidad por el moño.`;
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "escudocapilar":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "tatuajedeamordemadre":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tus 2 siguientes turnos.`;
          setContIndestructible(2);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "¡krakenalavista!":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFuerza} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFuerza + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFuerza} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFuerza);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${fuerzaPlayer} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (fuerzaPlayer + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${fuerzaPlayer} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - fuerzaPlayer);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;

      case "avisoparanavegantes":
        document.querySelector(
          "#player-accion"
        ).innerHTML = `Has usado ${info}, te curas ${habilidadPlayer}.`;
        setMotivacionPlayer(motivacionPlayer + habilidadPlayer);
        if (motivacionPlayer >= props.player.motivación) {
          setMotivacionPlayer(props.player.motivación);
          document.querySelector(
            "#player-accion"
          ).innerHTML = `No puedes curarte más cantidad que tu vida máxima.`;
        }
        break;
      case "perseveranciaantinatural":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tus 3 siguientes turnos.`;
          setContIndestructible(3);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "parentaladvisor":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "programaciónanímica":
        if (!contMitadDaño || contMitadDaño === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, recibes la mitad de daño en tu siguiente turno.`;
          setContMitadDaño(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero ya estás recibiendo la mitad de daño por parte de ${props.enemigo.nombre}.`;
        }
        break;
      case "gamingabusivo":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "eltemblordelpueblo":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "perseveranciamaestra":
        if (!contMitadDaño || contMitadDaño === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, recibes la mitad de daño en tus 2 siguientes turnos.`;
          setContMitadDaño(2);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero ya estás recibiendo la mitad de daño por parte de ${props.enemigo.nombre}.`;
        }
        break;
      case "testosterona":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "gritodederrumbe":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "valorycorazón":
        if (!contMitadDaño || contMitadDaño === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, recibes la mitad de daño en tus 2 siguientes turnos.`;
          setContMitadDaño(2);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero ya estás recibiendo la mitad de daño por parte de ${props.enemigo.nombre}.`;
        }
        break;
      case "traveldata":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "lenguajegriego":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "luchadeemociones":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${mitadHabilidad} + 3 de daño por látigo funesto, y tu te curas ${habilidadPlayer}.`;
            setMotivacionPlayer(motivacionPlayer + (mitadHabilidad + 3));
            setMotivacionEnemigo(motivacionEnemigo - (mitadHabilidad + 3));
            if (motivacionPlayer >= props.player.motivación) {
              setMotivacionPlayer(props.player.motivación);
              document.querySelector(
                "#player-accion"
              ).innerHTML = `No puedes curarte más de la vida máxima que tienes.`;
            }
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${mitadHabilidad}, y tu te curas ${mitadHabilidad}.`;
            setMotivacionPlayer(motivacionPlayer + mitadHabilidad);
            setMotivacionEnemigo(motivacionEnemigo - mitadHabilidad);
            if (motivacionPlayer >= props.player.motivación) {
              setMotivacionPlayer(props.player.motivación);
              document.querySelector(
                "#player-accion"
              ).innerHTML = `No puedes curarte más de la vida máxima que tienes.`;
            }
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${habilidadPlayer} + 3 de daño por látigo funesto, y tu te curas ${habilidadPlayer}.`;
            setMotivacionPlayer(motivacionPlayer + (habilidadPlayer + 3));
            setMotivacionEnemigo(motivacionEnemigo - (habilidadPlayer + 3));
            if (motivacionPlayer >= props.player.motivación) {
              setMotivacionPlayer(props.player.motivación);
              document.querySelector(
                "#player-accion"
              ).innerHTML = `No puedes curarte más de la vida máxima que tienes.`;
            }
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${habilidadPlayer}, y tu te curas ${habilidadPlayer}.`;
            setMotivacionPlayer(motivacionPlayer + habilidadPlayer);
            setMotivacionEnemigo(motivacionEnemigo - habilidadPlayer);
            if (motivacionPlayer >= props.player.motivación) {
              setMotivacionPlayer(props.player.motivación);
              document.querySelector(
                "#player-accion"
              ).innerHTML = `No puedes curarte más de la vida máxima que tienes.`;
            }
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "breaktheice":
        if (!contMitadDaño || contMitadDaño === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, ${props.enemigo.nombre} te hace la mitad de daño en tus 3 siguientes turnos.`;
          setContMitadDaño(3);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no surte efecto.`;
        }
        break;
      case "fuiaméxico,aitana,ynolloré":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${mitadHabilidad} + 3 de daño por látigo funesto, y tu te curas ${habilidadPlayer}.`;
            setMotivacionPlayer(motivacionPlayer + (mitadHabilidad + 3));
            setMotivacionEnemigo(motivacionEnemigo - (mitadHabilidad + 3));
            if (motivacionPlayer >= props.player.motivación) {
              setMotivacionPlayer(props.player.motivación);
              document.querySelector(
                "#player-accion"
              ).innerHTML = `No puedes curarte más de la vida máxima que tienes.`;
            }
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${mitadHabilidad}, y tu te curas ${mitadHabilidad}.`;
            setMotivacionPlayer(motivacionPlayer + mitadHabilidad);
            setMotivacionEnemigo(motivacionEnemigo - mitadHabilidad);
            if (motivacionPlayer >= props.player.motivación) {
              setMotivacionPlayer(props.player.motivación);
              document.querySelector(
                "#player-accion"
              ).innerHTML = `No puedes curarte más de la vida máxima que tienes.`;
            }
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${habilidadPlayer} + 3 de daño por látigo funesto, y tu te curas ${habilidadPlayer}.`;
            setMotivacionPlayer(motivacionPlayer + (habilidadPlayer + 3));
            setMotivacionEnemigo(motivacionEnemigo - (habilidadPlayer + 3));
            if (motivacionPlayer >= props.player.motivación) {
              setMotivacionPlayer(props.player.motivación);
              document.querySelector(
                "#player-accion"
              ).innerHTML = `No puedes curarte más de la vida máxima que tienes.`;
            }
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${habilidadPlayer}, y tu te curas ${habilidadPlayer}.`;
            setMotivacionPlayer(motivacionPlayer + habilidadPlayer);
            setMotivacionEnemigo(motivacionEnemigo - habilidadPlayer);
            if (motivacionPlayer >= props.player.motivación) {
              setMotivacionPlayer(props.player.motivación);
              document.querySelector(
                "#player-accion"
              ).innerHTML = `No puedes curarte más de la vida máxima que tienes.`;
            }
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "¡amispies!":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "sujetaelcubata":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "golpebestial":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "damemáswhisky":
        document.querySelector(
          "#player-accion"
        ).innerHTML = `Has usado ${info}, te curas ${habilidadPlayer} puntos de vida.`;
        setMotivacionPlayer(motivacionPlayer + habilidadPlayer);
        if (motivacionPlayer >= props.player.motivación) {
          setMotivacionPlayer(props.player.motivación);
          document.querySelector(
            "#player-accion"
          ).innerHTML = `No puedes curarte más de tus puntos de vida máximo.`;
        }
        break;
      case "heymike":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "leydivina":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "ahorametocaamí":
        document.querySelector(
          "#player-accion"
        ).innerHTML = `Has usado ${info}, te curas ${habilidadPlayer} puntos de vida.`;
        setMotivacionPlayer(motivacionPlayer + habilidadPlayer);
        if (motivacionPlayer >= props.player.motivación) {
          setMotivacionPlayer(props.player.motivación);
          document.querySelector(
            "#player-accion"
          ).innerHTML = `No puedes curarte más de tus puntos de vida máximo`;
        }
        break;
      case "¡metaaaaaaal!":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "rasgueoescalofriante":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "sacudidademelena":
        document.querySelector(
          "#player-accion"
        ).innerHTML = `Has usado ${info}, te curas ${habilidadPlayer} puntos de vida.`;
        setMotivacionPlayer(motivacionPlayer + habilidadPlayer);
        if (motivacionPlayer >= props.player.motivación) {
          setMotivacionPlayer(props.player.motivación);
          document.querySelector(
            "#player-accion"
          ).innerHTML = `No puedes curarte más de tus puntos de vida máximo`;
        }
        break;
      case "espadadeluz":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${mitadHabilidad} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (mitadHabilidad + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${mitadHabilidad} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - mitadHabilidad);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${habilidadPlayer} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (habilidadPlayer + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${habilidadPlayer} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - habilidadPlayer);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "excarmientosanto":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "sanctumrecitāre":
        document.querySelector(
          "#player-accion"
        ).innerHTML = `Has usado ${info}, te curas ${habilidadPlayer} puntos de vida.`;
        setMotivacionPlayer(motivacionPlayer + habilidadPlayer);
        if (motivacionPlayer >= props.player.motivación) {
          setMotivacionPlayer(props.player.motivación);
          document.querySelector(
            "#player-accion"
          ).innerHTML = `No puedes curarte más de tus puntos de vida máximo`;
        }
        break;
      case "queruleelcubalitro":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "¡dontstoptheparty!":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "mebebohastalasavia":
        document.querySelector(
          "#player-accion"
        ).innerHTML = `Has usado ${info}, te curas ${habilidadPlayer} puntos de vida.`;
        setMotivacionPlayer(motivacionPlayer + habilidadPlayer);
        if (motivacionPlayer >= props.player.motivación) {
          setMotivacionPlayer(props.player.motivación);
          document.querySelector(
            "#player-accion"
          ).innerHTML = `No puedes curarte más de tus puntos de vida máximo`;
        }
        break;
      case "matrix":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "dominacióncibernética":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "corazóndeleón":
        if (!contMitadDaño || contMitadDaño === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, ${props.enemigo.nombre} te hace la mitad de daño en tus 3 siguientes turnos.`;
          setContMitadDaño(3);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${info} sigue activo.`;
        }
        break;
      case "throwrainbowsup":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "porelpoderdelarcoiris":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "ilusiónmulticolor":
        if (!contMitadDaño || contMitadDaño === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, ${props.enemigo.nombre} te hace la mitad de daño en tus 2 siguientes turnos.`;
          setContMitadDaño(2);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${info} sigue activo.`;
        }
        break;
      case "silencioincómodo":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "sincámara":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "códigoinfalible":
        if (!contMitadDaño || contMitadDaño === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, ${props.enemigo.nombre} te hace la mitad de daño en tus 2 siguientes turnos.`;
          setContMitadDaño(2);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${info} sigue activo.`;
        }
        break;
      case "¡metamorfosis!":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "¡roar!":
        if (!contMitadDaño || contMitadDaño === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, ${props.enemigo.nombre} te hace la mitad de daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${info} sigue activo.`;
        }
        break;
      case "grandfinale":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${
              props.enemigo.nombre
            } le haces ${Math.round(
              dañoDobleFuerza / 2 + 3
            )} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(
              motivacionEnemigo - Math.round(dañoDobleFuerza / 2 + 3)
            );
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${
              props.enemigo.nombre
            } ${Math.round(dañoDobleFuerza / 2)} puntos de daño.`;
            setMotivacionEnemigo(
              motivacionEnemigo - Math.round(dañoDobleFuerza / 2)
            );
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoDobleFuerza} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoDobleFuerza + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoDobleFuerza} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoDobleFuerza);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "llavedeira":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "engañosiniestro":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "experienciamundana":
        if (!contMitadDaño || contMitadDaño === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, ${props.enemigo.nombre} te hace la mitad de daño en tu siguiente turno.`;
          setContMitadDaño(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${info} sigue activo.`;
        }
        break;
      case "renunciaatusderechos":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "estegruponoentrapormicoño":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "comoteexplicoquenohaydispo":
        if (!contMitadDaño || contMitadDaño === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, ${props.enemigo.nombre} te hace la mitad de daño en tus 2 siguientes turnos.`;
          setContMitadDaño(2);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${info} sigue activo.`;
        }
        break;
      case "futurología":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "advertencia":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "buenhumor":
        if (!contMitadDaño || contMitadDaño === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, ${props.enemigo.nombre} te hace la mitad de daño en tus 3 siguientes turnos.`;
          setContMitadDaño(3);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${info} sigue activo.`;
        }
        break;
      case "tentaciónmortal":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "tentaciónefímera":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tus 2 siguientes turnos.`;
          setContIndestructible(2);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "odaamelissa":
        if (!contMitadDaño || contMitadDaño === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, ${props.enemigo.nombre} te hace la mitad de daño en tus 2 siguientes turnos.`;
          setContMitadDaño(2);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${info} sigue activo.`;
        }
        break;
      case "dalealplay":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "hoyrecibes":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "lamúsicaenmisvenas":
        if (!contMitadDaño || contMitadDaño === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, ${props.enemigo.nombre} te hace la mitad de daño en tus 2 siguientes turnos.`;
          setContMitadDaño(2);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${info} sigue activo.`;
        }
        break;
      case "miramidentadura":
        if (contIndestructibleEnemigo > 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `${props.enemigo.nombre} no recibe daño.`;
        } else if (contMitadDañoEnemigo > 0) {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoMitadFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoMitadFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, le haces a ${props.enemigo.nombre} ${dañoMitadFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoMitadFinal);
          }
        } else {
          if (latigoFunesto) {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño, mas 3 de daño por látigo funesto.`;
            setMotivacionEnemigo(motivacionEnemigo - (dañoFinal + 3));
          } else {
            document.querySelector(
              "#player-accion"
            ).innerHTML = `Has usado ${info}, a ${props.enemigo.nombre} le haces ${dañoFinal} puntos de daño.`;
            setMotivacionEnemigo(motivacionEnemigo - dañoFinal);
          }
        }
        if (HundeOrganos) {
          setMotivacionPlayer(motivacionPlayer - 2);
        }
        break;
      case "ventepacaminiña":
        if (!contIndestructible || contIndestructible === 0) {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, no te hacen daño en tu siguiente turno.`;
          setContIndestructible(1);
        } else {
          document.querySelector(
            "#player-accion"
          ).innerHTML = `Has usado ${info}, pero no ha surtido efecto.`;
        }
        break;
      case "tusonrisaesmía":
        document.querySelector(
          "#player-accion"
        ).innerHTML = `Has usado ${info}, te curas ${habilidadPlayer} puntos de vida.`;
        setMotivacionPlayer(motivacionPlayer + habilidadPlayer);
        if (motivacionPlayer >= props.player.motivación) {
          setMotivacionPlayer(props.player.motivación);
          document.querySelector(
            "#player-accion"
          ).innerHTML = `No puedes curarte más de tus puntos de vida máximo.`;
        }
        break;
      default:
        break;
    }

    setTimeout(() => {
      funcionalidadBoton(props.enemigo.nombre);
    }, 500);
  };
  //PLAYER
  let situarStatsPlayer = () => {
    document.querySelector(
      "#indestructiblePlayer"
    ).innerHTML = `${contIndestructible} turnos`;
    document.querySelector(
      "#mitadDañoPlayer"
    ).innerHTML = `${contMitadDaño} turnos`;
    document.querySelector("#venenoPlayer").innerHTML = `${contVeneno} turnos`;
    if (props.player && motivacionEnemigo >= 1) {
      let motivaStat = (document.querySelector(
        "#motivacionPlayer"
      ).innerHTML = `${motivacionPlayer}`);
      let fuerzaStat = (document.querySelector(
        "#fuerzaPlayer"
      ).innerHTML = `${fuerzaPlayer}`);
      let habilidadStat = (document.querySelector(
        "#habilidadPlayer"
      ).innerHTML = `${habilidadPlayer}`);
      let vinculoStat = (document.querySelector(
        "#vinculoPlayer"
      ).innerHTML = `Vínculo ${vinculoPlayer}`);
      return { motivaStat, fuerzaStat, habilidadStat, vinculoStat };
    }
  };

  let guardarStatsPlayer = () => {
    let fuerza = setFuerzaPlayer(props.player.stats.fuerza);
    let habilidad = setHabilidadPlayer(props.player.stats.habilidad);
    let vinculo = setVinculoPlayer(props.player.stats.vinculo);
    let motivacion = setMotivacionPlayer(props.player.motivación);
    return { fuerza, habilidad, vinculo, motivacion };
  };
  let guardarStatsEnemigo = () => {
    let fuerza = props.enemigoStats
      ? setFuerzaEnemigo(props.enemigoStats.fuerza)
      : null;
    let habilidad = props.enemigo
      ? setHabilidadEnemigo(props.enemigoStats.habilidad)
      : null;
    let vinculo = props.enemigo
      ? setVinculoEnemigo(props.enemigoStats.vinculo)
      : null;
    let motivacion = props.enemigo
      ? setMotivacionEnemigo(props.enemigo.motivación)
      : null;
    let puntoVital = setContPuntoVital(0);

    return { fuerza, habilidad, vinculo, motivacion, puntoVital };
  };

  let guardarEfectosAdversos = () => {
    setContIndestructible(0);
    setContMitadDaño(0);
    setContVeneno(0);
    setContIndestructibleEnemigo(0);
    setContMitadDañoEnemigo(0);
    setContVenenoEnemigo(0);
  };

  //ENEMIGO
  let situarStatsEnemigo = () => {
    document.querySelector(
      "#indestructibleEnemigo"
    ).innerHTML = `${contIndestructibleEnemigo} turnos`;
    document.querySelector(
      "#mitadDañoEnemigo"
    ).innerHTML = `${contMitadDañoEnemigo} turnos`;
    document.querySelector(
      "#venenoEnemigo"
    ).innerHTML = `${contVenenoEnemigo} turnos`;
    document.querySelector(
      "#puntoVitalEnemigo"
    ).innerHTML = `${contPuntoVital} puntos vitales acertados`;
    if (motivacionEnemigo >= 1) {
      let fuerzaStat = fuerzaEnemigo
        ? (document.querySelector(
            "#fuerzaEnemy"
          ).innerHTML = `${fuerzaEnemigo}`)
        : null;
      let habilidadStat = habilidadEnemigo
        ? (document.querySelector(
            "#habilidadEnemy"
          ).innerHTML = `${habilidadEnemigo}`)
        : null;
      let motivaStat = motivacionEnemigo
        ? (document.querySelector(
            "#motivacionEnemy"
          ).innerHTML = `${motivacionEnemigo}`)
        : null;

      return { fuerzaStat, motivaStat, habilidadStat };
    }
  };

  let eliminarPersonaje = async (nombre) => {
    let llamada = await axios.post(
      `${process.env.REACT_APP_API_URI}/perfil/${props.user._id}/personajePull`,
      { nombre }
    );

    if (props.enemigo.nombre === "Daniel") {
      return history.push({
        pathname: "/perfil",
      });
    } else {
      return history.push({
        pathname: "/has-muerto",
        state: { enemigo: props.enemigo },
      });
    }
  };

  console.log(vinculoPlayer, 'enemigovinculo')

  let SetStats = () => {
    let {
      facilKill,
      normalKill,
      dificilKill,
      daniKill,
      facilVinculo,
      normalVinculo,
      dificilVinculo,
      daniVinculo,
    } = props.user;

    //if(facilKill >= 1 || normalKill >= 1  || dificilKill >= 1  || daniKill >= 1) {Llevar a la ruta genocida}
    //if(facilVinculo >= 1  || normalVinculo >= 1  || dificilVinculo >= 1  || daniVinculo >= 1 && daniMotivacion <= 1)
    if (
      props.enemigo.nombre === "Daniel" &&
      motivacionEnemigo <= 1 &&
      (facilKill >= 1 ||
        normalKill >= 1 ||
        dificilKill >= 1 ||
        (daniKill >= 1 && facilVinculo >= 1) ||
        normalVinculo >= 1 ||
        dificilVinculo >= 1)
    ) {
      setTimeout(function () {
        history.push({
          pathname: `/finalNeutral/${props.user._id}`,
        });
      }, 1000);
    }

    if (
      props.enemigo.nombre === "Daniel" &&
      motivacionEnemigo <= 1 &&
      facilKill >= 1 &&
      normalKill >= 1 &&
      dificilKill >= 1
    ) {
      setTimeout( () => {
        history.push({
          pathname: `/finalMalo/${props.user._id}`,
        });
      }, 1000);
    }

    // if (
    //   (props.enemigo.nombre === "Daniel" &&
    //     vinculoPlayer >= vinculoEnemigo) &&
    //     facilVinculo >= 1 ||
    //   normalVinculo >= 1 ||
    //   dificilVinculo >= 1
    // ) {
    //   setTimeout(function () {
    //     history.push({
    //       pathname: `/finalBueno/${props.user._id}`,
    //     });
    //   }, 1000);
    // }

    if (contPuntoVital === 10) {
      return (
        <SubidaStats
          player={props.player}
          enemigoAnterior={props.player.asesinatos}
          enemigoAsesinado={props.enemigo}
          user={props.user}
          dificultad={props.enemigo.nivelEnemigo}
          puntosStats={props.enemigo.statsGanados}
          kills={props.kills + 1}
        />
      );
    }

    if (motivacionEnemigo >= 1) {
      situarStatsPlayer();
      situarStatsEnemigo();
    }
    if (props.enemigoStats.vinculo <= vinculoPlayer) {
      return (
        <SubidaStatsVinculo
          player={props.player}
          enemigoAnterior={props.player.amistad}
          enemigoVinculado={props.enemigo}
          user={props.user}
          dificultad={props.enemigo.nivelEnemigo}
          puntosStats={props.enemigo.statsGanados}
          vinculos={props.vinculos + 1}
        />
      );
    }

    if (motivacionEnemigo <= 0) {
      return (
        <SubidaStats
          player={props.player}
          enemigoAnterior={props.player.asesinatos}
          enemigoAsesinado={props.enemigo}
          user={props.user}
          dificultad={props.enemigo.nivelEnemigo}
          puntosStats={props.enemigo.statsGanados}
          kills={props.kills + 1}
        />
      );
    }
    if (motivacionPlayer <= 0) {
      eliminarPersonaje(props.player.nombre);
    }

    return null;
  };

  useEffect(() => {
    guardarStatsEnemigo();
    guardarStatsPlayer();
    guardarEfectosAdversos();
  }, []);

  SetStats();

  return (
    <div className="posicion-campo-batalla">
    <ReactAudioPlayer src={props.audio} autoPlay volume={0.5} />
      <SetStats />

      {/*ENEMIGO*/}
      <div className="enemy-card-row">
        <span className="enemy-img-nombre">
          <img
            src={props.enemigo ? props.enemigo.image_url : "Waiting"}
            className="fotos-alumnos-card"
            alt="alumnos"
          ></img>
        </span>
        <div className="enemy-card-column">
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 30,
            }}
          >
            <span style={{ display: "flex", flexDirection: "row" }}>
              <FontAwesomeIcon
                icon={faUserShield}
                style={{ fontSize: 20, marginLeft: 20, marginRight: 20 }}
              />
              <h3 id="indestructibleEnemigo"></h3>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <FontAwesomeIcon
                icon={faStarHalf}
                style={{ fontSize: 20, marginLeft: 20 }}
              />
              <h3 id="mitadDañoEnemigo"></h3>
            </span>
            <span style={{ display: "flex", flexDirection: "row" }}>
              <FontAwesomeIcon
                icon={faSkullCrossbones}
                style={{ fontSize: 20, marginLeft: 20, marginRight: 20 }}
              />
              <h3 id="venenoEnemigo"></h3>
            </span>
            <span style={{ display: "flex", flexDirection: "row" }}>
              <FontAwesomeIcon
                icon={faCrosshairs}
                style={{ fontSize: 20, marginLeft: 20, marginRight: 20 }}
              />
              <h3 id="puntoVitalEnemigo"></h3>
            </span>
          </span>

          <h2 style={{ paddingLeft: 20, paddingRight: 20 }}>
            {props.enemigo ? props.enemigo.tipo : null}
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <span className="span-stats">
              <FontAwesomeIcon
                icon={faHeartbeat}
                style={{ fontSize: 20, marginRight: 10 }}
              />
              <h1 id="motivacionEnemy"></h1>
            </span>
            <span className="span-stats">
              <FontAwesomeIcon
                icon={faFistRaised}
                style={{ fontSize: 20, marginRight: 10 }}
              />
              <h1 id="fuerzaEnemy"></h1>
            </span>
            <span className="span-stats">
              <FontAwesomeIcon
                icon={faHatWizard}
                style={{ fontSize: 20, marginRight: 10 }}
              />
              <h1 id="habilidadEnemy"></h1>
            </span>
          </div>
        </div>
      </div>

      {/*PLAYER*/}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <div className="player-card-row">
          <div className="player-card-column">
            <span style={{ display: "flex", flexDirection: "row" }}>
              <h1 className="nombre-batalla">
                {props.player ? props.player.nombre : null}
              </h1>
              <div
                style={{
                  width: 200,
                  height: 60,
                  paddingTop: 100,
                  position: "absolute",
                  left: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <span className="stats-alterados-player">
                  <span className="stats-alterados-player-individual">
                    <FontAwesomeIcon
                      icon={faUserShield}
                      style={{ fontSize: 20, marginRight: 10 }}
                    />
                    <h3 id="indestructiblePlayer"></h3>
                  </span>
                  <span className="stats-alterados-player-individual">
                    <FontAwesomeIcon
                      icon={faStarHalf}
                      style={{ fontSize: 20, marginRight: 10 }}
                    />
                    <h3 id="mitadDañoPlayer"></h3>
                  </span>
                  <span className="stats-alterados-player-individual">
                    <FontAwesomeIcon
                      icon={faSkullCrossbones}
                      style={{ fontSize: 20, marginRight: 20 }}
                    />
                    <h3 id="venenoPlayer"></h3>
                  </span>
                </span>
              </div>
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <span className="span-stats">
                <FontAwesomeIcon
                  icon={faHeartbeat}
                  style={{ fontSize: 20, marginRight: 10 }}
                />
                <h1 id="motivacionPlayer"></h1>
              </span>
              <span className="span-stats">
                <FontAwesomeIcon
                  icon={faFistRaised}
                  style={{ fontSize: 20, marginRight: 10 }}
                />
                <h1 id="fuerzaPlayer"></h1>
              </span>
              <span className="span-stats">
                <FontAwesomeIcon
                  icon={faHatWizard}
                  style={{ fontSize: 20, marginRight: 10 }}
                />
                <h1 id="habilidadPlayer"></h1>
              </span>
              <h1 id="vinculoPlayer"></h1>
            </div>
            <div className="posicion-habilidades">
              {props.player
                ? props.player.habilidades.nombres.map((data) => (
                    <button
                      key={data}
                      className="boton-habilidad"
                      style={{
                        border: 5,
                        borderColor: "#E8E8E8",
                        borderStyle: "outset",
                        marginRight: 10,
                      }}
                      onClick={() => funcionalidadBotonPlayer(data)}
                    >
                      {data}
                    </button>
                  ))
                : null}
            </div>
          </div>
        </div>

        {/* Caja de texto */}
        <div className="animation-caja-text">
          <div style={{ flexDirection: "column" }}>
            <div className="caja-text-enemy">
              <h2 className="enemigo-accion">Acción del Enemigo:</h2>
              <h4 id="enemigo-accion">
                ¡{props.enemigo.nombre} entra en acción!
              </h4>
            </div>
            <div className="caja-text-player">
              <h2 className="player-accion">Acción del jugador:</h2>
              <h4 id="player-accion">
                ¡{props.player.nombre}, {props.player.tipo} entra en acción!
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(CampoBatalla);
