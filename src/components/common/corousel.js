import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import jquery from 'jquery';
import react1 from '../../images/react1.png';
import redux1 from '../../images/redux1.png';
import show1 from '../../images/show1.jpg';
import '../../App.css';
import Cards from './cards';

class Corousel extends Component {

    render() {

        return (
            <div>
                <div id="demo" class="carousel slide" data-ride="carousel">
                    <ul class="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" class="active"></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                        <li data-target="#demo" data-slide-to="2"></li>
                    </ul>
                    <div class="carousel-inner">
                        <div class="carousel-item">
                            <img src={show1} alt="New York" width="1100" height="400px !important" />
                            <div class="carousel-caption">
                                <h1>Talk is cheap.<br /> Show me the code.</h1>
                                {/* <p>We love the Big Apple!</p> */}
                            </div>
                        </div>
                        <div class="carousel-item active">


                            <img src={react1} alt="Los Angeles" width="1100" height="400px !important" />
                            <div class="carousel-caption">
                                {/* <h3>Los Angeles</h3>
                            <p>We had such a great time in LA!</p> */}
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src={redux1} alt="Chicago" width="1100" height="400px !important" />
                            <div class="carousel-caption">
                                {/* <h3>Chicago</h3>
                            <p>Thank you, Chicago!</p> */}
                            </div>
                        </div>

                    </div>
                    <a class="carousel-control-prev" href="#demo" data-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </a>
                    <a class="carousel-control-next" href="#demo" data-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </a>
                </div>
                <Cards />
            </div>
        );
    }
}
export default Corousel;