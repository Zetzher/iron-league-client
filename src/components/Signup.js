import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";

class Signup extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.signup({ email, password });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="container-validacion">
        <h1 style={{ fontSize: 20, marginBottom: 30 }}>Crea tu cuenta</h1>
        <form
          onSubmit={this.handleFormSubmit}
          className="container-padre-validacion"
        >
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

          <input
            type="submit"
            value="Signup"
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              border: "none",
              backgroundColor: "white",
            }}
          />
        </form>
        <div style={{}}>
          {this.props.signupMessage.statusText === "Bad Request" ? (
            <h1>Nombre de usario ya registrado</h1>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);
