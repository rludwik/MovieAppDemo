import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'

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

    handleLogin = (user, pass) => {
        if(user === '' || user == null){
            alert('Username field cannot be blank')
            return null}
        if(pass === '' || pass == null){
            alert('Password field cannot be blank')
            return null
        }

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
                <Form>
                    <Form.Field>
                        <label>Username</label>
                        <input className='input' type='text' placeholder='Username' onChange={this.username}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input className='input' type='password' placeholder='Password' onChange={this.password} />      
                    </Form.Field>
                    <div style={{textAlign:'center'}}>
                        <Button onClick={() => this.handleLogin(this.state.user, this.state.pass)}>Login</Button>
                        <Button onClick={() => alert('Redirects to account page')}>Create Account</Button>
                    </div>                
                </Form>
                {/* <input className='input' type='text' placeholder='Username' onChange={this.username}/>
                <input className='input' type='password' placeholder='Password' onChange={this.password} />
                <button onClick={() => this.handleLogin(this.state.user, this.state.pass)}> Login</button> */}
            </div>
        )
    }
}
