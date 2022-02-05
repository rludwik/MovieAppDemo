import React, { Component } from 'react';
import '../styles/Container.scss'
import Show from './Show';
import Home from './Home';

export default class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            shows:true,
            episodes:false,
            showId:0,
            showName: ''
        }
    }

    handleUser = (name) => {
        if(name) alert('Admin level')
        else alert('User level')
    }
    
    displayAllShows = () => {
        this.setState({episodes:false, shows:true})
    }

    displayChosenShow = (id, name) => {
        this.setState({episodes:true, shows:false, showId:id, showName:name})
    }

   

  render() {
    //   const { isAdmin, logout } = this.props;  destructured for faster coding but slower debugging
    return (
        <div className='Container'>
           <div className='Sidemenu'>
               <div onClick={() => this.displayAllShows()} className='item'>Home</div>
               <div onClick={() => this.displayAllShows()} className='item'>Shows</div>
               {this.props.isAdmin && <div onClick={() => this.handleUser(true)} className='item admin'>Admin page</div>}
            </div>
            <div className='Content'>
                {/* <div className='Header'><h1>T.V. SHOWS!</h1></div> */}
                {this.state.episodes && 
                    <Show 
                    logout={this.props.logout} 
                    isAdmin={this.props.isAdmin} 
                    displayAllShows={this.displayAllShows} 
                    showId={this.state.showId}
                    showName={this.state.showName}
                />}
                {this.state.shows && 
                    <Home 
                    logout={this.props.logout} 
                    isAdmin={this.props.isAdmin} 
                    displayChosenShow={this.displayChosenShow} 
                />}
            </div>
        </div>
    )
  }
}
