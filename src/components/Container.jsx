import React, { Component } from 'react';
import '../styles/Container.scss'
import Show from './Show.jsx';
import Home from './Home.jsx';
import {Icon} from 'semantic-ui-react';

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
    return (
        <div className='Container'>
           <div className='Sidemenu'>
               <div onClick={() => this.displayAllShows()} className='item'>Home</div>
               <div onClick={() => this.displayAllShows()} className='item'>Shows</div>
               {this.props.isAdmin && <div onClick={() => this.handleUser(true)} className='item admin'>Admin page</div>}
               <div onClick={() => this.displayAllShows()} className='item setting-item'>
                   <Icon style={{textAlign:'center'}} className='setting' name='setting' size='big'/>
               </div>
            </div>
            <div className='Content'>
                {this.state.shows ? 
                    <Home
                    logout={this.props.logout} 
                    isAdmin={this.props.isAdmin} 
                    displayChosenShow={this.displayChosenShow} 
                /> 
                :
                    <Show 
                    logout={this.props.logout} 
                    isAdmin={this.props.isAdmin} 
                    displayAllShows={this.displayAllShows} 
                    showId={this.state.showId}
                    showName={this.state.showName}
                />}
                
            </div>
        </div>
    )
  }
}
