import React from 'react'
import {useState} from'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { authService } from '../library/appwrite'; 
import { useAuth } from '../AuthProvider';
const Login =() =>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

     //event state
     const[loading,setLoading]=useState(false);
     const[error,setError]=useState(null);
    
     //navigate
     const navigate=useNavigate();
     const { login } = useAuth();
     const handleLogin=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
          await login(email, password);
          console.log('User logged in successfully');
          navigate('/');
      } catch (err) {
          setError(err.message);
      } finally {
          setLoading(false);
      }
     };

    return (
        <div className="background">
             <h1>Login!!!</h1>
            <form className="form" onSubmit={handleLogin}>
              <label>Email</label>
              <input type ="text" 
              placeholder="Enter Email"
               required 
               value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
              <br/>
              <label>Password</label>
              <input type ="text" 
              placeholder="Enter Password" 
              required 
              value={password} 
              onChange={(e)=>setPassword(e.target.value)}/>
              <br/>
              {error && <div className="error-msg">{error}</div>}
              <div className="submit-div">
               <p>
                  Don't have an account? <Link to="/signup">Register</Link>
               </p>
               <button type="submit" className="submit-btn">
                {loading?"...": "LOGIN"}
                </button>
              </div>
            </form>
        </div>
    )
}

export default Login