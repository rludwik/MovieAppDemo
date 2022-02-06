import React, { Component } from 'react';
import '../styles/Show.scss';
import { Popup } from 'semantic-ui-react'

export default class Show extends Component {

  state = {
      loading: true,
      json: null,
      searchTerm: '',
      startsWith: true,
      admin: this.props.isAdmin,
      showId: this.props.showId,
      totalSeasons: 0,
      season: 0
  }

  handleChange = (e) => {
    this.setState({searchTerm: e.target.value});
  }

  showSummary = (sum) => {
    alert(sum);
  }

  getSelection = () => {
    var select = document.getElementById('seasons');
    var value = select.options[select.selectedIndex].value;
    this.setState({season: value})
  }

  async componentDidMount() {
    const url = `https://api.tvmaze.com/shows/${this.state.showId}/episodes`
    const response = await fetch(url);
    const data = await response.json();
    this.setState({json: data, loading: false, totalSeasons: data.slice(-1)[0].season});
  }

  render() {
    let seasonsArr = [];
    if(this.state.json) {
      for(let i = 0; i<=this.state.totalSeasons;i++){
        seasonsArr.push(i);
      }
    }
    if(this.state.loading)
      return <h1>LOADING DATA...</h1>
    return (
      <div className="outer-container">
        <div className='title'><h1>{this.props.showName}</h1></div>
        <div className='search' >
          <input className='input search-box' type='text' placeholder='Search Episode...' onChange={this.handleChange}/>
          <input className='input radio' type="radio" name='search' onChange={() => this.setState({startsWith: true})} checked={this.state.startsWith}/> Starts With
          <input className='input radio' type="radio" name='search' onChange={() => this.setState({startsWith: false})} /> Contains 
          <label className='seasons' for="seasons">Season</label>   
          <select id='seasons' onChange={() => this.getSelection()} className='input' name="seasons" placeholder='selects'>
            <option>All</option>
             {seasonsArr.map(option => {
               return(
                 option !== 0 && <option>{option}</option>
               )
             })}
          </select>
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
                  this.state.season > 0 ? 
                  this.state.season === number.season &&
                  <Popup className='popup' left center size='small' content={number.summary.slice(3, -4)} trigger={
                    <div key={id} className='episode' >
                      <h3>{number.name}</h3>
                      <ul>
                        <li>Season: {number.season} Episode: {number.number}</li>
                        {number.image !== null && <img src={number.image.medium} alt='Show description' />}
                        {number.image === null && <div className='image'></div>}
                      </ul>
                    </div>}
                  />
                  :
                  <Popup className='popup' left center size='small' content={number.summary.slice(3, -4)} trigger={
                    <div key={id} className='episode'>
                      <h3>{number.name}</h3>
                      <ul>
                      <li>Season: {number.season} Episode: {number.number}</li>
                      {number.image !== null && <img src={number.image.medium} alt='Show description' />}
                      {number.image === null && <div className='image'></div>}
                    </ul>
                    </div>}
                  />
                )
              })
          }
      </div>
    </div>
    );
  } 
}
   
