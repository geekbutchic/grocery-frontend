import React, { Component } from "react";
import "./Grocery.css"; 
import { v4 as uuidv4 } from "uuid"; 
import GroceryList from "./GroceryList";


export class Grocery extends Component {
    state = {
        groceryList: [
          {
            id: uuidv4(),
            grocery: "Strawberries",
            isDone: false,
            dateAdded: Date.now(),
          },
          {
            id: uuidv4(),
            grocery: "Tomatoes",
            isDone: false,
            dateAdded: Date.now() + 1,
          },
          {
            id: uuidv4(),
            grocery: "Vino",
            isDone: false,
            dateAdded: Date.now() + 2,
          },
        ],
        groceryInput: "", 
      };
      handleGroceryOnChange = (event) => {
        this.setState({
          groceryInput: event.target.value,
        });
      };
    
      handleOnSubmit = (event) => {
        event.preventDefault();  
    
        let newArray = [
          ...this.state.groceryList, 
          {
            id: uuidv4(),
            grocery: this.state.groceryInput,
            isDone: false,
          },
        ];
        this.setState({
          groceryList: newArray,
          groceryInput: "", 
        });
      };
    
      handleDeleteByID = (id) => {    
        let filteredArray = this.state.groceryList.filter((item) => item.id !== id);
    
        this.setState({
          groceryList: filteredArray,
        });
      };
    
      handleDoneByID = (id) => {
        console.log(id);
        let updatedArray = this.state.groceryList.map((item) => {
          if (item.id === id) {
            item.isDone = !item.isDone; 
          }
          return item;
        });
        this.setState({
          groceryList: updatedArray,
        });
      };
    
      handleEditByID = (id, editInput) => {
        let updatedTodoArray = this.state.groceryList.map((item) => {
          if (item.id === id) {
            item.grocery = editInput;
          }
          return item;
        });
        this.setState({
          groceryList: updatedTodoArray,
        });
      };
    
      sortByDateNewestToOldest = () => {
        let sortedGrocery = this.state.groceryList
          .sort((a, b) => {
            return new Date(a.dateAdded) - new Date(b.dateAdded);
          })
          .reverse();
        this.setState({
          groceryList: sortedGrocery,
        });
      };
    
      sortByDateOldestToNewest = () => {
        let sortedGrocery = this.state.groceryList
        .sort((a, b) => {
          return new Date(a.dateAdded) - new Date(b.dateAdded);
        })
      this.setState({
        groceryList: sortedGrocery,
      });
      };
    
      sortByDone = () => {

      };
    
      sortByNotDone = () => {

      };
    
      render() {
        return (
          <div className="container">
            <div className="form-div">
              <form onSubmit={this.handleOnSubmit}>
                <input
                  name="groceryInput"
                  type="text"
                  onChange={this.handleGroceryOnChange}
                  value={this.state.groceryInput} 
                />
                <button type="submit">Submit</button>
              </form>
            </div>
    
            <div className="sorting">
              <ul>
                <li>
                  <button onClick={this.sortByDateNewestToOldest}>
                    Sort by Date - Newest to oldest
                  </button>
                </li>
                <li>
                  <button onClick={this.sortByDateOldestToNewest}>
                    Sort by Date - Oldest to newest
                  </button>
                </li>
                <li>
                  <button onClick={this.sortByDone}>Sort by Done</button>
                </li>
                <li>
                  <button onClick={this.sortByNotDone}>Sort by Not Done</button>
                </li>
              </ul>
            </div>
    
            <div className="grocery-div">
              <ul>
                {this.state.groceryList.map((item) => {
                  return (
                    <GroceryList
                      key={item.id} 
                      item={item}
                      handleDeleteByID={this.handleDeleteByID}
                      handleDoneByID={this.handleDoneByID}
                      handleEditByID={this.handleEditByID}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        );
      }
}

export default Grocery
