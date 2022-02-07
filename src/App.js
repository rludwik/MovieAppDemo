import './styles/App.scss'
import React, { Component } from 'react';
import Container from './components/Container.jsx'
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
         {!this.state.auth && 
            <div className='login'>
              <div className='Header'><h1>Log In to View Shows</h1></div>
              <Login login={this.login} />
            </div>
          }
          {this.state.auth && <Container logout={this.logout} isAdmin={this.state.admin} />}
      </div>
    );
  }

}