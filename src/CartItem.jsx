import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total cost for a single item
  const cleanCost = (costStr) => {  
    // Remove non-digit characters except for '.' and parse to float  
    const cleanedStr = costStr.replace(/[^0-9.-]+/g, '');  
    return parseFloat(cleanedStr);  
  };  
  const calculateTotalCost = (item) => {  
    const cost = cleanCost(item.cost);  
    if (isNaN(cost)) {  
      console.error(`Invalid cost for item ${item.name}: ${item.cost}`);  
      return 0;   
    }  
    return cost * (item.quantity || 1);  
  };  

  const calculateTotalAmount = () => {  
    return cart.reduce((total, item) => total + calculateTotalCost(item), 0).toFixed(2);  
  };  

  // Handle incrementing the quantity of an item
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, amount: item.quantity + 1 }));
  };

  // Handle decrementing the quantity of an item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, amount: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  // Handle removing an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // Handle the checkout process
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <>
          <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
          <div>
            {cart.map(item => (
              <div className="cart-item" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">Cost per Item: {item.cost}</div>
                  <div className="cart-item-quantity">
                    <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <div className="cart-item-total">Total for this item: ${calculateTotalCost(item).toFixed(2)}</div>
                  <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <div className="continue_shopping_btn">
            <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
            <br />
            <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
