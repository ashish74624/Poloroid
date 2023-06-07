import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { useNavigate } from "react-router";


const Form = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const formDataJson = Object.fromEntries(formData.entries());
  
    console.log(formDataJson);
    if (pageType === "register") {
      try {
        const response = await fetch("http://localhost:3001/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formDataJson),
        });
        const loggedIn = await response.json();
        if (loggedIn) {
            dispatch(
              setLogin({
                user: loggedIn.user,
                token: loggedIn.token,
              })
            );
        }
        if (response.ok) {
          // Registration successful, perform any necessary actions
          setPageType("login");
          // navigate("/login");
        } else {
          // Registration failed, handle the error
          const errorData = await response.json();
          console.log("Registration error:", errorData);
        }
      } catch (error) {
        // Error occurred during registration
        console.error("Registration error:", error);
      }
    }
  
    if (pageType === "login") {
      try {
        const response = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formDataJson),
        });
        if (response.ok) {
        //   Login successful, perform any necessary actions
          dispatch(
            setLogin({
              user: formDataJson.user,
              token: formDataJson.token
            })
          );
          navigate("/home");
        } else {
          // Login failed, handle the error
          const errorData = await response.json();
          console.log("Login error:", errorData);
        }
      } catch (error) {
        // Error occurred during login
        console.error("Login error:", error);
      }
    }
  };
  

  return (
    <>
    <h2 className="font-custom text-4xl text-green-800 flex w-screen justify-center pt-2 pb-8">
        Welcome to Stay, where connections thrive and memories come alive.
    </h2>
    <div className=" shadow-2xl min-w-md w-[37vw] mx-auto border border-slate-300 bg-slate-100 rounded-xl py-8 px-16">
      <form onSubmit={handleFormSubmit}>
        {pageType === "register" && (
          <>
            <div className="mb-4">
              <label htmlFor="firstName" className="block mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block mb-1">
                Location
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="occupation" className="block mb-1">
                Occupation
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            {/* Render other register fields */}
          </>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="name@email.com"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md"
          >
            {pageType === "login" ? "Log In" : "Register"}
          </button>
          <button
            type="button"
            onClick={() =>
              setPageType(pageType === "login" ? "register" : "login")
            }
            className="text-green-500 hover:text-green-600 font-semibold"
          >
            {pageType === "login" ? "Register" : "Log In"}
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Form;
