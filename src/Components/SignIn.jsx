import  { useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../auth/auth.config';


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
export default function SignIn() {
    const [username ,setUsername]=useState("");
    const [email ,setEmail]=useState("");
    const [password ,setPassword]=useState("");
    const [phonenumber,setPhonenumber]=useState("");
    const [address,setAddress]=useState("");

    const navigate=useNavigate();
    
    const [errorMsg,setErrorMsg]=useState("")
    const [successMsg,setSuccessMsg]=useState("")

    const handleSubmit=async (e)=>{
       e.preventDefault();
      await createUserWithEmailAndPassword(auth,email,password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // const initialcartvalue=0;
    console.log(user);
    console.log("user");


    addDoc(collection(db, "users"), {
        username:username,
        email:email,
        phonenumber:phonenumber,
        password:password,
        address:address,
        uid:user.uid,
      })
      .then(()=>{
            setSuccessMsg('New User added successfully ,you will now be automaticlly redirected to login page')
            setUsername(''),
            setPhonenumber(''),
            setEmail(''),
            setPassword(''),
            // setErrorMsg(''),
            setTimeout(()=>{
                setSuccessMsg('');
                navigate('/login');
            
            },2000)
      })
      .catch((error)=>{setErrorMsg(error.message)})
  })
  .catch((error) => {
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
            <form className={style.form} onSubmit={handleSubmit}>
                <p className={style.head}>Create Account</p>
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
                <label className={style.label}>Your Name</label>
                <input onChange={(e)=>setUsername(e.target.value)}  className={style.input} type="text" placeholder='First and Last name' />

                <label  className={style.label}>Email</label>
                <input onChange={(e)=>setEmail(e.target.value)} className={style.input} type="email" placeholder='Enter Your email' />

                <label className={style.label}>Mobile Number</label>
                <input onChange={(e)=>setPhonenumber(e.target.value)} className={style.input} type="number" placeholder='Enter Your number' />

                <label  className={style.label}>Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} className={style.input} type="password " placeholder='Enter Your password' />

                <label  className={style.label}>Address</label>
                <textarea onChange={(e)=>setAddress(e.target.value)} className={style.input} type="text " placeholder='Enter Your Address' >
                    </textarea>
                    <button type='submit' className={style.button}>Sign Up</button>
                    <div>
                        <span>Alredy have an Account</span>
                        <Link to='/login'>Sign IN</Link>
                    </div>
            </form>
        </div>
    </div>
  )
}
