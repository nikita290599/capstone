import { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css'
// import { Promise } from "mongoose";
export default function Cart(props) {
    useEffect(() => {
        fetchCartItems();

    }, []);

    const [cart, updateCart] = useState([]);
    //get cart items
    async function fetchCartItems() {
        const list = await axios.get("http://localhost:3000/food/get");
        const dataFromAPI = list.data.result;
        updateCart(dataFromAPI);
        props.updateCartLength(dataFromAPI.length);


    }

    //remove cart items
    async function removeCartItems(id){
        const deleteData = await axios.delete("http://localhost:3000/food/delete",{
           data: {"_id":id}
        });
        fetchCartItems();
        props.updateCartLength(props.cartLength-1);

    }
    //remove all cart items
    async function removeAllItems(){
        const deleteData = await axios.delete("http://localhost:3000/food/deleteAll",{
           data: {}
        });
        fetchCartItems();
        props.updateCartLength(0);

    }
    
    function renderCart() {

        return (
            cart.map(function (item) {
                return (
                    <div key={item._id} className="cart d-flex" >
                        <div className="img-sub d-flex justify-content-center align-items-center"><img src={item.image} className="card-img-top" alt="..." /></div>
                        <div className="card-body w-40">
                            <h5 className="card-title">{item.subItemName}</h5>
                            <p className="card-text">{item.description}</p>


                        </div>
                        <div className="button d-flex flex-column justify-content-center">
                            <button className="btn btn-danger m-3 w-4" onClick={()=>removeCartItems(item._id)}>Remove</button>

                        </div>
                    </div>
                )

            })
        )
    }
    return (
    <div className="subcategories ">{renderCart()}
    <div className="d-flex w-30 justify-content-center "><a class='btn btn-primary w-25' href="/" ><button class='btn btn-primary' onClick={()=>removeAllItems()}>Checkout</button></a></div>
    </div>
    );
}