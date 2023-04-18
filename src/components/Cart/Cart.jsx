import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faShoppingCart, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Cart.css';

const Cart = ({cart, handleClearCart, children}) => {
    // const cart = props.cart; //option1
    // const {cart} = props; //option2

    // console.log(cart);

    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for(const product of cart){
        // Jehetu quantity er default value 0, tai ekta condition use korte hobe(0 theke 1 korar jonno):
        // Option 1:--
        // if(product.quantity === 0){
        //     product.quantity = 1;
        // }
        // or,
        // product.quantity = product.quantity || 1;
        
        // Option 2:--
        // --> 2nd ti shop.jsx e handleAddToCart function e .

        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = product.shipping;
        quantity = quantity + product.quantity;
    }
    const tax = totalPrice * 7 / 100;

    const grandTotal = totalPrice + totalShipping + tax;


    return (
        <div>
            <h4>Order Summery</h4>
            <h5>Selected Items: {quantity}</h5>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping: ${totalShipping}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <h6>Grand Price: {grandTotal.toFixed(2)}</h6>
            <button onClick={handleClearCart} className='btn-clear-cart'>
                <span>Clear Cart</span>
                <FontAwesomeIcon icon={faTrashAlt}/>
            </button>
            {children}
        </div>
    );
};

export default Cart;