import React from 'react';
import '../Signin/Signin'

const Navigation = ({onRouteChange, isSignedIn}) =>{
       if(isSignedIn) {
        return (
             <nav style ={{display:'flex', justifyContent: 'flex-end'}}>
                <button onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign Out</button>
            </nav>
        );
        } else {
            return (
            <nav style ={{display:'flex', justifyContent: 'flex-end'}}>
              <button onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</button>
              <button onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</button>
            </nav>
            );
        }
        
}

export default Navigation;