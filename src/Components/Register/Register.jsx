import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()




  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Min length shoud be 3 characters').max(20, 'Max length shoud be 20 characcters'),
    email: Yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email'),
    password: Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Password must contain special character, number and greater than 8 chracters and less than 18 chracters'),
    rePassword: Yup.string().required("RePassword is required").oneOf([Yup.ref('password')], "Password and RePassword dosen't match"),
    phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Enter  valid Egyptian phone number")
  })

  function validate(values) {
    const errors = {}
    if (values.name == "") {
      errors.name = "Name is required"
    } else if (values.name.length < 3) {
      errors.name = "Min length shoud be 3 characters"
    } else if (values.name.length > 20) {
      errors.name = "Max length shoud be 20 characcters"
    }

    if (values.email == "") {
      errors.email = "Email is required"
    } else if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(values.email)) {
      errors.email = "Enter valid email"
    }

    if (values.password == "") {
      errors.password = "Password is required"
    } else if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).test(values.password)) {
      errors.password = "Password must contain special character, number and greater than 8 chracters and less than 18 chracters"
    }

    if (values.rePassword == "") {
      errors.rePassword = "RePassword is required"
    } else if (values.password != values.rePassword) {
      errors.rePassword = "Password and RePassword dosen't match"
    }

    if (values.phone == "") {
      errors.phone = "Phone is required"
    } else if (!(/^01[0125][0-9]{8}$/).test(values.phone)) {
      errors.phone = "Enter  valid Egyptian phone number"
    }

    console.log(errors);
    return errors
  }

  async function onSubmit() {
    setIsLoading(true)
    setErrorMsg('');
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      if (data.message == "success") {
        navigate('/login')
      }
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
    setIsLoading(false)
  }

  const { handleSubmit, values, handleChange, errors, touched, handleBlur, isValid } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    onSubmit,
    validationSchema
  })

  return <>
    <div className="w-75 m-auto my-5">
      <h1 className='text-center'>Register Now :</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className='my-1'>Name:</label>
        <input value={values.name} onBlur={handleBlur} onChange={handleChange} type="text" className='form-control mb-3' id='name' name='name' />
        {errors.name && touched.name && <p className='alert alert-danger'>{errors.name}</p>}

        <label htmlFor="email" className='my-1'>Email:</label>
        <input value={values.email} onBlur={handleBlur} onChange={handleChange} type="email" className='form-control mb-3' id='email' name='email' />
        {errors.email && touched.email && <p className='alert alert-danger'>{errors.email}</p>}


        <label htmlFor="password" className='my-1'>Password:</label>
        <input value={values.password} onBlur={handleBlur} onChange={handleChange} type="password" className='form-control mb-3' id='password' name='password' />
        {errors.password && touched.password && <p className='alert alert-danger'>{errors.password}</p>}


        <label htmlFor="rePassword" className='my-1'>RePassword:</label>
        <input value={values.rePassword} onBlur={handleBlur} onChange={handleChange} type="password" className='form-control mb-3' id='rePassword' name='rePassword' />
        {errors.rePassword && touched.rePassword && <p className='alert alert-danger'>{errors.rePassword}</p>}


        <label htmlFor="phone" className='my-1'>phone:</label>
        <input value={values.phone} onBlur={handleBlur} onChange={handleChange} type="tel" className='form-control mb-3' id='phone' name='phone' />
        {errors.phone && touched.phone && <p className='alert alert-danger'>{errors.phone}</p>}


        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        {isLoading ? <button disabled type='button' className='btn bg-main px-3 text-white ms-auto d-block px-4'> <i className='fas fa-spin fa-spinner'></i> </button> :
          <button type='submit' disabled={isLoading || !isValid} className='btn bg-main px-3 text-white ms-auto d-block'>Register</button>
        }

      </form>
    </div>
  </>
}
