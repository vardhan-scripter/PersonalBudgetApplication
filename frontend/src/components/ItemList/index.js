import React, {Component} from 'react';
import './main.css';
import AddItem from '../AddItem';

class ItemList extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            // newItem: {
            //     name: "",
            //     description: "",
            //     cost: 0,
            //     done: false,
            // },
            paid:0,
            payable:0,
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/',{
            method: "GET",
        })
        .then(responce => responce.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
                // newItem: {
                //     name: "",
                //     description: "",
                //     cost: 0,
                //     done: false,
                // },
                paid: this.findPaid(json),
                payable: this.findPayable(json),
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

    // addItem(){
    //     const data = {
    //         name: this.state.newItem.name,
    //         description: this.state.newItem.description,
    //         cost: this.state.newItem.cost,
    //         done: this.state.newItem.done,
    //     }
    //     console.log(data)
    //     fetch('http://localhost:5000/item/addItem',{
    //         method: "POST",
    //         mode: 'cors',
    //         body: JSON.stringify(data),
    //         headers: {
    //         'Content-Type': 'application/json'
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //     })
    //     .then(responce => responce.json())
    //     .then(json => {
    //         console.log(json);
    //         this.setState({
    //             isLoaded: true,
    //             items: json,
    //             newItem: {
    //                 name: "",
    //                 description: "",
    //                 cost: 0,
    //                 done: false,
    //             },
    //             paid: this.findPaid(json),
    //             payable: this.findPayable(json),
    //         })
    //     })
    //     .catch(err => console.log(err));
    // }

    handleAddItem(data){
        console.log(data)
        fetch('http://localhost:5000/item/addItem',{
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
            console.log(json);
            this.setState({
                isLoaded: true,
                items: json,
                paid: this.findPaid(json),
                payable: this.findPayable(json),
            })
        })
        .catch(err => console.log(err));
    }

    deleteItem(id){
        const data = {
            id: id,
        }
        console.log(data);
        fetch('http://localhost:5000/item/deleteItem',{
            method: "DELETE",
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(responce => responce.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
                // newItem: {
                //     name: "",
                //     description: "",
                //     cost: 0,
                //     done: false,
                // },
                paid: this.findPaid(json),
                payable: this.findPayable(json),
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
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(responce => responce.json())
        .then(json => {
            console.log(json);
            this.setState({
                isLoaded: true,
                items: json,
                // newItem: {
                //     name: "",
                //     description: "",
                //     cost: 0,
                //     done: false,
                // },
                paid: this.findPaid(json),
                payable: this.findPayable(json),
            })
        })
        .catch(err => console.log(err));

    }

    render(){


        var {isLoaded,items} = this.state;
        if(!isLoaded){
            return <div className="loading">Loading...</div>
        }
        else{
            return (
                <main>
                    <AddItem onSubmitValue={(data) => this.handleAddItem(data)} />
                    {/* <div className="row-up NewItem">
                        <h1>Add New Item</h1>
                        <div>
                            <div className="input-div">
                                <label>Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    value={this.state.newItem.name} 
                                    onChange={(e) => {this.setState({newItem: {name:e.target.value,description:this.state.newItem.description,cost: this.state.newItem.cost,done: false}})}} />
                            </div>
                            <div className="input-div-description">
                                <label>Description : </label>
                                <textarea 
                                    name="description" 
                                    id="description" 
                                    value={this.state.newItem.description} 
                                    cols="20" 
                                    rows="8" 
                                    onChange={(e) => {this.setState({newItem: {name: this.state.newItem.name,description:e.target.value,cost: this.state.newItem.cost,done: false}})}}>
                                </textarea>
                            </div>
                            <div className="input-div">
                                <label>Cost</label>
                                <input 
                                    type="text" 
                                    name="cost" 
                                    id="cost" 
                                    value={this.state.newItem.cost} 
                                    onChange={(e) => {this.setState({newItem: {name: this.state.newItem.name,description:this.state.newItem.description,cost: e.target.value,done: false}})}} />
                            </div>
                            <button 
                                className="add" 
                                onClick={() => this.addItem()}>Add</button>
                        </div>
                    </div> */}
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