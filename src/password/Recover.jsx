import React,{useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { authService } from '../library/appwrite'
import "./cover.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Recover=()=>{
    const [newPassword,setNewPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [searchParams]=useSearchParams();
    const userId=searchParams.get('userId');
    const secret=searchParams.get('secret');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSubmit=async(e)=>{
       e.preventDefault();
       if(newPassword!==confirmPassword)
       {
         toast.error('Passwords do not match!');
        alert('password do not match');
        return;
       }

       try{
          await authService.updateRecovery(userId,secret,newPassword,confirmPassword);
          toast.success('Password updated successfully!');
          alert('Password updated successfully!');
       }
       catch(error){
        console.log('Failed to update password:', error);
        toast.error('Failed to update password. Please try again.');
        alert('Error updating password. Please try again.');
       }
    }

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
     <div className="forgot">
      <div className="block-forget">
        <form onSubmit={handleSubmit} className="form">
            <input
             type ={isPasswordVisible ? 'text' : 'password'}
             value={newPassword}
             onChange={(e)=>setNewPassword(e.target.value)}
             placeholder="Enter new Password"
             required
            />
            <button
          type="button"
          className="password-toggle"
          onClick={togglePasswordVisibility}
          style={{
            marginLeft: '10px',
            padding: '5px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          {isPasswordVisible ? '👁️' : '🙈'}
        </button>
            <input
             type ={isPasswordVisible ? 'text' : 'password'}
             value={confirmPassword}
             onChange={(e)=>setConfirmPassword(e.target.value)}
             placeholder="Enter confirm Password"
             required
            />
            <button
          type="button"
          className="password-toggle"
          onClick={togglePasswordVisibility}
          style={{
            marginLeft: '10px',
            padding: '5px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          {isPasswordVisible ? '👁️' : '🙈'}
        </button>
            <button className="sub" type="submit">Set Password</button>
        </form>
        </div>
        <ToastContainer />
     </div>
    );
};

export default Recover;