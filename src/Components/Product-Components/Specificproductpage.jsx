import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import ProductSlide from './ProductsSlide'
import { useParams } from 'react-router'
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../auth/auth.config';
import cash from "../../photo/cashon.jpeg"
import warranty from "../../photo/warranty.jpeg"
import replacement from "../../photo/replacement.jpeg"

const style={
  container:`flex justify-center items-center`,
  imgcont:`w-[1000px] mr-5 p-8 `,
  img:`max-w-[320px] max-h-[340px] ml-12 mt-5`,
  productImage:`w-100`,
  prodata:`justify-center items-center `,
  protitle:`text-4xl font-semibold leading-10`,
  keyspacs:`font-2xl`,
  price:`flex m-0 p-0 flex-col`,
  mrp:`text-2xl  mt-1 p-0 flex`,
  frate:`flex m-0  text-red-500 line-through`,
  seleprice:`text-2xl  p-0 flex`,
  rate:`flex text-lime-500`,
  save:'flex m-0 p-1 text-lg',
  deatailshead:`p-0 text-4xl  m-0 mt-2 text-yellow-400 width-[110px] underline underline-offset-4`,
  deatailshead2:`p-0 text-4xl  m-0 mt-2 text-yellow-400 width-[110px] underline underline-offset-4`,
  description:``,
  rowcont:`flex center w-[550px] `,
  warrantydes:`flex bg-slate-50 p-2.5 justify-evenly w-[300px] rounded-lg items-center shadow-xl`,
  cod:`flex flex-col justify-center items-center`,
  warranty:`flex flex-col justify-center items-center`,
  replacment:`flex flex-col justify-center items-center`,
  imgcircle:`w-[40px] h-[40px] flex justify-center items-center bg-white rounded-[60px]`,
  rowimg:`w-[30px] rounded-[20px] justify-center items-center ml-[-40px]`,
  p:`font-[13px] align-center font-semibold text-yellow-400 `,
  buycart:`ml-6 mt-5`,
  btn:`bg-slate-50 text-yellow-400 border-2 border-solid border-yellow-400 mr-2 p-1.5 mt-2.5 hover:bg-black hover:text-yellow-400`,
  footer:`justify-center items-center bg-lime-200 mt-1 p-2 align-center`,
  footerp:` `,
  successmsg:`justify-center items-center bg-lime-200 mt-1 p-2 align-center`,
  errormsg:`justify-center items-center bg-red-200 mt-1 p-2 align-center`,
}
export default function Specificproductpage() {
    
    const {id,type}=useParams();
    const [product,setProduct]=useState('');
    const [successMsg,setSuccessMsg]=useState('');
    const [errorMsg,setErrorMsg]=useState('');

    function GetCurrentUser(){
      const [user,setUser]=useState("")
      // const userCollectionRef =collection(db,"users")
  
      useEffect(()=>{
        auth.onAuthStateChanged(userlogged =>{
          if(userlogged){
            const getUsers=async()=>{
              const q = query(collection(db, "users"), where("uid", "==", userlogged.uid));
              console.log(q)
              const data= await getDocs(q)
              setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
            }
            getUsers();
          }
          else{
            setUser(null)
          }
        })
      },[])
      return user

      
    }
    const loggeduser=GetCurrentUser();
    

    function GetCurrentProduct(){
        useEffect(()=>{
            const getProduct=async()=>{
                const docRef=doc(db,`products-${type.toUpperCase()}`,id);
                const docSnap=await getDoc(docRef);
                setProduct(docSnap.data());
            };
            getProduct()
        },[])
        return product
        
    }
     GetCurrentProduct()
    let overaaltax=10/100;
    let overcommision=10/100;
    let extraforfun=10/100;
    let mrp=parseInt(product.price)
    mrp=mrp+overaaltax*mrp+overcommision*mrp+extraforfun*mrp
    const seleprice=mrp-extraforfun*mrp

    const addtocart=()=>{
      if(loggeduser){
          addDoc(collection(db,`cart-${loggeduser[0].uid}`),{
            product,quantity:1
          }).then(()=>{
            setSuccessMsg("Product added to cart")
            
          }).catch((error)=>{
            setErrorMsg(error.message)
          })
      }else {
        setErrorMsg("You need to login first")
        
      }
      
    }
  return (
    <>
    <Navbar/>
    {
      product?<div className={style.container}>
        <div className={style.imgcont}>
          <img src={product.productImage} className={style.img} alt="" />
        </div>
        <div className={style.prodata}>
          <p className={style.protitle}>{product.productTitle}</p>
          <p className={style.keyspacs}>{product.keyspacs}</p>
          <div className={style.price}>
                <div className={style.mrp}>TAKA: <p className={style.frate}>{mrp}</p> </div>
                <div className={style.seleprice}>Discount Price: <p className={style.rate}>{seleprice}</p> </div>
                <p className={style.save}>Discount Price: {mrp-seleprice}</p>
            </div>

            <p className={style.deatailshead}>Details</p>
            <p className={style.description}>{product.description}</p>

            <div className={style.rowcont}>
              <div className={style.warrantydes}>
              <div className={style.cod}>
                <div className={style.imgcircle}>
                  <img src={cash} alt="" className={style.rowimg}/>
                </div>
                <p className={style.p}>Cash on Delivery</p>
              </div>

              <div className={style.warranty}>
                <div className={style.imgcircle}>
                  <img src={warranty} alt="" className={style.rowimg}/>
                </div>
                <p className={style.p}>{product.warranty} years warranty</p>
              </div>

              <div className={style.replacment}>
                <div className={style.imgcircle}>
                  <img src={replacement} alt="" className={style.rowimg}/>
                </div>
                <p className={style.p}>10 Days replacment</p>
              </div>
              </div>
              <div className={style.buycart}>
                <button className={style.btn}>Buy Now</button>
                <button className={style.btn} onClick={addtocart}>Add to Cart</button>
              </div>
             
            </div>
            {/* <div className={style.footer}>
            <p className={style.footerp}>Product added to cart</p>
            </div> */}
           
            {
              successMsg && <>
              <div className={style.successmsg}>{successMsg}</div>
              </>
            }
            {
              errorMsg && <>
              <div className={style.errormsg}>{errorMsg}</div>
              </>
            }
            
        </div>
      </div>: <div>
              Loading...
      </div>
    }
    <p className={style.deatailshead2}>Similar Items</p>
    <ProductSlide type={type}></ProductSlide>
  
 
    </>
  )
}
