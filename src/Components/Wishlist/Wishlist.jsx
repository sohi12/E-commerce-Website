// import React, { useEffect, useState } from 'react'

// import { toast } from 'react-toastify';


// export default function Wishlist() {
//   let {getWishlist,deleteWishlist}= useState()
// let [data,setData]=useState([])
// let[loading,setLoading]=useState(true);

// async function  getWish(){
// let {data} = await getWishlist();

// console.log(data.data);
// setData(data.data)
// }

// async function deleteWish(id) {
//   let { data } = await deleteWishlist(id);
//   // console.log(data);
//   if (data.status == "success") {
//     toast.error("product deleted successfully");
//     // setData(data);

//   }
// }

// useEffect(()=>{
//   getWish()
// },[
//   deleteWish()
// ])

//   return (
//     <div className="container px-5 my-5 bg-main-light p-3 rounded-2">
//     <div className="d-flex justify-content-between mb-5 mt-3">
//       <h4 className="fw-bold "> Wish List</h4>

     
//     </div>
//     {data?.map((item) => {
//         return (
//           <div className="row border-bottom">
//             <div className="col-md-2">
//               <img
//                 src={item.imageCover}
//                 className="w-100 my-3"
//                 alt=""
//               />
//             </div>
//             <div className="col-md-10 d-flex justify-content-between align-items-center">
//               <div>
//                 <p className="m-1 fw-bold">{item.title}</p>
//                 <p className="text-main p-0 m-0">Price: {item.price}EGP</p>
//                 <button
//                   onClick={() => deleteWish(item._id)}
//                   className="btn red p-0 m-0"
//                 >
//                   <i className="fa-solid fa-trash-can mx-1"></i>
//                   <span>remove</span>
//                 </button>
//               </div>
             
//             </div>
//           </div>
//         );
//       })}
    
//   </div>
//   )
// }


// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

// export default function Wishlist() {
//   const [data, setData] = useState([]);
//   const getWishlist = async () => {
//     // قم بتنفيذ طلب الحصول على البيانات من القائمة المفضلة
//     // احتمالاً ستقوم بجلب البيانات من خادم API وتحديث قيمة data بالبيانات المستلمة
//     try {
//       const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist');
//       const wishlistData = await response.json();
//       setData(wishlistData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteWishlist = async (id) => {
//     // قم بتنفيذ طلب الحذف لعنصر القائمة المفضلة المحدد
//     // احتمالاً ستقوم بإرسال طلب حذف عنصر القائمة المفضلة إلى خادم API
//     try {
//       const response = await fetch(`YOUR_API_ENDPOINT/${id}`, {
//         method: 'DELETE',
//       });
//       const data = await response.json();
//       if (response.ok) {
//         toast.error('Product deleted successfully');
//         // يمكنك تحديث قيمة data هنا لإزالة العنصر المحذوف من القائمة
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getWishlist();
//   }, []);

//   return (
//     <div className="container px-5 my-5 bg-main-light p-3 rounded-2">
//       <div className="d-flex justify-content-between mb-5 mt-3">
//         <h4 className="fw-bold">Wish List</h4>
//       </div>
//       {data?.map((item) => (
//         <div className="row border-bottom" key={item._id}>
//           <div className="col-md-2">
//             <img src={item.imageCover} className="w-100 my-3" alt="" />
//           </div>
//           <div className="col-md-10 d-flex justify-content-between align-items-center">
//             <div>
//               <p className="m-1 fw-bold">{item.title}</p>
//               <p className="text-main p-0 m-0">Price: {item.price}EGP</p>
//               <button
//                 onClick={() => deleteWishlist(item._id)}
//                 className="btn red p-0 m-0"
//               >
//                 <i className="fa-solid fa-trash-can mx-1"></i>
//                 <span>remove</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
























import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Wishlist() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWishlist = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist');
      const wishlistData = await response.json();

     
      if (!Array.isArray(wishlistData)) {
        console.error('Data is not an array');
        return;
      }

      setData(wishlistData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addWishToCart = async (product) => {
    try {
      
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        method: 'POST',
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Product added to cart successfully');
        
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  addWishToCart()

  useEffect(() => {
   
    getWishlist();
  }, []);

  const deleteWishlist = async (id) => {
    try {
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        toast.error('Product deleted successfully');
        setData(data.wishlist);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container px-5 my-5 bg-main-light p-3 rounded-2">
      <div className="d-flex justify-content-between mb-5 mt-3">
        <h4 className="fw-bold">Wish List</h4>
      </div>

      {loading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <p>Error: {error.message}</p>
          <button onClick={getWishlist} className="btn btn-primary">
            Retry
          </button>
        </div>
      ) : (
        data && data.length > 0 ? (
          data.map((item) => (
            <div className="row border-bottom" key={item._id}>
              <div className="col-md-2">
                <img src={item.imageCover} className="w-100 my-3" alt="" />
              </div>
              <div className="col-md-10 d-flex justify-content-between align-items-center">
                <div>
                  <p className="m-1 fw-bold">{item.title}</p>
                  <p className="text-main p-0 m-0">Price: {item.price}EGP</p>
                  <button
                    onClick={() => deleteWishlist(item._id)}
                    className="btn red p-0 m-0"
                  >
                    <i className="fa-solid fa-trash-can mx-1"></i>
                    <span>remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p>No items in your wishlist.</p>
            <button onClick={getWishlist} className="btn btn-primary">
              Refresh
            </button>
          </div>
        )
      )}
    </div>
  );
}

