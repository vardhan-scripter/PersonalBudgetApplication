import React,{Component} from 'react';
import './main.css';
import logo from '../../../public/loader.gif';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
            status: false,
        }
    }
    handleLogin(){
        const data = this.state;
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(data.email.match(validRegex) && data.email.length > 0 && data.password.length > 0){
            this.setState({status: true})
            fetch('http://localhost:5000/auth/login',{
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
                if(json.token === undefined){
                    this.setState({
                        error: json.message
                    })
                }else{
                    sessionStorage.setItem('auth',json.token);
                    // cookie.set("auth",json.token,{expiresIn: 36000});
                    const items = JSON.parse(sessionStorage.getItem('items'));
                    if(items !== null && items.length > 0){
                        fetch('http://localhost:5000/item/addDocument',{
                            method: "POST",
                            mode: 'cors',
                            body: sessionStorage.getItem('items'),
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': sessionStorage.getItem('auth')
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                        })
                        .then(responce => responce.json())
                        .then(json => {
                            window.location.href = "http://localhost:3000/";
                        })
                    }else{
                        window.location.href = "http://localhost:3000/";
                    }
                }
            })
            .catch(err => {
                this.setState({
                    error: err
                })
            });
        }else{
            this.setState({
                error: "Please enter data properly"
            })
        }
    }
    render(){
        return(
            <div className="list-Item">
                <h1>Login Page</h1>
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
                    placeholder="Enter Your Passsword" 
                    onChange={e => {
                        this.setState({
                            password: e.target.value
                        })
                    }} 
                />
                <button onClick={() => this.handleLogin()}>Login</button>
                <small className="error">{this.state.error}</small>
                <div className={this.state.status ? 'loading' : 'loading-none'}>
                    <img src={logo} alt="loader" className="loader" />
                </div>
            </div>
        )
    }
}

export default Login;
