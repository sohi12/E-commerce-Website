import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    let navigate = useNavigate();
  
    async function handleSubmit() {
      return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {email,
        })
        .then((data) => {
          toast.success(data.data.message);
          localStorage.setItem("resetPasswordViaEmail", email);
          navigate("/verifyresetcode");
        })
        .catch((err) => {
  
          toast.error("sorry that's email doesn't exist");
          console.log(err);
        });
       
  
    };
  
    return (
      <div className="container py-2">
        <label className='py-5 fs-3' htmlFor="email">E-mail: </label>
        <input
          className="form-control sb-3"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
        />
        <br />
        <button
          onClick={handleSubmit}
          className="btn bg-main text-white"
        >
          Submit
        </button>
      </div>
    );
}
