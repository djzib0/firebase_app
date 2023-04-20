import React, { useState } from "react";

export default function Form() {
    const [formData, setFormData] = useState(
        {cart: ""}
    )

    function handleChange(e) {
        const {name, value} = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    console.log("newFormData", formData)

    return (
        <section>
            <div className="container form-container">
                <h1>Tutaj fotka kotka</h1>
                <input type="text" 
                       name="cart" 
                       id="input-field" 
                       placeholder="Bread"
                       onChange={handleChange}
                       value={formData.cart}
                    />
                <button id="add-button">Add to cart</button>
            </div>
        </section>
    )
}