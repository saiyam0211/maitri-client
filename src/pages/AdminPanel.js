import React, { useState, useEffect } from "react";

function AdminPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await fetch("/api/admin/orders");
    const data = await response.json();
    setOrders(data);
  };

  const updateOrderStatus = async (orderId, status) => {
    await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  return <div>{/* Order management interface */}</div>;
}
