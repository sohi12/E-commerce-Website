import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Contexts/authContext';
import Cookies from 'js-cookie';


export default function Login() {
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()
  let { isUserLoggedIn, setIsUserLoggedIn } = useContext(authContext)

  async function onSubmit() {
    setErrorMsg('');
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      if (data.message == "success") {
        setIsUserLoggedIn(true);
        Cookies.set("token", data.token);

        if (window.location.pathname == '/login') {
          navigate('/home')
        } else {
          navigate(window.location.pathname)
        }
      }
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email'),
    password: Yup.string().required("Password is required")
  })

  const { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
    validationSchema
  })

  return <>
    <div className="w-75 m-auto my-5">
      <h1 className='text-center'>Login Now :</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className='my-1'>Email:</label>
        <input value={values.email} onBlur={handleBlur} onChange={handleChange} type="email" className='form-control mb-3' id='email' name='email' />
        {errors.email && touched.email && <p className='alert alert-danger'>{errors.email}</p>}

        <label htmlFor="password" className='my-1'>Password:</label>
        <input value={values.password} onBlur={handleBlur} onChange={handleChange} type="password" className='form-control mb-3' id='password' name='password' />
        {errors.password && touched.password && <p className='alert alert-danger'>{errors.password}</p>}
         <a className='text-danger'  href="/forgotpassword">ForgotPassword?</a>
          
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        {/* <button disabled type='button' className='btn bg-main px-3 text-white ms-auto d-block'> <i className='fas fa-spin fa-spinner'></i> </button> */}

        <button type='submit' className='btn bg-main px-3 text-white ms-auto d-block'>Login</button>
      </form>
    </div>
  </>
}
