import axios from 'axios'
import Cookies from 'js-cookie';
import  { useContext } from 'react'
import { Offline, Online } from 'react-detect-offline';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { cartContext } from '../../Contexts/CartContext';





function Product({ product }) {
    // const {setCart}= useContext(cartContext)
    async function addProductToCart(productId) {
        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            productId
            
        }, {
            headers: {
                token: Cookies.get('token')
            }
        })
        console.log(data);
        // setCart(data)
        toast.success(data.message, {
            position: "top-center",
            autoClose: 2000,
            draggable: true
        });
       
    }
    return (
        <div className="product overflow-hidden px-2 py-3 cursor-pointer">
            <Link to={'/product/' + product.id} className='a'>
                <img className='w-100' src={product.imageCover} alt="" />
                <h5 className='font-sm text-main'>{product.category.name}</h5>
                <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                <p className='d-flex justify-content-between'>
                    <span >{product.price} EGP</span>
                    <span>  <i class="fa-regular fa-heart"></i></span>
                    <span>
                        <i className='fas fa-star rating-color me-1'></i>
                        {product.ratingsAverage}
                    </span>
                </p>
            </Link>
            <Online>
                <button onClick={() => addProductToCart(product.id)} className='btn bg-main text-white w-100 '>+Add To Cart</button>
            </Online>
            <Offline>
                <button disabled className='btn bg-main text-white w-100 '>+Add To Cart (Offline)</button>
            </Offline>
        </div>
    )
}

export default Product