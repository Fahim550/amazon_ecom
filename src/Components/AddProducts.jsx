import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { auth, db, storage } from '../auth/auth.config'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export default function AddProducts() {

  const [productTitle,setProductTitle]=useState("")
  const [productType,setProductType]=useState("")
  const [description,setDescription]=useState("")
  const [brand,setBrand]=useState("")
  const [customerSupport,setCustomerSupport]=useState("")
  const [price,setPrice]=useState("")
  const [warranty,setWarranty]=useState("")
  const [productImage,setProductImage]=useState("")
  const [keyspacs,setKeyspacs]=useState("")
  const [imageError,setImageError]=useState("")
  const [successMsg,setSuccessMsg]=useState("")
  const [uploadError,setUploadError]=useState("")

  const style={
    container:`flex justify-center pt-[40px]`,
    form:`flex flex-col pr-2.5 pl-2.5 border-2 border-solid border-slate-100	rounded-lg w-[600px]`,
    title:`text-2xl m-0`,
    label:`p-0 mt-[5px] font-bold text-lg`,
    textarea:`mt-1 mb-1 rounded-md p-1.5 border-[2px] border-solid border-slate-300 teclassName={style.input} xt-lg`,
    input:`border-slate-300 border-2 focus:outline-2 focus:outline focus:outline-yellow-400 rounded-none`,
    button:`bg-yellow-400 mt-2.5 mb-2.5 rounded-none text-2xl text-white font-semibold rounded-lg p-1.5 hover:bg-black hover:text-yellow-400 hover:cursor-pointer`,
    success:`flex w-100 justify-center bg-slate-100 p-2.5 rounded-lg text-green-600`,
    ErrorMsg:`flex w-100 justify-center bg-slate-100 p-2.5 rounded-lg text-red-600`,
  }


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
      const types=['image/jpg','image/jpeg','image/png','image/PNG']
      const handleProductImg=(e)=>{
        e.preventDefault();
        let selectFile=e.target.files[0];

        if(selectFile){
          if(selectFile && types.includes(selectFile.type)){
            setProductImage(selectFile)
            setImageError('')
          }
          else{
            setProductImage(null)
            setImageError("please select a valid image file type(png or jpg)")
          }
        }
        else{
         setImageError('please select your file')
        }
      }
      const handleAddProduct=(e)=>{
        e.preventDefault();
        const storageRef=ref(storage,`product-image${productType.toUpperCase()}/${Date.now()}`)
        console.log(storageRef._location.path)
        uploadBytes(storageRef,productImage)
        .then(()=>{
          getDownloadURL(storageRef).then(url=>{
            addDoc(collection(db,`products-${productType.toUpperCase()}`),{
              productTitle,
            productType,
            description,
            brand,
            customerSupport,
            price,
            warranty,
            productImage :url,
            keyspacs:keyspacs,
            })
          })
        })  
      }
  return (
    <div>
        <Navbar/>
        {
            loggeduser&&loggeduser[0].email=="ahmedfahim23051@gmail.com"?
            <div className={style.container}>
                <form className={style.form} onSubmit={handleAddProduct}>
                    <p className={style.title}>Add Data</p>
                    {
                        successMsg&& <div className={style.success}>{successMsg}</div>
                    }
                    {
                        uploadError&& <div className={style.ErrorMsg}>{uploadError}</div>
                    }
                    <label className={style.label}>Product Title</label>
                    <input className={style.input} type="text" onChange={(e)=>{setProductTitle(e.target.value)}} placeholder='Product Title'/>
                    <label className={style.label}>Product Type</label>
                    <input className={style.input} type="text" onChange={(e)=>{setProductType(e.target.value)}} placeholder='Product Type'/>
                   
                    <label className={style.label}>Brand Name</label>
                    <input className={style.input} type="text" onChange={(e)=>{setBrand(e.target.value)}} placeholder='Brand Name'/>
                    <label className={style.label}>Warranty</label>
                    <input className={style.input} type="text" onChange={(e)=>{setWarranty(e.target.value)}} placeholder='Product Warranty'/>

                    <label className={style.label}>Image</label>
                    <input className={style.input} type="file" onChange={handleProductImg} />
                    {
                      imageError&&<>
                      <div className={style.ErrorMsg}>{imageError}</div>
                      </>
                    }
                    <label className={style.label}>Key Specification</label>
                    <textarea className={style.textarea} type="text" onChange={(e)=>{setKeyspacs(e.target.value)}} placeholder='Enter some key specification'></textarea>
                     <label className={style.label}>Description</label>
                    <textarea className={style.textarea} type="text" onChange={(e)=>{setDescription(e.target.value)}} placeholder='Describe your product in breif'></textarea>
                    <label className={style.label}>Price Without Tax</label>
                    <input className={style.input} type="text" onChange={(e)=>{setPrice(e.target.value)}} placeholder='Enter Price Without Tax'/>
                    <label className={style.label}>Customer Support</label>
                    <input className={style.input} type="text" onChange={(e)=>{setCustomerSupport(e.target.value)}} placeholder='Customer Support Email, Phone or address'/>

                    <button className={style.button} type='submit'>Add</button>
                </form>

            </div>:<div>You don't have access to add products</div>
            
        }
    </div>
  )
}
