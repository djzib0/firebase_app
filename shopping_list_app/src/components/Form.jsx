import React, { useState } from "react";

export default function Form() {
    const [formData, setFormData] = useState({
        cart: ""
    })

    return (
        <section>
            <div className="container form-container">
                <h1>Tutaj fotka kotka</h1>
                <input type="text" id="input-field" placeholder="Bread" />
                <button id="add-button">Add to cart</button>
            </div>
        </section>
    )
}