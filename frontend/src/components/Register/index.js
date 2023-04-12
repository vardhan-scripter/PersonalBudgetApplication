import React,{Component} from 'react';
import '../Login/main.css'
import logo from '../../../public/loader.gif';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            error:"",
            status: false,
        }
    }
    handleRegister(){
        const data = this.state;
        this.setState({status: true})
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(data.email.match(validRegex) && data.name.length > 0 && data.password.length > 0 && data.email.length > 0){
            fetch('http://localhost:5000/auth/register',{
                method: "POST",
                mode: 'cors',
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then(responce => responce.json())
            .then(json => {
                this.setState({status: false})
                if(json.success === true){
                    this.setState({
                        status: true
                    })
                    setTimeout(() => {
                        window.location.href = "http://localhost:3000/login";
                    },1000)
                }else{
                    this.setState({
                        error: json.message
                    })
                }
            })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            });
        }else{
            this.setState({
                error: "Please enter data properly"
            })
        }
    }
    render(){
        const classes = ["registration","registration animate"];
        return(
            <div className="list-Item">
                <h1>Register Page</h1>
                <input 
                    type="email" 
                    value={this.state.email} 
                    placeholder="Enter You Email"
                    onChange={e => {
                        this.setState({
                            email: e.target.value
                        })
                    }} 
                />
                <input 
                    type="password" 
                    value={this.state.password} 
                    placeholder="Enter new password" 
                    onChange={e => {
                        this.setState({
                            password: e.target.value
                        })
                    }} 
                />
                <input 
                    type="text" 
                    value={this.state.name} 
                    placeholder="Enter Your Name" 
                    onChange={e => {
                        this.setState({
                            name: e.target.value
                        })
                    }} 
                />
                <button onClick={() => this.handleRegister()}>Register</button>
                <small className="error">{this.state.error}</small>
                <div className={this.state.status ? classes[1] : classes[0]}>
                    <p>Registration Successfull</p>
                    <button onClick={() => this.setState({status: false})}>X</button>
                </div>
                <div className={this.state.status ? 'loading' : 'loading-none'}>
                    <img src={logo} alt="loader" className="loader" />
                </div>
            </div>
        )
    }
}

export default Register;