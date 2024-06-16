import React, { useEffect, useState } from 'react'
import dishApi from '../api/dish/dish.js';
import Dish from "../components/Dish.jsx"
import ordersApi from "../api/order/order.js"

const Home = () => {

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await dishApi.getAllDishes();

        const orders = await ordersApi.getAllOrders();
        console.log("orders are ", orders.data.orders)

        setDishes(response.data);
      } catch (error) {
        setError("Error while fetching details")
      } finally {
        setLoading(false)
      }
    }

    fetchDishes();
  }, [])

  if(loading) return <p>Loading...</p>
  if(error) return <p>{error}</p>

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">All Dishes</h1>
      <div className="flex flex-wrap justify-center">
        {dishes.map((dish) => (
          <Dish key={dish._id} dish={dish} />
        ))}
      </div>
    </div>
  )
}

export default Home