import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/auth/auth';
import {login as authLogin} from "../store/authSlice"
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';

const SignIn = () => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");

    const [loader, setLoader] = useState(false);

    const login = async (data) => {
        console.log("login data", data);
        setError("");
        try {
          setLoader(true);
          const session = await authApi.login(data);
          setLoader(false);
          console.log("session is", session)
          if (session) {
            console.log("Its here")
            const userData = await authApi.currentUser();
            console.log("userdata is ", userData);
            if (userData) {
              dispatch(authLogin({ userData }));
            }
            navigate("/");
          }
        } catch (error) {
          setLoader(false)
          console.log("error is in signIn", error);
          setError(error.message);
        }
      };

  return (
    <div>
        <div className=" h-[80vh] flex justify-center">
      <div className="border shadow-2xl w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[35vw] bg-white h-[60vh] mt-20 p-4 rounded-lg">
        <h1 className="text-center text-2xl font-semibold p-3 underline">
          Login In form here
        </h1>

        {error && <p>{error}</p>}

        {loader && <Loader/>}

        <form onSubmit={handleSubmit(login)}>
          <Input
            className="mb-2"
            label="Email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
            placeholder="Enter email here"
          />

          <Input
            className="mb-2"
            label="Password"
            type="password"
            placeholder="enter password"
            {...register("password", {
              required: true,
            })}
          />

          <Button
            type="submit"
            className="rounded-lg w-full bg-gray-500 text-white p-2 mt-4 mb-2"
          >
            Sign In
          </Button>
          <div className="">
            <p className="text-center text-sm font-semibold text-gray-500">
              Don't have an account?
              <Link className="text-red-500" to={"/signup"}>
                {" "}
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default SignIn