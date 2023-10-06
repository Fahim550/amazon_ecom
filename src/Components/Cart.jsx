import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { auth, db } from '../auth/auth.config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import CartCard from './CartCard'

const style={
  carthead:`flex items-center justify-center text-3xl text-yellow-400 font-bold mt-3 mb-3 border-b-4 border-yellow-400`,
  allitems:`flex flex-col items-center justify-center `,
  proceed:`flex justify-center mb-3`,
  proceedbtn:`bg-slate-50 text-[20px] text-yellow-400 rounded-lg border-2 border-solid border-yellow-400 p-1.5 mt-2.5 hover:bg-black hover:text-yellow-400`,
}

export default function Cart() {
  const [user,setUser]=useState("")
  function GetCurrentUser(){
    
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
        console.log("loggeduseruseruser",user)
      })
    },[])
    return user
    
  }
  const loggeduser=GetCurrentUser();
  console.log("loggeduser",loggeduser)
 

  const [cartdata,setCartdata]=useState([]);

  if(loggeduser){
    const getcartdata=async()=>{
      const cartArray=[];
      const path=`cart-${loggeduser[0].uid}`
        console.log("nav path",path)
       await getDocs(collection(db,path)).then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          cartArray.push({...doc.data(),id: doc.id})
        });
        setCartdata(cartArray)
      }).catch("error error")
    }
    getcartdata();
    console.log("cartdata",cartdata);
  }
  // else{
  //   console.log("loggeduser not found")
  // }
  return (
    <div>
      <Navbar/>
      {/* {cartdata.product.productTitle} */}
      {
        cartdata.length!=0 ? <div>
              <div className={style.carthead}>Your Cart Items</div>
              <div className={style.allitems}>
              
                {
                  
                  cartdata.map((product)=>(
                      <CartCard key={product.id} product={product} userid={loggeduser[0].uid}/>
                    ))

                  
                }
              </div>
              <div className={style.proceed}>
                <button className={style.proceedbtn}>Proceed</button>
              </div>
        </div>: <div>
                <p>Your cart is empty</p>
        </div>
      }

    </div>
  )
}
