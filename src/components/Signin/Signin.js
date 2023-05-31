import React from 'react';
import localforage from 'localforage';




class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword:'',
            isFetchingUser:false
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        this.setState({isFetchingUser:true})
        fetch('https://face-recognition-brain-server.onrender.com/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email:this.state.signInEmail,
            password: this.state.signInPassword
        })
       })
       .then(response => response.json())
       .then(user =>{
          if(user.id){
            this.props.loadUser(user)
            localforage.setItem('loggedUser', user)
            .then((user) => {
                console.log(user)
            })
            .catch((error) => {
                console.log('error storing data', error)
            })
            this.props.onRouteChange('home');
            this.setState({isFetchingUser:false})
            } else {
                this.setState({isFetchingUser:false})
                alert('Email or Password was incorrect, please try again')
            }
        })
        
    }

    
    render(){
        const { isFetchingUser } = this.state
        if(!isFetchingUser) {
            const { onRouteChange } = this.props;
            return (
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <div>
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange={this.onEmailChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password" 
                            onChange={this.onPasswordChange}/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                        <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                    </main>
                </div>
                </article>
            );
        } else {
            return (
                <div className='mt7'>
                    <p>Authenticating...</p>
                </div>
            )
        }
    }
}

export default Signin;
