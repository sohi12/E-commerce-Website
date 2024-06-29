import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CartProduct from '../CartProduct/CartProduct';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';

export default function Cart() {

  const [cart, setCart] = useState({})
  const [isLoading, setIsLoading] = useState({})
  const [mySetTimeOut, setMySetTimeOut] = useState()
  const [cartId, setCartId] = useState()


  async function getLoggedUserCart() {
    setIsLoading(true)
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: Cookies.get('token')
        }
      })
      console.log(data);
      setCartId(data.data._id)
      setCart(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  }

  function updateProductCount(productId, count) {
    clearTimeout(mySetTimeOut)
    setMySetTimeOut(setTimeout(async () => {
      if (count < 1) {
        removeCartProduct(productId)
      } else {
        const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
          count
        }, {
          headers: {
            token: Cookies.get('token')
          }
        })
        setCart(data);
      }
    }, 500))
  }

  function removeCartProduct(productId) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
          headers: {
            token: Cookies.get('token')
          }
        })

        setCart(data);
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your item is safe :)",
          icon: "error"
        });
      }
    });



  }

  async function clearCart() {
    const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: Cookies.get('token')
      }
    })

    console.log(data);
    setCart(data);
  }

  useEffect(() => {
    getLoggedUserCart()
  }, [])


  return <>
    <Helmet>
      <title>Fresh Cart | Cart</title>
      <meta name="description" content="lorem" />
    </Helmet>
    {cart.data && cart.data.products.length != 0 ?
      <div className='my-5'>
        <button onClick={clearCart} className='btn btn-outline-danger d-block ms-auto'>Clear Cart</button>


        {cart.data?.products.map((cartProduct, index) => {
          return <div key={index} className="cart-product shadow rounded-2 my-3">
            <CartProduct cartProduct={cartProduct} removeCartProduct={removeCartProduct} updateProductCount={updateProductCount} />
          </div>
        })}


        <div className='d-flex justify-content-between'>
          <Link to={'/address/' + cartId} className='btn bg-main text-white'>CheckOut</Link>
          <p>Total cart Price: {cart.data?.totalCartPrice} EGP</p>
        </div>

      </div>
      :
      isLoading ? <i className='fas fa-spinner fa-spin fa-2x'></i> :
        <h2 className='alert alert-warning text-center my-5'>No products in your cart</h2>
    }




  </>
}
