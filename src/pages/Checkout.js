import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Checkout() {
  const [shippingAddress, setShippingAddress] = useState({});
  const { cart, total } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const initializeRazorpay = async () => {
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: total }),
    });
    const order = await response.json();

    const options = {
      key: "your-razorpay-key-id",
      amount: order.amount,
      currency: "INR",
      name: "Supplements Store",
      description: "Purchase Description",
      order_id: order.id,
      handler: async (response) => {
        const orderData = {
          userId: user._id,
          products: cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          shippingAddress,
          totalAmount: total,
          paymentId: response.razorpay_payment_id,
        };

        await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return <div>{/* Shipping form and payment button */}</div>;
}
