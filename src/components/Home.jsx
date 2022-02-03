import React, { Component } from 'react';
import '../styles/Home.scss';

export default class Home extends Component {

  state = {
      loading: true,
      json: null,
      searchTerm: '',
      startsWith: true,
      admin: this.props.admin
  }

handleChange = (e) => {
  this.setState({searchTerm: e.target.value});
}

  async componentDidMount() {
    const url = 'https://api.tvmaze.com/seasons/1/episodes'
    const response = await fetch(url);
    const data = await response.json();
    this.setState({json: data, loading: false});
  }
  render() {
    
    if(this.state.loading)
      return <h1>LOADING DATA...</h1>
    else {
      return (
        <div className="outer-container">
          <div className='search' >
            <input className='input search-box' type='text' placeholder='Movie Title...' onChange={this.handleChange}/>
            <input className='input radio' type="radio" name='search' onChange={() => this.setState({startsWith: true})} checked={this.state.startsWith}/> Starts With
            <input className='input radio' type="radio" name='search' onChange={() => this.setState({startsWith: false})} /> Contains
            <button className='btn-logout' onClick={() => this.props.logout()}> Log Out </button>
            {this.props.isAdmin && <button className='btn-logout' onClick={() => alert("You're an Admin")}> Admin Page </button>}
            {!this.props.isAdmin && <button className='btn-logout' onClick={() => alert("You're a user")}> Contact an Admin </button>}

          </div>
          <div className="inner-container">
            
            {this.state.json && 
                this.state.json.filter((val) => {
                  if(this.state.searchTerm === ''){
                    return val
                  } else if (this.state.startsWith && val.name.toLowerCase().startsWith(this.state.searchTerm.toLowerCase())) {
                    return val
                  } else if (!this.state.startsWith && val.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                    return val
                  } else 
                    return null
                }).map((number, id) => {
                  return(
                    <div key={id} className='movie' onClick={() => alert(`"${number.name }" added to cart!`)}>
                      <h3>{number.name}</h3>
                      <ul>
                        <li>Season: {number.season}</li>
                        <img src={number.image.medium} alt='Show description' />
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
}
