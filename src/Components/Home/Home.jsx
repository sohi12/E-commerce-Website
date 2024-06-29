import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';


import Slider from "react-slick";
import HomeSlider from '../HomeSlider/HomeSlider';

export default function Home() {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };


  async function getAllProducts() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    setProducts(data.data);
  }
  async function getAllCategories() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    setCategories(data.data);
  }

  useEffect(() => {
    getAllProducts()
    getAllCategories()
  }, [])


  return <>
    <HomeSlider />
    <div>
      <Slider {...{ ...settings, slidesToShow: 7, slidesToScroll: 7 }}>
        {categories.map((category) => {
          return <div key={category._id} className='text-center'>
            <img style={{ height: '200px' }} src={category.image} className='w-100' alt="" />
            <h4>{category.name}</h4>
          </div>
        })}
      </Slider>
    </div >
    <div className="row">
      {products.map((product) => {
        return <div key={product.id} className="col-md-3">
          <Product product={product} />
        </div>
      })}
    </div>
  </>
}

