import React, {Component} from 'react';
import './main.css';
import AddItem from '../AddItem';
import {Beforeunload} from "react-beforeunload";

class GeneralApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: true,
            paid:0,
            payable:0,
        }
    }

    setSession(){
        sessionStorage.setItem('items',JSON.stringify(this.state.items));
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
        const items = this.state.items;
        const newItem = {
            id: Date.now(),
            name: data.name,
            description: data.description,
            cost: data.cost,
            done: false,
            date: Date.now()
        }
        items.unshift(newItem);
        this.setState({
            isLoaded: true,
            items: items,
            paid: this.findPaid(items),
            payable: this.findPayable(items),
        })
        this.setSession();
    }

    deleteItem(id){
        const items = [...this.state.items];
        const updatedItems = items.filter(item => item.id !== id);
        this.setState({
            isLoaded: true,
            items: updatedItems,
            paid: this.findPaid(updatedItems),
            payable: this.findPayable(updatedItems),
        })
        this.setSession();
    }

    completeItem(id){
        const items = this.state.items;
        items.map(item => {
            if(item.id === parseInt(id)){
                item.done = true;
            }
            return item;
        })
        this.setState({
            isLoaded: true,
            items: items,
            paid: this.findPaid(items),
            payable: this.findPayable(items),
        })
        this.setSession();
    }

    render(){

        var {isLoaded,items} = this.state;
        if(!isLoaded){
            return <div className="loading">Loading...</div>
        }
        else{
            return (
                <main>
                    <Beforeunload onBeforeunload={() => {
                        if(this.state.items.length > 0){
                            return "You'll lose your data!"
                        }
                    }} />
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
                                        <button className="delete" onClick={() => this.deleteItem(item.id)}>Delete</button>
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

export default GeneralApp;