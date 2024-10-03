import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Front.css"
const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const navigate = useNavigate();
     const {signUp}=useAuth();
    const handleRegistration = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await signUp(email, password,name);
            toast.success("Registration successful!");
            console.log('User signed in successfully');
            navigate('/');
        } catch (err) {
            setError(err.message);
            toast.error(`Error: ${err.message}`);
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
            <h1>Create an account</h1>
            <form className="form" onSubmit={handleRegistration}>
                <label>Full Name</label>
                <input
                    type="text"
                    placeholder="Enter Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
                <label>Email</label>
                <input
                    type="text"
                    placeholder="Enter Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label>Password</label>
                <input
                    type={isPasswordVisible ? 'text' : 'password'} // Changed to "password" for security
                    placeholder="Enter Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <br />
                {error && <div className="error-msg">{error}</div>}
                <div className="submit-div">
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                    <button type="submit" className="submit-btn">
                        {loading ? "..." : "SIGN UP"}
                    </button>
                </div>
            </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;
