import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
     const {signUp}=useAuth();
    const handleRegistration = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await signUp(email, password,name);
            console.log('User signed in successfully');
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="background">
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
                    type="password" // Changed to "password" for security
                    placeholder="Enter Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
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
    );
};

export default Signup;
