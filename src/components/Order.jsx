import React from 'react'
import { useSelector } from 'react-redux';
import ordersApi from '../api/order/order';

const Order = ({order, isAdmin, onStatusChange, onDeleteOrder}) => {

  console.log("order is ", order)

  const handleStatusChange = async (status) => {
    try {
      await ordersApi.updateOrderStatus(order._id, status);
      // order.status = status;
      onStatusChange(order._id, status);
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const deleteMyOrder = async () => {
    try {
      await ordersApi.deleteOrder(order._id);
      onDeleteOrder(order._id)
    } catch (error) {
      console.log("Could not deltete order")
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 font-bold';
      case 'cancelled':
        return 'text-red-500 font-bold';
      default:
        return 'text-gray-700 font-bold'; // Default status color
    }
  };


  return (
    <div className="grid grid-cols-8 md:grid-cols-8 gap-4 p-4 border-b border-gray-200">
      <div>{order.customer.fullName}</div>
      <div>{order.customer.mobile}</div>
      <div>{order.dish.title}</div>
      <div>${order.dish.price}</div>
      <div className={getStatusClass(order.status)}>{order.status}</div>
      {isAdmin && (
        <>
          <button 
            onClick={() => handleStatusChange('completed')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Completed
          </button>
          <button 
            onClick={() => handleStatusChange('cancelled')}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancelled
          </button>
          <button 
            onClick={deleteMyOrder}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            X
          </button>
        </>
      )}
    </div>
  )
}

export default Order