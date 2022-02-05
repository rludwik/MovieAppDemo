import React, { Component } from 'react';



export default class Login extends Component {
  
    state = {
        auth: false,
        user:'',
        pass:''
    }

    username = (e) => {
        this.setState({user: e.target.value});
    }

    password = (e) => {
        this.setState({pass: e.target.value});
    }
    debugger
    handleLogin = (user, pass) => {
        if(user.toLowerCase() === 'user' && pass === '123')
            this.props.login(false)
        else if(user.toLowerCase() === 'admin' && pass === '123'){
            this.props.login(true)
        } 
        else
            alert('Incorrect credentials! Try Again!')
    }

    render() {
        return( 

        <div className='outer-container'>
            <input className='input' type='text' placeholder='Username' onChange={this.username}/>
            <input className='input' type='password' placeholder='Password' onChange={this.password} />
            <button onClick={() => this.handleLogin(this.state.user, this.state.pass)}> Login</button>
        </div>
    )}
}
