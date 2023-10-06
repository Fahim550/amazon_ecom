
import { collection, getDocs, query, where } from 'firebase/firestore'
import Navbar from './Navbar'
import { auth, db } from '../auth/auth.config'
import { useEffect, useState } from 'react'

const style={
  outer:`flex mt-[200px] justify-center items-center`,
  userprofile:`bg-yellow-400 p-2.5 rounded-lg border-red-200 w-[500px]`,
  heading:`text-3xl text-white font-bold border-b-3 border-solid border-white`,
  datarow:`flex flex-row text-white `,
  span:`w-50 p-2.5 text-lg border-1 border-solid`,
}

export default function UserProfile() {

  function GetCurrentUser(){
    const [user,setUser]=useState("")
    const userCollectionRef =collection(db,"users")

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
  if (loggeduser){
    console.log("email",loggeduser[0].email);
    // const cart={loggeduser[0].email}
  }
  return (
    <div>
        <Navbar/>
        <div className={style.outer}>
          { 
           loggeduser?<div className={style.userprofile}>
            <p className={style.heading}>Your Account Details</p>
            <div className={style.datarow}>
              <span className={style.span}>Your Name</span>
              <span className={style.span}>{loggeduser[0].username}</span>
            </div>
            <div className={style.datarow}>
              <span className={style.span}>Your Email</span>
              <span className={style.span}>{loggeduser[0].email}</span>
            </div>
            <div className={style.datarow}>
              <span className={style.span}>Your PhoneNumber</span>
              <span className={style.span}>{loggeduser[0].phonenumber }</span>
            </div>
            <div className={style.datarow}>
              <span className={style.span}>Your Address</span>
              <span className={style.span}>{loggeduser[0].address}</span>
            </div>
           </div>:<div>
            Your Are Not Logged IN
           </div>
          }
        </div>
    </div>
  )
}
