import React from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaughBeam } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faCaretSquareLeft } from "@fortawesome/free-solid-svg-icons";
import { faCaretSquareRight } from "@fortawesome/free-solid-svg-icons";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";
import { faFistRaised } from "@fortawesome/free-solid-svg-icons";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";

class SideNav extends React.Component {
  state = {
    state: {
      showNav: false,
    },
  };

  openNavClick = (e) => {
    e.preventDefault();
    this.openNav();
  };

  closeNavClick = (e) => {
    e.preventDefault();
    this.closeNav();
  };

  openNav = () => {
    this.setState({
      showNav: true,
    });

    document.addEventListener("keydown", this.handleEscKey);
  };
  closeNav = () => {
    this.setState({
      showNav: false,
    });

    document.removeEventListener("keydown", this.handleEscKey);
  };

  handleEscKey = (e) => {
    if (e.key === "Escape") {
      this.closeNav();
    }
  };

  render() {
    let logout = this.props.logout;

    const { showNav } = this.state;
    let navCoverStyle = { width: showNav ? "100%" : "0" };
    let sideNavStyle = { width: showNav ? "250px" : "0" };
    return (
      <React.Fragment>
        <span onClick={this.openNavClick} className="open-nav">
          {/*&#9776;*/}
          <FontAwesomeIcon
            icon={faCaretSquareRight}
            style={{ fontSize: 30, color: "#6E263C", zIndex: 2 }}
          />
        </span>
        <div
          onClick={this.navCoverClick}
          className="nav-cover"
          style={navCoverStyle}
        />
        <div name="side-nav" className="side-nav" style={sideNavStyle}>
          <div onClick={this.closeNavClick} className="close-nav" style={{marginTop: 16}}>
            <FontAwesomeIcon
              icon={faCaretSquareLeft}
              style={{ fontSize: 30, color: "#6E263C" }}
            />
          </div>
          {this.props.isLoggedin &&
          window.location.href ===
            `https://ironleaguehack.firebaseapp.com/perfil` ? (
            <div className="sidenav-apartados">
              <h2 style={{ fontSize: 30, marginBottom: 50 }}>Perfil</h2>
              <h3>
                Aquí es donde comienza tu aventura, selecciona a uno de tus
                personajes y diviértete.
              </h3>

              <button
                onClick={logout}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  border: "none",
                  backgroundColor: "white",
                }}
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  style={{ fontSize: 30, color: "#6E263C" }}
                />
              </button>
            </div>
          ) : null}
          {this.props.isLoggedin &&
          window.location.href ===
            `https://ironleaguehack.firebaseapp.com/escoge-bien-a-tu-personaje` ? (
            <div className="sidenav-apartados">
              <h2
                style={{
                  fontSize: 25,
                  marginTop: 20,
                  marginBottom: 20,
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                Escoge a tu personaje
              </h2>
              <h3>
                El personaje que escojas se guardará en tu perfil para que
                puedas jugar con el y así subir sus stats.<br></br>
                ¡Como máximo puedes tener cuatro personajes!
              </h3>
              <Link to="/perfil">
                <button
                  style={{
                    width: 50,
                    height: 50,
                    marginBottom: 10,
                    borderRadius: 50,
                    border: "none",
                    backgroundColor: "#CA7A93",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ fontSize: 30, color: "#6E263C" }}
                  />
                </button>
              </Link>
              <button
                onClick={logout}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  border: "none",
                  backgroundColor: "#CA7A93",
                }}
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  style={{ fontSize: 30, color: "#6E263C" }}
                />
              </button>
            </div>
          ) : null}
          {this.props.isLoggedin &&
          window.location.href === `https://ironleaguehack.firebaseapp.com/juego` ? (
            <div className="sidenav-apartados">
              <h2 style={{ fontSize: 25, marginBottom: 50 }}>Juego</h2>
              <h3>
                Aquí es donde está The Real Game, todo lo que necesitas es
                seguir tu intuición.
              </h3>
              <h3 style={{ fontSize: 15, color: "white" }}>Stats</h3>
              <FontAwesomeIcon
                icon={faHeartbeat}
                style={{ fontSize: 25 }}
              />{" "}
              <h3 style={{ fontSize: 13, color: "white" }}>Motivación</h3>
              <FontAwesomeIcon
                icon={faFistRaised}
                style={{ fontSize: 25 }}
              />{" "}
              <h3 style={{ fontSize: 13, color: "white" }}>Fuerza</h3>
              <FontAwesomeIcon
                icon={faHatWizard}
                style={{ fontSize: 25 }}
              />{" "}
              <h3 style={{ fontSize: 13, color: "white" }}>Habilidad</h3>
              <FontAwesomeIcon
                icon={faUserShield}
                style={{ fontSize: 25 }}
              />{" "}
              <h3 style={{ fontSize: 13, color: "white" }}>Indestructible</h3>
              <FontAwesomeIcon
                icon={faStarHalf}
                style={{ fontSize: 25 }}
              />{" "}
              <h3 style={{ fontSize: 13, color: "white" }}>Mitad Daño</h3>
              <FontAwesomeIcon
                icon={faSkullCrossbones}
                style={{ fontSize: 25 }}
              />
              <h3 style={{ fontSize: 13, color: "white" }}>Veneno</h3>
              <FontAwesomeIcon icon={faCrosshairs} style={{ fontSize: 25 }} />
              <h3 style={{ fontSize: 13, color: "white" }}>Punto Vital</h3>
              <Link to="/perfil">
                <button
                  style={{
                    width: 50,
                    height: 50,
                    marginBottom: 10,
                    borderRadius: 50,
                    border: "none",
                    backgroundColor: "#CA7A93",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ fontSize: 30, color: "#6E263C" }}
                  />
                </button>
              </Link>
              <button
                onClick={logout}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  border: "none",
                  backgroundColor: "#CA7A93",
                  marginBottom: 40,
                }}
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  style={{ fontSize: 30, color: "#6E263C" }}
                />
              </button>
            </div>
          ) : null}
          {this.props.isLoggedin &&
          window.location.href ===
            `https://ironleaguehack.firebaseapp.com/nivel` ? (
            <div className="sidenav-apartados">
              <h2 style={{ fontSize: 25, marginBottom: 50 }}>Nivel</h2>
              <h3>
                Puedes escoger cualquier nivel en verdad, pero si acabas de
                empezar, empezaría por el fácil, no vaya a ser que eliminen a tu
                personaje{" "}
                <FontAwesomeIcon icon={faLaughBeam} style={{ fontSize: 30 }} />.
              </h3>
              <Link to="/perfil">
                <button
                  style={{
                    width: 50,
                    height: 50,
                    marginBottom: 10,
                    borderRadius: 50,
                    border: "none",
                    backgroundColor: "#CA7A93",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ fontSize: 30, color: "#6E263C" }}
                  />
                </button>
              </Link>
              <button
                onClick={logout}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  border: "none",
                  backgroundColor: "#CA7A93",
                }}
              >
                <button
                  onClick={logout}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    border: "none",
                    backgroundColor: "#CA7A93",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    style={{ fontSize: 30, color: "#6E263C" }}
                  />
                </button>
              </button>
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default withAuth(SideNav);
