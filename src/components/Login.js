import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";

class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
 
  render() {
    const { email, password } = this.state;
    return (
        <div className="container-validacion">
          <h1 style={{fontSize: 20, marginBottom: 30}}>Iniciar sesión</h1>

          <form onSubmit={this.handleFormSubmit} className="container-padre-validacion">
            <label>Username:</label>
            <input
              type="text"
              name="email"
              placeholder="Escribe aquí tu username"
              value={email}
              onChange={this.handleChange}
            />

            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={password}
              onChange={this.handleChange}
            />

            <input type="submit" value="Login" style={{width: 50, height: 50, borderRadius: 50, border: 'none', backgroundColor: 'white'}} />
          </form>
          {this.props.loginMessage && <h1>Usuario o Contraseña mal ingresada</h1>}
        </div>
    );
  }
}

export default withAuth(Login);
