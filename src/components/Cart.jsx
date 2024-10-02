import React, { useReducer } from "react";

const initialState = {
  cart: [
    { id: 1, name: "Samsung Galaxy S8", price: 399.99, quantity: 1 },
    { id: 2, name: "Google Pixel", price: 499.99, quantity: 1 },
    { id: 3, name: "Xiaomi Redmi Note 2", price: 699.99, quantity: 1 },
    { id: 4, name: "Samsung Galaxy S7", price: 599.99, quantity: 1 },
  ],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "CLEAR":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
}

function Cart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const getTotalItems = () =>
    state.cart.reduce((acc, item) => acc + item.quantity, 0);

  const getTotalPrice = () =>
    state.cart
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="flex justify-between items-center bg-purple-700 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <div className="relative">
          <i className="fas fa-shopping-cart text-3xl"></i>
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {getTotalItems()}
            </span>
          )}
        </div>
      </header>

      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        {state.cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <>
            {state.cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-6"
              >
                <div className="text-lg font-semibold">
                  <h3>{item.name}</h3>
                  <p className="text-gray-500">${item.price}</p>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() =>
                      dispatch({ type: "REMOVE", payload: item.id })
                    }
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600"
                    onClick={() =>
                      dispatch({ type: "INCREMENT", payload: item.id })
                    }
                  >
                    +
                  </button>
                  <span className="mx-4 text-xl">{item.quantity}</span>
                  <button
                    className={`${
                      item.quantity <= 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-purple-500 hover:bg-purple-600 text-white"
                    } px-3 py-1 rounded-md`}
                    onClick={() =>
                      dispatch({ type: "DECREMENT", payload: item.id })
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="flex justify-between items-center mt-6 p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Total: ${getTotalPrice()}</h2>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          onClick={() => dispatch({ type: "CLEAR" })}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
