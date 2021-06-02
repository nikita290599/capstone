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

        
      <div className="mb-3 w-100 d-flex">
        <input
          type="text"
          className=""
          placeholder="Grocery Item"
          aria-label="Grocery Item"
          value={groceryInputText}
          onChange={(e) => updateGroceryInput(e.target.value)}
        />
        <button
          className=""
          id="basic-addon2"
          onClick={() => handleAddingItems()}
        >
          Add Item
        </button>
      </div>
    

    );

}
export default AddGrocery;