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
                    <div className={classNameModule(" d-flex", {
                        "purchased": item.isPurchased === true
                    })}
                    key={item._id}
                    >
                        <div className="grocery-list-display">{item.groceryItem}</div>
                        <div className="grocery-actions ">
                            {
                                item.isPurchased === false ?
                                 (<button className="btn btn-purchase  mr-3 text-light" 
                                 onClick={()=>handlePurchaseUpdate(item)}>Purchase</button>)
                                 : null
                            }

                        </div>
                        <div><button className="btn btn-pink text-light"
                        onClick={()=>handleDelete(item)}
                        >X</button></div>
                    </div>
                )
            })
        )
    }

    return (
        <div className='grocery-container d-flex align-items-center flex-column '>
            <h1 className=' heading mb-5'>Grocery List</h1>
            <div className='w-100'>
                <AddGrocery
                    fetchGroceryItems={fetchGroceryItems}
                />
            </div>
            <div className='w-100 text-center'>{renderItems()}</div>

        </div>
    )

}
export default GrocerySection;