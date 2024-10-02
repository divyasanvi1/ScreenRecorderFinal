import React,{useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { authService } from '../library/appwrite'
import "./cover.css";
const Recover=()=>{
    const [newPassword,setNewPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [searchParams]=useSearchParams();
    const userId=searchParams.get('userId');
    const secret=searchParams.get('secret');

    const handleSubmit=async(e)=>{
       e.preventDefault();
       if(newPassword!==confirmPassword)
       {
        alert('password do not match');
        return;
       }

       try{
          await authService.updateRecovery(userId,secret,newPassword,confirmPassword);
          alert('Password updated successfully!');
       }
       catch(error){
        console.log('Failed to update password:', error);
        alert('Error updating password. Please try again.');
       }
    }
    return (
     <div className="forgot">
      <div className="block-forget">
        <form onSubmit={handleSubmit} className="form">
            <input
             type="password"
             value={newPassword}
             onChange={(e)=>setNewPassword(e.target.value)}
             placeholder="Enter new Password"
             required
            />
            <input
             type="password"
             value={confirmPassword}
             onChange={(e)=>setConfirmPassword(e.target.value)}
             placeholder="Enter confirm Password"
             required
            />
            <button className="sub" type="submit">Set Password</button>
        </form>
        </div>
     </div>
    );
};

export default Recover;