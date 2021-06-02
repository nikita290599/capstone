import {useState} from 'react';
import axios from 'axios'
function AddGrocery({fetchGroceryItems}) {
    const [groceryInputText, updateGroceryInput ]=useState("");
    console.log(groceryInputText);
    async function handleAddingItems(){
      const createTask = await axios.post("http://localhost:8080/grocery/add",
      {
        "groceryItem":groceryInputText,
        "isPurchased":false
    });
    updateGroceryInput("");
    fetchGroceryItems();
    }
    return (

        
      <div className="input-group mb-3 w-100">
        <input
          type="text"
          className="form-control "
          placeholder="Grocery Item"
          aria-label="Grocery Item"
          value={groceryInputText}
          onChange={(e) => updateGroceryInput(e.target.value)}
        />
        <button
          className="input-group-text btn btn-warning text-light"
          id="basic-addon2"
          onClick={() => handleAddingItems()}
        >
          Add Grocery Item
        </button>
      </div>
    

    );

}
export default AddGrocery;