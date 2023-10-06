import  { useState } from 'react'
import Navbar from './Navbar'
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { auth } from '../auth/auth.config';

const style={
  container:`flex justify-center p-24`,
  form:`flex flex-col p-2 rounded-xl border-[1px] border-solid border-slate-200  w-[350px]`,
  head:`text-2xl`,
  label:`mt-4 font-bold text-base text-2xl`,
  input:`my-px rounded-md p-1 border-2 border-solid border-gray-400 text-2xl focus:outline-[2px]`,
  success:`flex w-100 justify-center bg-slate-200 p-2.5 rounded-md text-lime-400`,
  error:`flex w-100 justify-center bg-slate-200 p-2.5 rounded-md text-red-600`,
  button:`mt-5 mb-5 border-none text-xl bg-yellow-400 text-white rounded-lg hover:bg-black hover:text-yellow-400 hover:cursor-pointer`,

}

export default function Login() {
  const [email ,setEmail]=useState("");
  const [password ,setPassword]=useState("");
  const [errorMsg,setErrorMsg]=useState("")
  const [successMsg,setSuccessMsg]=useState("")
  const navigate=useNavigate();
  // const auth=getAuth();
  const handleLogin=(e)=>{
        e.preventDefault()
         signInWithEmailAndPassword(auth, email, password)
  .then((res) => {
    // Signed in 
    // const user = userCredential.user;
    console.log(res)
    // ...
    setSuccessMsg('New User added successfully ,you will now be automaticlly redirected to login page')
            setEmail(''),
            setPassword(''),
            // setErrorMsg(''),
            setTimeout(()=>{
                setSuccessMsg('');
                navigate('/');
            
            },2000)
            .catch((error)=>{setErrorMsg(error.message)})
  })
  .catch((error) => {
   console.log(error)
   if (error.message=='Firebase:Error (auth/invalid-email).')
   {
       setErrorMsg('please fill all required fields')
   }
   if(error.message=='Firebase:Error (auth/email-already-in-use).')
   {
       setErrorMsg('User already exist')
   }
  });
  }
  return (
    <div>
        <Navbar/>
        <div className={style.container}>
            <form className={style.form} >
                <p className={style.head}>Login</p>
                {
                    successMsg&&<>
                    <div className={style.success}>
                        {successMsg}
                        </div></>
                }
                {
                    errorMsg&&<>
                    <div className={style.error}>
                        {
                            errorMsg
                        }
                        </div></>
                }
                <label  className={style.label}>Email</label>
                <input onChange={(e)=>setEmail(e.target.value)} className={style.input} type="email" placeholder='Enter Your email' />
                <label className={style.label}>Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} className={style.input} type="password " placeholder='Enter Your password' />
                    <button onClick={handleLogin} className={style.button}>Login</button>
                    <div>
                        <span>Dont have an Account?</span>
                        <Link to='/signin'></Link>
                    </div>
            </form>
        </div>
    </div>
  )
}
