import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // function to add to cart
    const addToCart = (product, id) => {
        const newItem = {...product, amount: 1};
        //  function to  check if item is already in cart
        const cartItem = cart.find(item => {
            return item.id === id;
        });
        // If item already exists in cart, increase it's amount by 1 else set it's amount to 1
        if (cartItem) {
            const newCart  = [...cart].map(item => {
                if (item.id === id) {
                    return {...item, amount: cartItem.amount + 1 };
                } else {
                    return item;
                }
            });
            setCart(newCart);
        } else {
            setCart([...cart, newItem]);
        }
 };

    // Function to remove an item from cart
    const removeFromCart = (id) => {
        const newCart = cart.filter(item => {
            return item.id !== id;
        });
        setCart(newCart);
    }
    console.log(cart);
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;