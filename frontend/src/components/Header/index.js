import React,{Component} from 'react';
import './main.css';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: ""
        }
    }
    componentDidMount(){
        fetch('http://localhost:5000/auth/getUserDetails',{
            method: "GET",
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('auth')
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(responce => responce.json())
        .then(json => {
            console.log(json);
            this.setState({
                name: json.name,
                email: json.email
            })
        });
    }
    logout(){
        sessionStorage.removeItem('auth');
        window.location.href = "http://localhost:3000/";
    }

    render(){
        return (
            <header>
                <h1>Personal Budget Application</h1>
                <div className="dropdown">
                    <button className="dropbtn">{this.state.name}</button>
                    <div className="dropdown-content">
                        <a onClick={() => this.logout()}>logout</a>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;