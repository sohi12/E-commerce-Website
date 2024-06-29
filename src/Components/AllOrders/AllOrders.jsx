import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'

export default function AllOrders() {
    const [userId, setUserId] = useState('')
    const [orders, setOrders] = useState([])
  
    useEffect(() => {
      const decoded = jwtDecode(Cookies.get('token'));
      setUserId(decoded.id);
      if (userId != '')
        getUserOrders()
    }, [userId])
  
    async function getUserOrders() {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/' + userId)
      console.log(data);
      setOrders(data)
    }
  
    return (
      <>
        <h1>Your Orders</h1>
  
        {orders.map((order) => {
          return <div key={order.id} className="row">
            <div className="order shadow rounded p-4 my-5">
              <div className="d-flex align-items-center">
                <h2 className='fw-bolder h1'>#{order.id}</h2>
                <h4 className='fw-bold text-primary mx-4'>Processing</h4>
              </div>
              <p>You have ordered {order.cartItems.length} items.</p>
              <div className="d-flex">
                {order.cartItems.map((item) => {
                  return <img key={item._id} src={item.product.imageCover} style={{ width: 150 }} alt="" />
                })}
              </div>
              <hr />
              <p><strong>Total amount: </strong>{order.totalOrderPrice} EGP</p>
            </div>
          </div>
        })
        }
      </>
    )
}
