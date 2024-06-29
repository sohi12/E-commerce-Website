import React, { useEffect } from 'react';
import style from './categories.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase, incrementByNumber } from '../../Redux/CounterSlice';
import { getProducts } from '../../Redux/ProductsSlice';
import Product from '../Product/Product';
import useFetch from '../../Hooks/useFetch';
import { Helmet } from 'react-helmet';
export default function Categories() {

  let { counter } = useSelector((state) => state.counter)
  let { products } = useSelector((state) => state.products)
  let dispatch = useDispatch()
  let data = useFetch('https://ecommerce.routemisr.com/api/v1/brands')
  console.log(data);

  useEffect(() => {
    dispatch(getProducts())
  }, [])


  return <>
    <Helmet>
      <title>Fresh Cart | Categories</title>
      <meta name="description" content="lorem" />
    </Helmet>
    <h1>Categories</h1>
    <h1>{counter}</h1>
    <button className='btn btn-outline-success' onClick={() => dispatch(increase())}>+</button>
    <button className='btn btn-outline-danger' onClick={() => dispatch(decrease())}>-</button>
    <button className='btn btn-outline-warning' onClick={() => dispatch(incrementByNumber(5))}>++++++++++</button>

    <div className="row">
      {products.map((product) => {
        return <div key={product.id} className="col-md-3">
          <Product product={product} />
        </div>
      })}
    </div>
  </>
}
