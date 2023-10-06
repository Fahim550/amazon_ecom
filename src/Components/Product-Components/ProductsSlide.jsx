import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Sliderproductcard from "./Sliderproductcard";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../auth/auth.config";
export default function ProductsSlide(Props) {

  const [products,setProducts]=useState([])
  const path=`products-${Props.type.toUpperCase()}`;
  // console.log("productslidr",path);
  useEffect(()=>{
   const getproducts=()=>{
    const q = query(collection(db, path));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productdArray=[];
      querySnapshot.forEach((doc) => {
        productdArray.push({...doc.data(),id:doc.id})
        // console.log(doc.id,"=>",doc.data());
      });
      setProducts(productdArray)
      
          })
          
         
          return unsubscribe;
        }
        getproducts()
    },[path])
    console.log("productslider",products)

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };
  return (
    <div>
      

      <Carousel responsive={responsive}>
       
      {
        products.map((product)=>(
          <Sliderproductcard key={product.id} product={product}/>
        ))
      }
  </Carousel>;
    </div>

  )
}
