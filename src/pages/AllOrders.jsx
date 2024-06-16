import React, { useEffect, useState } from 'react'
import ordersApi from '../api/order/order';
import Order from '../components/Order';
import authApi from '../api/auth/auth';

const AllOrders = () => { 
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isAdmin, setIsAdmin] = useState(false);
  
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await ordersApi.getAllOrders();
          setOrders(response.data.orders); // Accessing orders from the response object
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      const fetchUserRole = async () => {
        try {
          const response = await authApi.currentUser();
          console.log("response is ",response)
          setIsAdmin(response.isAdmin);
          console.log("is admin is ", isAdmin)
        } catch (err) {
          console.error("Error fetching user role:", err);
        }
      };
  
      fetchOrders();
      fetchUserRole();
    }, []);

    const handleStatusChange = (orderId, status) => {
      setOrders(prevOrders => prevOrders.map(order =>
        order._id === orderId ? { ...order, status } : order
      ));
    };

    const handleDeleteOrder = (orderId) => {
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
    };
  
    if (loading) {
      return <p>Loading orders...</p>;
    }
  
    if (error) {
      return <p>Error loading orders: {error}</p>;
    }
  
    return (
      <div className="container mx-auto p-4">
      <div className="grid grid-cols-8 md:grid-cols-8 gap-1 bg-gray-100 p-4 font-bold border-b border-gray-200">
        <div>Customer Name</div>
        <div>Mobile</div>
        <div>Dish Name</div>
        <div>Price</div>
        <div>Status</div>
        {isAdmin && (
          <>
            <div>Complete</div>
            <div>Cancel</div>
            <div>Remove</div>
          </>
        )}
      </div>
      {orders.map((order) => (
        <Order key={order._id} order={order} isAdmin={isAdmin} onStatusChange={handleStatusChange} onDeleteOrder={handleDeleteOrder} />
      ))}
    </div>
    );
}

export default AllOrders