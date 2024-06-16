import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ordersApi from "../api/order/order";
import dishApi from "../api/dish/dish";

const SingleDish = () => {
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { dishId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await dishApi.getOneDish(dishId);
        console.log("dish response is ", response.data);
        setDish(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDish();
  }, [dishId]);

  if (loading) {
    return <p>Loading dish details...</p>;
  }

  if (error) {
    return <p>Error loading dish details: {error}</p>;
  }

  if (!dish) {
    return <p>No dish found.</p>;
  }

  const myOrder = async () => {
    try {
      const res = await ordersApi.placeOrder(dishId);
      console.log(res);
      // setOrderSuccess(true);
      // setTimeout(() => {
        // setOrderSuccess(false);
        navigate("/allOrders");
      // }, 2000);
    } catch (error) {
      console.error("Failed to place order:", error.message);
    }
  };

  return (
    <>
      <div className=" w-screen h-screen flex flex-col items-center lg:flex-wrap">
        <div id="image" className="bg-gray-50 shadow-xl w-[80vw] mx-auto mb-3 lg:w-[40vw]">
          <img
            src={dish.dishImage}
            alt=""
            className="w-[100%] h-[500px] object-contain mt-3"
          />
        </div>

        <div id="title" className="text-center mb-4">
          <h1 className="text-5xl font-bold mb-3">{dish.title}</h1>
          <h2 className="text-3xl font-semibold">&#8377; {dish.price}</h2>
        </div>

        <div id="orderBtn" className="text-center mb-3">
          <button
            onClick={myOrder}
            className="bg-blue-500 mb-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Place Order
          </button>
          <p>We have (Cash On Delivery)</p>
        </div>

        <div id="makeAtHome" className="mt-5 border p-5 w-[80vw] lg:w-[40vw]">
          <h1 className="text-orange-500 text-2xl">If you want to make it at home</h1>
          <div id="ingredients" className="text-left my-4">
            <h1 className="text-xl font-bold text-center mb-2">Ingredients</h1>
          <ul className="list-disc list-inside pl-4 text-green-500 text-xl font-semibold">
          {dish.ingredients.map((ingredient, index) => (
                <p key={index}>{ingredient}</p>
              ))}
        </ul>
          </div>
          <div id="recipe" className="text-left">
          <h1 className="text-xl font-semibold text-center mb-2">Recipe</h1>
          <div>
        <ol className="list-decimal list-inside pl-4 text-green-500 font-semibold text-xl">
          <p>{dish.recipe}</p>
        </ol>
      </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleDish;
