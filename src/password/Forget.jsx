import React,{useState} from 'react'
import {authService} from '../library/appwrite'

const Forget=()=>{
      const [email,setEmail]=useState('');

      const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await authService.recoverPassword(email);
            alert('Recovery email sent! Check your inbox.');
        }
        catch (error) {
            alert('Failed to send recovery email. Please try again.');
        }
      };
    return( 
        <forrm onSubmit={handleSubmit}>
          <input 
           type="email"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
           placeholder="Enter your Email"
           required
          />
          <button type="submit">Send Recovery Email</button>
        </forrm>
    );
};

export default Forget;