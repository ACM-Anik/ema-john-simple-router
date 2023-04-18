import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakeDB';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);


    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])


    useEffect(() => {
        const storedCart = getShoppingCart();
        // console.log(storedCart);
        // console.log(products);
        const savedCart = [];

        // Step 1: Get the ID of the added product--
        for (const id in storedCart) {

            // Step 2: Get the products state by using ID--
            const addedProduct = products.find(product => product.id === id);

            if (addedProduct) {
                // Step3: Get quantity of the product to add--
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;

                // Step 4: Add the added product to saved Cart--
                savedCart.push(addedProduct);
            }
            // console.log("addedProduct", addedProduct);
        }
        // Step-5: Set the cart--
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        // const newCart = [...cart, product];

        // quantity validation to ignore value 0:-
        let newCart = [];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }


        setCart(newCart);
        addToDb(product.id);
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <dir className="cart-info">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link className='proceed-link' to="/orders">
                            <button className='btn-proceed'>Review Order</button>
                        </Link>
                    </Cart>
                </dir>
            </div>
        </div>
    );
};

export default Shop;