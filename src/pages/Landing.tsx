import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowDownRight } from 'react-icons/fi';

import logoImg from '../images/spot-text-logo.png';

import '../styles/pages/landing.css'

function Landing() {
 return (
  <div id="page-landing">
   <div className="content-wrapper">
    <img src={logoImg} alt="logo" />

    <main>
     <h1>Passou no <span className="pinkSpan">vestibular</span> e não tem <span className="pinkSpan">onde ficar?</span> </h1>
     <p>O <span className="pinkSpan">Uni</span>Spot te mostra!</p>
    </main>

    <div className="location">
     <strong><span className="pinkSpan">Florianópolis</span></strong>
     <span>Santa Catarina</span>
    </div>
    <Link to="/map" className="enter-app">
     <FiArrowDownRight size={36} color="rgba(255,255,255,1)" />
    </Link>
   </div>
  </div>
 );
}

export default Landing;