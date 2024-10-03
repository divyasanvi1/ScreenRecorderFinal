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
           style={{
            width: '100%',   // Responsive width based on parent container
            maxWidth: '400px', // Max width to avoid stretching too much on large screens
            height: 'auto',  // Adjust height automatically
            fontSize: '1rem', // Use relative font size
            padding: '10px',  // Padding stays the same
            marginRight: '10px', // Space between input and button
            borderRadius: '5px', // Rounded corners
            border: '1px solid #ccc', // Border styling
            boxSizing: 'border-box'  // Ensures padding and borders are included in the element's total width/height
          }}
          />
          <button className="sub" type="submit">Send Recovery Email</button>
        </form>
        </div>
        <ToastContainer />
        </div>
    );
};

export default Forget;