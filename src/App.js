import React, { Component } from 'react';
// import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
// import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';



const initialState = {
  input:'',
  imageUrl:'',
  box: { },
  route: 'signin',
  isSignedIn:false,
  user:{
    id:'',
    name:'',
    email:'',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor(){
    super();
    this.state ={
      input:'',
      imageUrl:'',
      box: { },
      route: 'signin',
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries: 0,
        joined: ''
      }
    };
  }

  loadUser = (data) => {
    this.setState({user: {
      id:data.id,
      name:data.name,
      email:data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  calculateFaceLocation =(data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width -(clarifaiFace.right_col*width),
      bottomRow:  height - (clarifaiFace.bottom_row*height)
    }

  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }



  onInputChange =(event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
      this.setState({imageUrl: this.state.input})


      
        fetch('https://face-recognition-brain-server.onrender.com/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
        .then(response => response.json())
          .then(result => {
            if(result.outputs){
              fetch('https://face-recognition-brain-server.onrender.com/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.state.user.id
                }) 
              })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, {entries: count}))
              })
              .catch(console.log)
            }

            this.displayFaceBox(this.calculateFaceLocation(result));
          })
          .catch(error => console.log('error', error));


    }

  onRouteChange = (route) =>{
    if (route === 'signin'){
      this.setState(initialState)
    } else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route: route});
  }


  render(){
        const { isSignedIn, imageUrl, route, box } = this.state;
          return (
          <div className="App ">
            {/* <ParticlesBg num={30} type="cobweb" bg={true} /> */}
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
            { route === 'home'
            ? <div className='flex flex-column mt3'>
              {/* <Logo /> */}
              <Rank userName ={this.state.user.name} userEntries = {this.state.user.entries}/>
              <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit = {this.onButtonSubmit}/>
              <FaceRecognition box={box}imageUrl={imageUrl}/>
              </div>
            :(
              route=== 'signin'
              ?<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
              :<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            )
            }
          </div>
        );
    }
}

export default App;


