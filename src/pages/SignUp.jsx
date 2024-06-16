import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/auth/auth";
import { login } from "../store/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader"

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const [loader, setLoader] = useState(false);

//   const dispatch = useDispatch();

  const navigate = useNavigate();

  const signUp = async (data) => {
    console.log("data is ", data);
    setError("");
    try {
      setLoader(true);
      const user = await authApi.register(data);
      setLoader(false);
      if (user) {
        // await authApi.login()
        // const userData = await authApi.currentUser();
        // if (userData) {
        //   dispatch(login({ userData }));
          navigate("/login");
        // }
      }
    } catch (error) {
      setLoader(false)
      console.log("signUp error ", error);
      setError(error.message);
    }
  };

  return (
    <div className=" h-[80vh] flex justify-center">
      <div className="border shadow-2xl w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[35vw] bg-white h-[62vh] mt-20 p-4 pl-5 rounded-lg">
        <h1 className="text-center text-2xl font-semibold p-3 underline">
          Sign Up Form here
        </h1>

        {error && <p>{error}</p>}

        {loader && <Loader />}

        <form onSubmit={handleSubmit(signUp)}>
          {/* <Input
            className="mb-2"
            label="userName"
            placeholder="Enter your name"
            type="text"
            {...register("username", { required: true })}
          /> */}

          <Input
            className="mb-2"
            label="full Name"
            placeholder="Enter your name"
            type="text"
            {...register("fullName", { required: true })}
          />

          <Input
            className="mb-2"
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          <Input
            className="mb-2"
            label="password"
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />

          <Input
            className="mb-2"
            label="Mobile Number"
            placeholder="Enter your mobile number"
            type="tel"
            {...register("mobile", {
              required: true,
            })}
          />

          <Button
            type="submit"
            className="text-white w-full mt-4 mb-2 p-2 bg-gray-500 rounded-lg"
          >
            SignUp
          </Button>
          <div className="">
            <p className="text-center text-sm font-semibold text-gray-500">
              Already have an account?
              <Link className="text-red-500" to={"/login"}>
                {" "}
                SignIn
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
