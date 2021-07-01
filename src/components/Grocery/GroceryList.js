import React, { Component } from "react";
import "./GroceryList.css";


export class GroceryList extends Component {
  state = {
    canEdit: false,
    editInput: this.props.item.grocery,
  };

  onHandleEditClick = () => {
    this.setState((prevState) => {  
      return {
        canEdit: !prevState.canEdit,
      };
    });
  };

  handleEditOnChange = (event) => {
    this.setState({
      editInput: event.target.value,
    });
  };

  onHandleEditSubmit = (id) => {
    this.onHandleEditClick();
    this.props.handleEditByID(id, this.state.editInput);
  };

  render() {
    const { grocery, id, isDone } = this.props.item;
    const { handleDeleteByID, handleDoneByID } = this.props; 
    const { canEdit, editInput } = this.state; 

    return (
      <div className="grocerylist-div">
        {canEdit ? (
          <input
            type="text"
            value={editInput}
            onChange={this.handleEditOnChange}
            name="editInput"
          />
        ) : (
          <li className={`li-style ${isDone && "li-style-isDone"}`}>{grocery}</li>
        )}
        {canEdit ? (
          <button onClick={() => this.onHandleEditSubmit(id)} id="edit-button">
            Submit
          </button>
        ) : (
          <button onClick={this.onHandleEditClick} id="edit-button">
            Edit
          </button>
        )}
        <button onClick={() => handleDoneByID(id)} id="done-button">
          DONE
        </button>
        <button onClick={() => handleDeleteByID(id)} id="delete-button">
          DELETE
        </button>
      </div>
    );
  }
}

export default GroceryList;