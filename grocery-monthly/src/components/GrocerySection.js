import AddGrocery from './AddGrocery'
import { useState, useEffect } from 'react';
import axios from 'axios';
import classNameModule from 'classnames'
import '../App.css'

function GrocerySection() {

    const [groceryItems, updateGroceryItems] = useState([]);
    async function fetchGroceryItems() {
        const list = await axios.get("http://localhost:8080/grocery/get");
        const dataFromAPI = list.data.result;
        updateGroceryItems(dataFromAPI);
    }
    async function handlePurchaseUpdate(item){
        const updateData= await axios.put('http://localhost:8080/grocery/update',
        {
            "_id":item._id
        },
        {
            "isPurchased":true
        }
        )
        
        fetchGroceryItems();

    };
    async function handleDelete(item){
        const deleteData = await axios.delete("http://localhost:8080/grocery/delete",{
           data: {"_id":item._id}
        });
        fetchGroceryItems();

    }
        
    useEffect(() => {
        fetchGroceryItems();
    }, []);
    function renderItems() {
        return (
            groceryItems.map((item) => {
                return (
                    <div className={classNameModule("list-grocery d-flex", {
                        "purchased": item.isPurchased === true
                    })}
                    key={item._id}
                    >
                        <div>{item.groceryItem}</div>
                        <div className="grocery-actions ">
                            {
                                item.isPurchased === false ?
                                 (<button className="btn btn-warning mr-3 text-light" 
                                 onClick={()=>handlePurchaseUpdate(item)}>Purchase</button>)
                                 : null
                            }

                        </div>
                        <div><button className="btn btn-danger"
                        onClick={()=>handleDelete(item)}
                        >X</button></div>
                    </div>
                )
            })
        )
    }

    return (
        <div className='d-flex justify-content-center align-items-center flex-column  w-100'>
            <h2 className='mb-5 text-warning'>Grocery List</h2>
            <div className='w-50'>
                <AddGrocery
                    fetchGroceryItems={fetchGroceryItems}
                />
            </div>
            <div className='w-100 text-center'>{renderItems()}</div>

        </div>
    )

}
export default GrocerySection;