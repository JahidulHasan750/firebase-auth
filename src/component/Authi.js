import React, { useState } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword , signInWithPopup, GoogleAuthProvider,signOut} from 'firebase/auth'


const Authi = () => {
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    console.log(auth?.currentUser?.email)
    const signIn =async()=>{
        try{
            await createUserWithEmailAndPassword(auth,email,password);
        } catch(e){
            console.error(e);
        }
        
    };
    const signInWithGoogle =async ( )=>{
        try{
            await signInWithPopup(auth, googleProvider);
        }
        catch(e){
            console.error(e)
        }
    }
    const logOut =async()=>{
        try{
            await signOut(auth);
        } catch(e){
            console.error(e);
        }
        
    };
    
    return (
        <div className='text-xl text-white font-normal pt-10 flex gap-4 justify-center '>
            <input className='bg-gray-600  rounded-md px-3 py-1' placeholder='email' onChange={(e)=> setEmail(e.target.value)}></input>
            <input type='password' className='bg-gray-600 rounded-md px-3 py-1' placeholder='password' onChange={(e)=> setPassword(e.target.value)}></input>
            <button onClick={signIn} className='bg-blue-600 text-white px-3 py-1 rounded-md'>Sign in</button>

            <button onClick={signInWithGoogle} className='bg-blue-600 text-white px-3 py-1 rounded-md'>Sign in with Google</button>
            <button onClick={logOut} className='bg-blue-600 text-white px-3 py-1 rounded-md'>Logout</button>
        </div>
    )
}

export default Authi