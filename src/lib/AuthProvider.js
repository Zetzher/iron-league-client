import React from "react";
import auth from "./auth-service"; // Importamos funciones para llamadas axios a la API
import { EatLoading } from "react-loadingg";
import astronomia from "../musica/Astronomia.mp3";
const { Consumer, Provider } = React.createContext();

// HOC para crear Consumer
// el componente withAuth recibe un componente como argumento y nos devuelve un componente con el mismo componente dentro de un <Consumer /> con las propiedades user e isLoggedin (state), y los métodos login, signup y logout (this)
const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {/* El componente <Consumer> provee un callback que recibe el "value" con el objeto Providers */}
          {({
            login,
            signup,
            user,
            logout,
            isLoggedin,
            loginMessage,
            signupMessage,
          }) => {
            return (
              <WrappedComponent
                login={login}
                signup={signup}
                user={user}
                logout={logout}
                isLoggedin={isLoggedin}
                loginMessage={loginMessage}
                signupMessage={signupMessage}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

// Provider
class AuthProvider extends React.Component {
  state = {
    isLoggedin: false,
    user: null,
    isLoading: true,
    loginMessage: "",
    signupMessage: "",
  };

  componentDidMount() {
    // luego de que se monte el componente, llama a auth.me() que nos devuelve el usuario y setea los valores para loguearlo
    auth
      .perfil()
      .then((user) =>
        this.setState({ isLoggedin: true, user: user, isLoading: false })
      )
      .catch((err) =>
        this.setState({ isLoggedin: false, user: null, isLoading: false })
      );
  }

  signup = (user) => {
    const { email, password } = user;

    auth
      .signup({ email, password })
      .then((user) => {
        this.setState({ isLoggedin: true, user });
      })
      .catch(({ response }) => {
        this.setState({
          signupMessage: {
            status: response.status,
            statusText: response.statusText,
            errorMessage: response.data.errorMessage,
          },
        });
        console.log(this.state.message);
      });
  };

  login = (user) => {
    const { email, password } = user;

    auth
      .login({ email, password })
      .then((user) => this.setState({ isLoggedin: true, user }))
      .catch(({ response }) => {
        this.setState({
          loginMessage: {
            status: response.status,
            statusText: response.statusText,
            errorMessage: response.data.errorMessage,
          },
        });
        console.log(this.state.message);
      });
  };

  logout = () => {
    auth
      .logout()
      .then(() => this.setState({ isLoggedin: false, user: null }))
      .catch((err) => console.log(err));
  };

  render() {
    // destructuramos isLoading, isLoggedin y user de this.state y login, logout y signup de this
    const {
      isLoading,
      isLoggedin,
      user,
      signupMessage,
      loginMessage,
    } = this.state;
    const { login, logout, signup } = this;

    return isLoading ? (
      // si está loading, devuelve un <div> y sino devuelve un componente <Provider> con un objeto con los valores: { isLoggedin, user, login, logout, signup}
      // el objeto pasado en la prop value estará disponible para todos los componentes <Consumer>
      <section className="section-for-loading">
        <audio autoPlay>
          <source src={astronomia} />
        </audio>
        <h1 className="title-for-loading">IRONLEAGUE</h1>
        <div className="spinner-loading">
          <EatLoading speed={2} />
        </div>
      </section>
    ) : (
      <Provider
        value={{
          isLoggedin,
          user,
          login,
          logout,
          signup,
          loginMessage,
          signupMessage,
        }}
      >
        {this.props.children}
      </Provider>
    ); /*<Provider> "value={}" datos que estarán disponibles para todos los componentes <Consumer> */
  }
}

export { Consumer, withAuth }; //  <--	RECUERDA EXPORTAR  ! ! !

export default AuthProvider; //	<--	RECUERDA EXPORTAR  ! ! !
