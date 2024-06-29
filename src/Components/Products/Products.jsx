import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';

export default function Products() {

  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  let { data, refetch } = useQuery('products', getAllProducts, {
    cacheTime: 15000,
    refetchInterval: 500000,
    staleTime: 2000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  useEffect(() => {
    Cookies.set('name', 'value')
    console.log(Cookies.get('name'));
  }, [])

  return <>
    <Helmet>
      <title>Fresh Cart | Products</title>
    </Helmet>
    <button onClick={refetch}>ReFetch</button>
    <div className="row">
      {data?.data.data.map((product) => {
        return <div key={product.id} className="col-md-3">
          <Product product={product} />
        </div>
      })}
    </div>
  </>
}
