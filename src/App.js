import React, { useEffect, useState } from 'react';
import DetailedShop from './components/DetailedShop'
import {BrowserRouter, Route} from 'react-router-dom'
import Shops from './components/Shops'
import './App.css';
import NavigationBar from './components/NavigationBar';
import Login from './components/LogIn';
import Register from './components/Register';
import Admin from './components/Admin';
import AddShop from './components/AddShop';
import EditShop from './components/EditShop';


function App() {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [user, setUser] = useState(null);
  let token = localStorage.getItem('token');
  const getShops = async function(){
    const res = await fetch('http://localhost:3001/shop');
    const data = await res.json();
    setShops(data)
    setFilteredShops(data)
  }
  const addShop = async function(shop){
    const formData = new FormData();
    console.log(shop.image)
    formData.append('name',shop.name);
    formData.append('description',shop.description);
    formData.append('shipping_location', shop.shipping_location)
    formData.append('image',shop.image)
    formData.append('type',shop.type)
    const res = await fetch('http://localhost:3001/shop',{
      method:'POST',
      headers:{'Authorization':'Bearer '+token,
   },
      body:formData
    });
    if(res.status==201){
      const data = await res.json();
      setShops([data,...shops]);
      alert("Shop was successfully created")
    }
  }

  const updateShop = async function(shop,shop_id){
    const formData = new FormData();
    formData.append('name',shop.name);
    formData.append('description',shop.description);
    formData.append('shipping_location', shop.shipping_location)
    formData.append('image',shop.image)
    formData.append('type',shop.type)
    console.log(shop.type)
    const res = await fetch('http://localhost:3001/shop/'+shop_id,{
      method:'PUT',
      headers:{'Authorization':'Bearer '+token},
      body:formData
    });
    if(res.status==200){
      const data = await res.json()
      for(var i=0;i<shops.length;i++){
        if(shops[i].id == shop_id){
          shops[i] = data;
        }
      }
      setShops(shops)
      alert("Shop was successfully updated")
    }
  }

  const deleteShop = async function(shop_id){
    const res = await fetch('http://localhost:3001/shop/'+shop_id,{
      method:'DELETE',
      headers:{'Authorization':'Bearer '+token,
    'Content-Type':'application/json'},
    })
    if(res.status==200){
      for(var i=0;i<shops.length;i++){
        if(shops[i].id == shop_id){
          shops.splice(i,1)
        }
      }
      setShops(shops);
      alert("Shop was successfully deleted")
    }
   

  }
  const addRating = async function(rating,shop_id){
    const body={
      "rating":rating.rating,
      "comment":rating.comment
    }
    const res = await fetch('http://localhost:3001/shop/'+shop_id+'/rate',{
      method:'POST',
      headers:{'Authorization':'Bearer '+token,
    'Content-Type':'application/json'},
      body:JSON.stringify(body)
    });
    if(res.status==201){
      const data = await res.json();
      shops.map(shop => {
        if(shop.id == shop_id){
          data.user = user;
          shop.ratings.unshift(data)
        }
      })
      setShops(shops);
      alert("New comment was added")

    }
  }

  const search = async function(query){
    if(query){
      setFilteredShops(shops.filter(shop => shop.name.includes(query)));
    }
  }
  const filter = async function(type){
    if(type){
      setFilteredShops(shops.filter(shop => shop.type.key==type))
    }
  }
  const showAll = async function(){
    setFilteredShops(shops);
  }

  const getUser = async function(){
    
    if(token){
      const res = await fetch('http://localhost:3001/user/me',{
        method:'GET',
        headers:{'Authorization':'Bearer '+token,
      'Content-Type':'application/json'}
      })
      const result = await res.json();
      if(res.status==200){
        setUser(result)

      }
      else{
        token=undefined;
        localStorage.setItem('token',undefined)
      }
      //getUser
    }
    else{

    }
  }
  useEffect(function() {
    getUser();
    getShops();

  },[])

  
  return <div className="app"><BrowserRouter>
    <NavigationBar user={user}/>

    <Route path='/' exact>
      <Shops shops={filteredShops} search={search} showAll={showAll} filter={filter}/>
    </Route>
    <Route path="/edit" exact>
      <EditShop onDelete={deleteShop} onEdit={updateShop}></EditShop>
    </Route>
    <Route path='/shop/:id'>
      <DetailedShop addRating={addRating} user={user}></DetailedShop>
    </Route>
    <Route path="/login" exact>
      <Login></Login>
    </Route>
    <Route path="/register" exact>
      <Register></Register>
    </Route>
    <Route path="/admin" exact>
      <Admin token={token}/>
    </Route>
    <Route path="/add-shop" exact>
      <AddShop onAdd={addShop}/>
    </Route>
    
  
  </BrowserRouter></div>
  
  
  
}
export default App;
