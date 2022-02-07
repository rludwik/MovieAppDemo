import React, { Component } from 'react';
import "../styles/Home.scss";
import { Loader, Dropdown } from "semantic-ui-react";

export default class Home extends Component {

    state = {
        loading: true,
        json: null,
        searchTerm: '',
        startsWith: true,
        admin: this.props.isAdmin,
    }

    handleChange = (e) => {
        this.setState({searchTerm: e.target.value});
    }

    async componentDidMount() {
        const url = `https://api.tvmaze.com/shows`
        const response = await fetch(url);
        const data = await response.json();
        this.setState({json: data, loading: false});
    }

    render() {
        var {loading, json, searchTerm, startsWith} = this.state;
        if (loading) return <Loader active size='massive'>Loading Shows...</Loader>
        
        return (
            <div className="outer-container">
                <div className='title'><h1>ALL T.V. SHOWS!</h1></div>
                <div className='search' >
                    <input className='input search-box' type='text' placeholder='Search Show...' onChange={this.handleChange}/>
                    <input className='input radio' type="radio" name='search' onChange={() => this.setState({startsWith: true})} checked={startsWith}/> Starts With
                    <input className='input radio' type="radio" name='search' onChange={() => this.setState({startsWith: false})} /> Contains
                    <button className='btn-logout' onClick={() => this.props.logout()}> Log Out </button>
                    {this.props.isAdmin && <button className='btn-logout' onClick={() => alert("You're an Admin")}> Admin Page </button>}
                    {!this.props.isAdmin && <button className='btn-logout' onClick={() => alert("You're a user")}> Contact an Admin </button>}
                    
                </div>
                <div className="inner-container">
                    {json && 
                        json.filter((val) => {
                            if(searchTerm === ''){
                            return val
                            } else if (startsWith && val.name.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                            return val
                            } else if (!startsWith && val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val
                            } else 
                            return null
                        }).map((number, id) => {
                            return(
                            <div key={id} className='episodes' onClick={() => this.props.displayChosenShow(number.id, number.name)}>
                                <h3>{number.name}</h3>
                                <ul>
                                {number.image !== null && <img src={number.image.medium} alt='Show description' />}
                                {number.image === null && <div className='image'></div>}
                                </ul>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        ); 
    }
}
