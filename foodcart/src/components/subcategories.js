import { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css'
function SubCategories(props) {
    
    //get cart Items
    const [data, updatedata]=useState([]);
    const fetchJSON=()=> {
      axios.get("https://calm-taiga-01489.herokuapp.com/food/get")
      .then((response)=>{
        const dataFromAPI= response.data.results;
        updatedata(dataFromAPI);
        console.log("Index is this whefgjkebjevb",props.indexOfSub);
        props.updateSubdata(data[props.indexOfSub].subItemsData.subItems);
      })
      .catch(err=>console.error(`ERROR : ${err}`));
      
   
    }
    useEffect(() => {
      fetchJSON();
  }, []);
    
    ////////////////////////////////////////////////////////////////////

    async function addTocart(item){
        const newPost={
            subItemName:item.name,
            image:item.image,
            price:item.price,
            description:item.description
        }
        try {
            const resp = await axios.post('http://localhost:3000/food/add', newPost);
            console.log(resp.data);
            props.updateCartLength(props.cartLength+1);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    console.log(props.subdata);
    function render() {
        return props.subdata.map((item) => {
            return (
                <div key={item.name} className="cart d-flex" >
                    <div className="img-sub d-flex justify-content-center align-items-center"><img src={item.image} className="card-img-top" alt="..." /></div>
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.description}</p>

                    </div>
                    <div className="button d-flex flex-column justify-content-center">
                        <button className="btn btn-success m-1" onClick={()=>addTocart(item)}>Add</button>
                       
                    </div>
                </div>

            )
        })
    }

    return (<div className="subcategories ">{render()}</div>)
}

export default SubCategories;