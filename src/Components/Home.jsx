import { useState } from "react"
import Navbar from './Navbar'
import Banner from './Banner'
import { useEffect } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "../auth/auth.config"
import ProductsSlide from "./Product-Components/ProductsSlide"

const style={
  head:`flex justify-center mt-5 `,
  para:`lg:text-[55px] font-bold text-yellow-400 sm:text-[30px]`
}
export default function Home() {

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
          return getUsers();
        }
        else{
          setUser(null)
        }
      })
    },[])
    return user
  }
  const loggeduser=GetCurrentUser();
  if (loggeduser){
    console.log(loggeduser[0].email)
  }
  return (
    <div>
        <Navbar/>
        <Banner/>
        <div className={style.head}><p className={style.para}>Limited Time Deals</p></div>
        <ProductsSlide type={'Mobile'}/>
        <ProductsSlide type={'Camera'}/>
        <ProductsSlide type={'Laptop'}/>
        <ProductsSlide type={'Shoes'}/>
        
    </div>
  )
}
