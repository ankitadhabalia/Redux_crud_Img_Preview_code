import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import jquery from 'jquery';
import '../../App.css';
import learn from '../../images/learn.jpeg';
import react from '../../images/react.png';
import redux from '../../images/redux.png';

class Cards extends Component{
    render() {
        return ( 
            <div className="container"> 
            <br />
      <div class="row">
      <div class="col-lg-4 " >
      <div class="cards">
      
        <img class="image" src={learn} alt="Generic placeholder image" width="100%" height="220" />
      
        <h2 className="text-center">Explore</h2>
        
      </div></div>
      
      <div class="col-lg-4 ">
      <div class="cards">
        <img class="image" src={react} alt="Generic placeholder image" width="100%" height="220" />
        
        <h2 className="text-center">React</h2>

        
      </div></div>
      <div class="col-lg-4">
      <div class="cards">
        <img class="image" src={redux} alt="Generic placeholder image" width="100%" height="220"/>
        
        <h2 className="text-center">Redux</h2>
        
      </div></div></div>
      </div>
         ); 
    }
}
export default Cards;