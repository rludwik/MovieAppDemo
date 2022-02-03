import Home from './components/Home.jsx';
import './styles/App.scss'
import React, { Component } from 'react';
import Login from './components/Login.jsx'

export default class App extends Component {

  state={
    auth:false,
    admin:false
  }

  login = (isAdmin) => {
    this.setState({auth: true, admin: isAdmin})
  }

  logout = () => {
    this.setState({auth: false})
  }

  render(){
    return (
      <div className='App'>
        {!this.state.auth && <div className='Header'><h1>Log In to View Shows</h1></div>}
        {!this.state.auth && <Login login={this.login} />}

        {this.state.auth && <div className='Header'><h1>T.V. SHOWS!</h1></div>}
        {this.state.auth && <Home logout={this.logout} isAdmin={this.state.admin} />}
      </div>
    );
  }

}