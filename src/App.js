import React, { Component } from 'react'
import "./stylesheets/App.css";
import { Switch, Route } from "react-router-dom";
import AuthProvider from "./lib/AuthProvider";
import Anonroute from "./components/Anonroute";
import PrivateRoute from "./components/Privateroute";
import SideNav from './components/Navbar';
import Juego from "./pages/Juego";
import Nivel from "./pages/Nivel";
import ChooseCharacter from "./pages/ChooseCharacter";
import EstasSeguro from "./pages/EstasSeguro";
import Perfil from "./pages/Perfil";
import Privateroute from './components/Privateroute';
import SabiaEleccion from './pages/SabiaEleccion';
import LandingPage from './pages/LandingPage';
import Validacion from './pages/Validacion';
import ConfirmarAsesinato from './pages/ConfirmarAsesinato';
import ConfirmarVinculo from './pages/ConfirmarAmistad';
import HasMuerto from './pages/HasMuerto';
import Introduccion from "./pages/Introduccion";
import HuevoPascua from "./pages/HuevoPascua";
import FinalBueno from "./pages/FinalBueno";
import FinalMalo from "./pages/FinalMalo";
import FinalNeutral from "./pages/FinalNeutral";


class App extends Component {
 
    render() {
        return (
            <AuthProvider>
            <SideNav />
              <Switch>
                <PrivateRoute exact path="/introduccion" component={Introduccion} />
                <Anonroute exact path="/validacion" component={Validacion} />
                <Route exact path='/' component={LandingPage} />
                <Privateroute exact path="/escoge-bien-a-tu-personaje" component={ChooseCharacter} />
                <PrivateRoute exact path="/estas-seguro-?" component={EstasSeguro} />
                <PrivateRoute exact path="/nivel" component={Nivel} />
                <PrivateRoute exact path="/confirmar-asesinato" component={ConfirmarAsesinato} />
                <PrivateRoute exact path="/confirmar-vinculo" component={ConfirmarVinculo} />
                <PrivateRoute exact path="/has-muerto" component={HasMuerto} />
                <PrivateRoute exact path="/juego" component={Juego} />
                <PrivateRoute exact path="/perfil" component={Perfil} />
                <PrivateRoute exact path="/sabia-eleccion" component={SabiaEleccion} />
                <PrivateRoute exact path="/huevoPascua" component={HuevoPascua} />
                <PrivateRoute exact path="/finalBueno/:id" component={FinalBueno} />
                <PrivateRoute exact path="/finalMalo/:id" component={FinalMalo} />
                <PrivateRoute exact path="/finalNeutral/:id" component={FinalNeutral} />
              </Switch>
          </AuthProvider>
        )
    }
}

export default App;
