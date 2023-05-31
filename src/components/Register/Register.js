import React from 'react';
import localforage from 'localforage';



class  Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            signUpName: '',
            signUpEmail:'',
            signUpPassword:'',
            isFetchingUser:false

        }
     }
    onNameChange = (event) => {
        this.setState({signUpName:event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({signUpEmail:event.target.value})
    }

       
    onPasswordChange = (event) => {
        this.setState({signUpPassword:event.target.value})
    }

    onSubmitSignIn = () => {
        this.setState({isFetchingUser:true})
        fetch('https://face-recognition-brain-server.onrender.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.signUpName,
                email: this.state.signUpEmail,
                password: this.state.signUpPassword
            }) 
        }) 
        .then(response => response.json())
        .then(user =>{
           if(user.id){
            this.props.loadUser(user);
            localforage.setItem('loggedUser', user)
            .catch((error) => {
                console.log('error storing data', error)
            })
             this.props.onRouteChange('home');
           } else {
            this.setState({isFetchingUser:false})
            alert('Either this email already exists, or you haven\'t filled up all the information needed')
           }
        })
    } 

    render(){
        const { isFetchingUser } = this.state
        if(!isFetchingUser){
            return (
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <div>
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name"  
                            id="name"
                            onChange = {this.onNameChange} />
                            
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address" 
                            onChange = {this.onEmailChange}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password" 
                            onChange = {this.onPasswordChange}/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign up" />
                        </div>
                    </div>
                    </main>
                </div>
                </article>
            );
        } else {
            return (
                <div className='mt7'>
                    <p>Creating New User...</p>
                </div>
            )
        }
    }
    
}

export default Register;