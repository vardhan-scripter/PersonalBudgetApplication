import React, {Component} from 'react';
import './main.css';
import AddItem from '../AddItem';
import logo from "./../../../public/loader.gif";

class ItemList extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            paid:0,
            payable:0,
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/',{
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
            this.setState({
                isLoaded: true,
                items: json.items,
                paid: this.findPaid(json.items),
                payable: this.findPayable(json.items),
            })
        });
    }

    findPayable(json){
        var total = 0;
        json.forEach(item => {
            if(item.done === false){
                total+=item.cost;
            }
        });
        return total;
    }
    findPaid(json){
        var total = 0;
        json.forEach(item => {
            if(item.done === true){
                total+=item.cost;
            }
        });
        return total;
    }

    handleAddItem(data){
        fetch('http://localhost:5000/item/addItem',{
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('auth')
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(responce => responce.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json.items,
                paid: this.findPaid(json.items),
                payable: this.findPayable(json.items),
            })
        })
        .catch(err => console.log(err));
    }

    deleteItem(id){
        const data = {
            id: id,
        }
        fetch('http://localhost:5000/item/deleteItem',{
            method: "DELETE",
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('auth')
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(responce => responce.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json.items,
                paid: this.findPaid(json.items),
                payable: this.findPayable(json.items),
            })
        })
        .catch(err => console.log(err));
    }

    completeItem(id){
        const data = {
            id: id,
        }
        fetch('http://localhost:5000/item/completeItem',{
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('auth')
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(responce => responce.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json.items,
                paid: this.findPaid(json.items),
                payable: this.findPayable(json.items),
            })
        })
        .catch(err => console.log(err));

    }

    render(){


        var {isLoaded,items} = this.state;
        if(!isLoaded){
            return (
                <div className="loading">
                    <img src={logo} alt="loader" className="loader" />
                </div>)
        }
        else{
            return (
                <main>
                    <AddItem onSubmitValue={(data) => this.handleAddItem(data)} />
                    <div className="row-down List-Items">
                        <h1>Your Budget Items</h1>
                        {items.map((item) => {
                            return (
                                <div className="list" key={item.id}>
                                    <div className="listItem animate" id="listItem">
                                        <div className="listItem-header">
                                            <h1>{item.name}</h1>
                                            {item.done 
                                                ? <button className="paid">Paid</button> 
                                                : <button className="done" value={item.id} onClick={(e) => this.completeItem(e.target.value)}>Done</button>
                                            }
                                            <button className="delete" value={item.id} onClick={(e) => this.deleteItem(e.target.value)}>Delete</button>
                                        </div>
                                        <h1>Description : </h1>
                                        <p>{item.description}</p>
                                        <h1>Cost : {item.cost}</h1>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="row-down total-count">
                        <h2>Paid amount : {this.state.paid} Rs</h2>
                        <h2>Payable amount : {this.state.payable} Rs</h2>
                    </div>
                </main>
            )
        }
    }
}

export default ItemList;