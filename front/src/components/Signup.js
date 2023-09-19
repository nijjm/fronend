import React from 'react'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Signup(props) {

  const [creds, setcreds] = useState({
    name:"",
    email:"",
    password:"",
    cpassword:""
})

let history = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {name,email,password, cpassword}= creds;
      const response = await fetch("https://backend-notes-mu.vercel.app/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, cpassword }),
      });
  
      const jsonResponse = await response.json(); // Read the JSON response once
  
      console.log(jsonResponse);
  
      if (jsonResponse.success) {
        localStorage.setItem("token", jsonResponse.authToken);
        history("/");
        props.showalert("Account created successfully", "success")

      } else {
        props.showalert("Invalid details", "danger")
      }
      
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  

    const onChange=(e)=>{
        setcreds({...creds, [e.target.name]:e.target.value})
      }

  return (
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name"  onChange={onChange}required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name="email" required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password"  onChange={onChange}required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  );
}


export default Signup
