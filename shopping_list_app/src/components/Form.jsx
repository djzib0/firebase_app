import React, { useEffect, useState } from "react";
import './form.css'
import { nanoid } from "nanoid"


import CAT from '../assets/catincart.png'

//firebase imports
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove} from "firebase/database"


export default function Form() {
    const [formData, setFormData] = useState(
        {cart: ""}
    )

    const [cartItemArray, setCartItemsArray] = useState([])

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCyId9D2ZgN8QXzA68k3MEV02m50Jivqsk",
        authDomain: "realtime-database-903af.firebaseapp.com",
        databaseURL: "https://realtime-database-903af-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "realtime-database-903af",
        storageBucket: "realtime-database-903af.appspot.com",
        messagingSenderId: "658938276512",
        appId: "1:658938276512:web:dffdffac3d18ad1f8e37c5"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app)
    const cartItemsInDB = ref(database, "cartItems")

    useEffect(() => {
        onValue(cartItemsInDB, function(snapshot) {
            if (snapshot.exists()) {
                let itemsArray = (snapshot.val() != null) && Object.entries(snapshot.val()).map(item => {
                return (
                    <li key={item[0]} onDoubleClick={() => handleDoubleClick(item[0])}>{item[1]}</li>
                )
            })
            setCartItemsArray(itemsArray)
            } else {
                setCartItemsArray([])
            }
            
        })
    }, [])

    function handleChange(e) {
        const {name, value} = e.target
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    [name]: value,
                }
            })
    }


    function handleClick(e) {
        // push input value to database
        push(cartItemsInDB, formData.cart)
        // reset form
        setFormData({
            cart: ""
        })
        fetchDataFromDB()
    }

    function handleDoubleClick(id) {
        let itemToDelete = ref(database, `cartItems/${id}`)
        remove(itemToDelete)
    }

    function fetchDataFromDB() {
        onValue(cartItemsInDB, function(snapshot) {
            if (snapshot.exists()) {
                let itemsArray = Object.entries(snapshot.val()) && Object.entries(snapshot.val()).map(item => {
                    return (
                        <li key={item[0]} onDoubleClick={() => handleDoubleClick(item[0])}>{item[1]}</li>
                    )
                })
                setCartItemsArray(itemsArray)
            } else {
                setCartItemsArray([])
            }
        })
    }


    return (
        <section>
            <div className="container form-container">
                <img src={CAT} className="main-img" />
                <input type="text" 
                       name="cart" 
                       id="input-field" 
                       placeholder="Bread"
                       onChange={handleChange}
                       value={formData.cart}
                    />
                <button id="add-button" onClick={handleClick}>Add to cart</button>
            </div>
            <div className="container">
                <ul id="shopping-list">
                    {cartItemArray.length > 0 ? cartItemArray : <p>No items here... yet</p>}
                </ul>
            </div>
        </section>
    )
}