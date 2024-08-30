import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const Cart = ({ cookies, setCookie }) => {
  const cartItems = cookies["PMI-cart"] || [];
  
  const removeItem = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCookie("PMI-cart", JSON.stringify(updatedCart), { path: "/" });
  };


  return (
    <div className="fixed right-0 top-0 h-[92%] w-76 border shadow-2xl rounded-lg bg-white p-4 m-10 z-50">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div key={index} className="flex mt-8 items-center justify-between mb-4">
            <div className="flex items-center">
             
                <img
                  src={`${process.env.PUBLIC_URL}/images/Course-img-2.png`}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />             
          
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>Duration: {item.duration}</p>
              </div>
            </div>
            <button onClick={() => removeItem(index)} className="focus:outline-none">
              <DeleteIcon className="text-red-500" />
            </button>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
      {cartItems.length > 0 && (
        <div className="mt-8">
          <Link to="/payments">
            <button className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-500">
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
