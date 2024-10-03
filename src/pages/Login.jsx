import React from 'react'
import {useState} from'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
const Login =() =>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

     const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="background-signup">
          <div className="block-signup">
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
              <input
               type ={isPasswordVisible ? 'text' : 'password'}
              placeholder="Enter Password" 
              required 
              value={password} 
              onChange={(e)=>setPassword(e.target.value)}/>
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
              <br/>
              {error && <div className="error-msg">{error}</div>}
              <div className="submit-div">
               <p>
                  Don't have an account? <Link to="/signup">Register</Link>
               </p>
               <p>
                <Link to="/forgot-password">Forgot password?</Link>
               </p>
               <button type="submit" className="submit-btn" style={{ marginTop: '10px' }}>
                {loading?"...": "LOGIN"}
                </button>
                <button className="submit-btn" style={{ marginTop: '10px' }} onClick={() => navigate("/")}>GO to Home ➤</button>
              </div>
            </form>
            </div>
        </div>
    )
}

export default Login