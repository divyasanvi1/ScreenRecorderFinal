import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { authService } from '../library/appwrite';
import Home from '../Home';
import './Front.css';

const Intro =({ setSelectedMediaType, setAudioEnabled }) =>{
    const [user,setUser]=useState(null);
    const[loading,setLoading]=useState(true);
    
    
    const navigate=useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await authService.getCurrentUser();
                setUser(res);
            } catch (e) {
                console.error(e); 
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

      
    return (
        <div>
            {loading?(
               <h5>Please Wait....</h5>
            ):(
               <> {user?
                (<div>
                     <Home
        setSelectedMediaType={setSelectedMediaType}
        setAudioEnabled={setAudioEnabled}
      />
                </div>):
                (
                   <div className="background-intro">
                     <nav className="navbar">
                   <div className="navbar-container">
                   <h1 className="logo">HOME</h1>
                   <div className="nav-links">
                     <a href="/about" className="nav-link">About</a>
                      <a href="/contact" className="nav-link">Contact</a>
                      <a href="https://github.com/divyasanvi1/ScreenRecorderFinal.git" target="_blank" rel="noopener noreferrer">
                       <button className="rate-github">Rate GitHub</button>
                        </a>
                     <button 
                       className="login-button" 
                       onClick={() => navigate("/login")}
                        >
                       LOGIN
                     </button>
                     </div>
                      </div>
                       </nav>
                    <div className="block">
                    <h1>Capture Your World, One Click at a Time! </h1>
                    <h5>Capture the Excitement!!</h5>
                    <p>Don’t let your best moments slip away! Record your screen with our intuitive software and share your gaming adventures, tutorials, and more with the world!</p>
                      <button className="get-started"  onClick={()=> navigate("/signup")}> Get Started 〉</button>
                    </div>
                   </div> 
                )}
                </>
            )}
       
        </div>
    )
}

export default Intro