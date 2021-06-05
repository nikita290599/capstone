import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./components/header";
import Categories from "./components/categories";
import SubCategories from "./components/subcategories";
import Cart from "./components/cart";
import { useState, useEffect } from "react";
import axios from 'axios'

export default function App() {
  const [data, updatedata] = useState([]);
  const [indexOfSub, UpdateIndexOfSub] = useState(1);
  const [subdata, updateSubdata] = useState([]);
  const [cartLength,updateCartLength]=useState(0);
  const fetchJSON = () => {
    axios.get("https://calm-taiga-01489.herokuapp.com/food/get")
      .then((response) => {
        const dataFromAPI = response.data.results;
        updatedata(dataFromAPI);
        updateSubdata(dataFromAPI[indexOfSub].subItemsData.subItems);
      })
      .catch(err => console.error(`ERROR : ${err}`));


  }
  useEffect(() => {
    fetchJSON();
  }, []);
  return (
    <Router>
      <Header cartLength={cartLength} />
      <Switch>
      <Route path="/subcategories"
          component={() => <SubCategories
            indexOfSub={indexOfSub}
            updateSubdata={updateSubdata}
            subdata={subdata}
            updateCartLength={updateCartLength}
            cartLength={cartLength}
            dataFromApi={indexOfSub}
            data={data} />}
        />
        <Route path="/cart"
          component={() => <Cart 
            updateCartLength={updateCartLength}
            cartLength={cartLength}
          />}
        />
        <Route
          path="/"
          component={() => <Categories
            updateSubdata={updateSubdata}
            dataFromApi={data}
            UpdateIndexOfSub={UpdateIndexOfSub} />}
        />

        
      </Switch>
    </Router>

  );
}