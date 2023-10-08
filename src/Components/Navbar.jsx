import cart from "../photo/cart3.png"
import profile from "../photo/profile2.jpg"
import codelogo from "../photo/codelogo.png"

import { useState } from "react"
import { useEffect } from "react"
import {  collection, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "../auth/auth.config"

import {Link, useNavigate} from "react-router-dom"


const style={
    imag:`w-12 top-2 h-fit text-white`,
    icon:` bg-yellow-400 w-8 h-8 justify-center flex items-center rounded-3xl relative top-2 right-2  hover:text-yellow-400 hover:bg-white`,
    main:`flex  bg-black items-center w-[100%] justify-end justify-between p-2 h-20`,
    left:`float-left items-start `,
    right:` `,
    nav:`flex items-center justify-end p-0`,
    button:"m-1 p-1 text-slate-200 rounded-lg hover:bg-yellow-400 hover:text-white",
    profile:`w-8 pr-2`,
    cart:`flex items-center p-4`,
    logout:`bg-yellow-400 rounded-lg hover:bg-white hover:text-black`,
    producttypes:`flex justify-center bg-yellow-400`,
    buttonl:`bg-yellow-400 pr-1.5 pl-1.5 mr-4 ml-4 border-2 border-solid border-slate-200	text-slate-50 rounded-md text-2xl hover:bg-white hover:text-black hover:font-semibold`
}
export default function Navbar() {
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
        console.log("email",loggeduser[0].email);
        // const cart={loggeduser[0].email}
      }

      const navigate=useNavigate()

      const handleLogout=()=>{
        auth.signOut().then(()=>{
            navigate("/login")
        })
      }

      
     
      const [cartdata,setCartdata]=useState([]);
    
      if(loggeduser){
        const getcartdata=async()=>{
          const cartArray=[];
          const path=`cart-${loggeduser[0].uid}`
            console.log("nav path",path)
          getDocs(collection(db,path)).then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
              cartArray.push({...doc.data(),id: doc.id})
            });
            setCartdata(cartArray)
          }).catch("error error")
        }
        getcartdata();
        console.log("cartdata",cartdata);
      }
       // useEffect(()=>{
      //   if(loggeduser){
      //    const getproducts=()=>{
      //     const path=`cart-${loggeduser[0].uid}`;
      //     const q = query(collection(db, path));
      //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //       let cartArray=[];
      //       querySnapshot.forEach((doc) => {
      //         cartArray.push({...doc.data(),id:doc.id})
      //         // console.log(doc.id,"=>",doc.data());
      //       });
      //       setCartdata(cartArray)
            
      //           })
                
      //           // .catch((error)=>{
      //           //   console.error(error.message)
      //           // })
      //           return ()=>unsubscribe();
      //         }
      //         getproducts()
      //       }
         
      //     },[])
      //     console.log("navcartdata",cartdata);
      
  return (
 <>
    <div>
      <div className={style.main}>
          <div className={style.left}>
          <img src={codelogo} alt="no-img" className="w-[100px]" />
          </div>

          <div className={style.right}>
              {
                  !loggeduser&& <nav className={style.nav}>
                      <Link to='/'><button  className={style.button}>Home</button></Link>
                      <Link to='/signin'><button className={style.button}>Register</button></Link>
                      <Link to='/login'><button className={style.button}>Login</button></Link>

                      <div className={style.cart}>
                          <img src={cart} alt="no-img" className={style.imag} />
                          <span className={style.icon}>0</span>
                      </div>
                      <Link to='/profile'>
                      <img src={profile} alt="no-img" className={style.profile} />
                      </Link>
                  </nav>
              }
              {
                  loggeduser&& <nav className={style.nav}>
                      <Link to='/'><button  className={style.button}>Home</button></Link>
                      <Link to='/sellproducts'><button  className={style.button}>Sell</button></Link>
                      <div className={style.cart}>
                          <Link to='/cart'><img src={cart} alt="no-img" className={style.imag} /></Link>
                          <button className={style.icon}>{cartdata.length}</button>
                      </div>
                      <Link to='/profile'>
                      <img src={profile} alt="no-img" className={style.profile} />
                      </Link>
                      <button className={style.logout} onClick={handleLogout}>Logout</button>
                  </nav>
              }
          </div>
          
        
          
        
      </div>
      {
        loggeduser &&   <div className={style.producttypes}>
        <Link to="/product-type/mobiles"><button className={style.buttonl}>Mobiles</button></Link>
        <Link to="/product-type/laptops"><button className={style.buttonl}>Laptops</button></Link>
        <Link to="/product-type/cameras"><button className={style.buttonl}>Cameras</button></Link>
        <Link to="/product-type/shoes"><button className={style.buttonl}>Shoes</button></Link>
  </div>
      }
    
    </div>
</>
  )
}
