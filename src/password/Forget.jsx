import React,{useState} from 'react'
import {authService} from '../library/appwrite'
import "./cover.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forget=()=>{
      const [email,setEmail]=useState('');

      const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await authService.recoverPassword(email);
            toast.success('Recovery email sent! Check your inbox.');
            alert('Recovery email sent! Check your inbox.');
            setEmail('');
        }
        catch (error) {
          toast.error('Failed to send recovery email. Please try again.'); 
            alert('Failed to send recovery email. Please try again.');
        }
      };
    return( 
      <div className="forgot">
        <div className="block-forget">
        <form onSubmit={handleSubmit}>
          <input 
           type="email"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
           placeholder="Enter your Email"
           required
          />
          <button className="sub" type="submit">Send Recovery Email</button>
        </form>
        </div>
        <ToastContainer />
        </div>
    );
};

export default Forget;