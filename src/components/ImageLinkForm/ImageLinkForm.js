import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
    return (
        
        <div className='ma4 mt0'>
            <p className='f3'>
                {'Enter a link to a picture, to detect faces'}
            </p>
            <div className='center'>
                <div className= 'center pa4 br3 shadow-5 form'>
                  <input className ='f4 pa2 w-70 center'type='text' onChange={onInputChange}/>
                    <button className='w-20 f4 ph3 black bg-moon-gray'
                    onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
        
    );
}

export default ImageLinkForm;