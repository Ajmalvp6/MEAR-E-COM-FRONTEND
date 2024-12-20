import React, { useContext, useState } from "react";
import "./css/LoginSignup.css";
import { loginApi, registerApi } from "../services/allApi";
import { Navigate, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const LoginSignup = () => {
  const [login, setlogin] = useState(true);

  const {getCartProduct} = useContext(ShopContext)

  

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  // loginApi

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!formData.email || !formData.password){
      alert('please fill all fields')
      return
    }

    const result = await loginApi(JSON.stringify(formData));

    
    

    

    if (result?.status === 200) {
      localStorage.setItem("token", result.data.token);
      getCartProduct()
      navigate('/')
      alert("login success");
    } else {
      alert(result.response.data.message);
    }
  };

  // registerApi

  const handleRegister = async (e) => {
    e.preventDefault();

    if(!formData.name || !formData.email || !formData.password){
      alert('please fill all fields')
      return
    }

    const bodyData = JSON.stringify(formData)

    const result = await registerApi(bodyData)

    console.log(result);
    

    if(result.status===201){
      alert('register successfully')
      setFormData({
        name:"",
        email:"",
        password:""
      })
      return
    }

    else{
      alert(`${result.response.data.message}`)
    }

    
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{login ? "Login" : "Sign Up"}</h1>
        <div className="loginsignup-fields">
          {login ? (
            <></>
          ) : (
            <input
              onChange={handleChange}
              name="name"
              value={formData.name}
              type="text"
              placeholder="Your Name"
            />
          )}
          <input
            onChange={handleChange}
            name="email"
            type="email"
            value={formData.email}
            placeholder="Email Address"
          />
          <input
            onChange={handleChange}
            name="password"
            value={formData.password}
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          onClick={login ? (e) => handleLogin(e) : (e) => handleRegister(e)}
        >
          Continue
        </button>
        {login ? (
          <p
            onClick={() => setlogin(false)}
            style={{ cursor: "pointer" }}
            className="loginsignup-login"
          >
            Create an account? <span>Click here</span>
          </p>
        ) : (
          <p
            onClick={() => setlogin(true)}
            style={{ cursor: "pointer" }}
            className="loginsignup-login"
          >
            Already have an account? <span>Login here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
