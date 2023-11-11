import { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import {  collection,  onSnapshot, query } from 'firebase/firestore'
import { db } from '../../auth/auth.config'
import ProductContainer from './ProductContainer'
import Sliderproductcard from './Sliderproductcard'
import ProductsSlide from './ProductsSlide'
const style={
  allproducts:``,
  heading:`bg-slate-100 h-[100px] flex justify-center items-center`,
  headingp:`text-5xl`,
  allprocontainer:`flex flex-row flex-wrap justify-center items-center mt-5`,
}
export default function AllProducts(Props) {
  // console.log(Props.type)
  const [products,setProducts]=useState([])
  const path=`products-${Props.type.toUpperCase()}`;
  console.log(path);
  useEffect(()=>{
  //  const getproducts=()=>{
    const q = query(collection(db, path));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let productdArray=[];
      querySnapshot.forEach((doc) => {
        productdArray.push({...doc.data(),id:doc.id})
      });
      setProducts(productdArray)
      
          })
          
          return ()=>unsubscribe();
        // }
        // getproducts()
    },[path])
    console.log("product",products)
    
      
  
  return (
    <div className={style.allproducts}>
      <Navbar/>
      <div className={style.heading}>
        <p className={style.headingp}>Top Result for {Props.type}</p>

      </div>
      <div className={style.allprocontainer}>
            {
              products.map((product)=>(
                <ProductContainer key={product.id} product={product} />
               
              ))
            }
            {/* {
              products.map((product)=>{
                <ProductsSlide  key={product.id} product={product}/>
              })
            } */}
               
             
      </div>
    </div>
  )
}
