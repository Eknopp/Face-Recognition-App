import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css';

const Logo = () =>{
    return (
        
        <div className='ma4 mt0'>
            <Tilt style={{width:'100px', padding:'5px'}} tiltMaxAngleX={30} className= 'bg br3 shadow-1'>
            <img alt='logo' src={brain} />
            </Tilt>
        </div>
        
    );
}

export default Logo;