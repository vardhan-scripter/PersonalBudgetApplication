import React, { Component } from "react";

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            cost: 0,
            done: false
        };
    }

    addItem = () => {
        this.props.onSubmitValue(this.state);
        this.setState({
            name: "",
            description: "",
            cost: 0,
            done: false
        });
    };

    render() {
        return (
            <div className="row-up NewItem">
                <h1>Add New Item</h1>
                <div>
                    <div className="input-div">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={this.state.name}
                            onChange={e => {
                                this.setState({ name: e.target.value });
                            }}
                        />
                    </div>
                    <div className="input-div-description">
                        <label>Description : </label>
                        <textarea
                            name="description"
                            id="description"
                            value={this.state.description}
                            cols="20"
                            rows="8"
                            onChange={e => {
                                this.setState({ description: e.target.value });
                            }}>
                        </textarea>
                    </div>
                    <div className="input-div">
                        <label>Cost</label>
                        <input
                            type="text"
                            name="cost"
                            id="cost"
                            value={this.state.cost}
                            onChange={e => {
                                this.setState({ cost: parseInt(e.target.value, 10) });
                            }}
                        />
                    </div>
                    <button className="add" onClick={() => this.addItem()}>
                        Add
                    </button>
                </div>
            </div>
        );
    }
}

export default AddItem;
