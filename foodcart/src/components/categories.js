import { useState, useEffect } from "react";
import axios from 'axios';


export default function Categories(props) {
  const [data, updatedata]=useState([]);
  const fetchJSON=()=> {
    axios.get("https://calm-taiga-01489.herokuapp.com/food/get")
    .then((response)=>{
      const dataFromAPI= response.data.results;
      updatedata(dataFromAPI);
    })
    .catch(err=>console.error(`ERROR : ${err}`));
    // const dataFromAPI = list.data.results;
    // updatedata(dataFromAPI);
 
  }
  useEffect(() => {
    fetchJSON();
}, []);

  
  async function categories(item,index) {

    // props.updateSubCategory(item);
    await props.UpdateIndexOfSub(index);
    console.log("index of sub jaha chalna chhiye click wala",index );
    props.updateSubdata(data[index].subItemsData.subItems);
    
    console.log("updated or not",index)
  }
  function renderData() {

    return props.dataFromApi.map((items,i) => {
      console.log("index",i);
      return (
        <div key={items.name}  className="card m-3 p-2" style={{ width: '10rem', height: "10rem" }}
          
        >
          <img src={items.image} className="card-img-top" alt="categories" />
          <div className="card-body">
            <button href='/subcategories' className="card-title"
              onClick={() => categories(items,i)}
            ><a href='/subcategories'>{items.name}</a></button>

          </div>
          
        </div>

      )
    })
  }

  return (<div className="d-flex align-items-center justify-content-center m-3">{renderData()}</div>);

}