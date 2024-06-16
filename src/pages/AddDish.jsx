import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import dishApi from '../api/dish/dish';
import Loader from '../components/Loader';

const AddDish = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [showSuccessNotification, setShowSuccessNotification] = useState(false);

    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('price', data.price);
            formData.append('recipe', data.recipe);
            formData.append('ingredients', JSON.stringify(data.ingredients));
            formData.append('dishImage', data.dishImage[0]);

            setLoader(true);
      
            const response = await dishApi.addDish(formData)

            setLoader(false);
      
            console.log('Dish added:', response.data);
            // Optionally redirect or show a success message
            setShowSuccessNotification(true);
            // navigate("/")
            setTimeout(() => {
                navigate("/");
              }, 1000);
          } catch (error) {
            console.error('Error adding dish:', error.message);
            // Handle error (show error message, etc.)
          } 
          
    }
  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" {...register('title', { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          {errors.title && <span className="text-red-500">Title is required</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" id="price" {...register('price', { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          {errors.price && <span className="text-red-500">Price is required</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="recipe" className="block text-sm font-medium text-gray-700">Recipe</label>
          <textarea id="recipe" {...register('recipe', { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md w-full h-40"></textarea>
          {errors.recipe && <span className="text-red-500">Recipe is required</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients</label>
          <textarea id="ingredients" {...register('ingredients', { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md w-full h-20"></textarea>
          {errors.ingredients && <span className="text-red-500">Ingredients are required</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="dishImage" className="block text-sm font-medium text-gray-700">Dish Image</label>
          <input type="file" id="dishImage" {...register('dishImage', { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          {errors.dishImage && <span className="text-red-500">Dish image is required</span>}
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Dish
        </button>
      </form>

      {loader && <Loader />}

      {showSuccessNotification && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-xl font-semibold text-green-500">Dish added successfully!</p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowSuccessNotification(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddDish