import React,{useState} from 'react'
import {authService} from '../library/appwrite'
import "./cover.css";

const Forget=()=>{
      const [email,setEmail]=useState('');

      const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await authService.recoverPassword(email);
            alert('Recovery email sent! Check your inbox.');
            setEmail('');
        }
        catch (error) {
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
        </div>
    );
};

export default Forget;