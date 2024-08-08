import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { authService } from '../library/appwrite';
import Home from '../Home';

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
        <div className="background">
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
                   <>
                    <h1>welcome to appwrite auth tutorial with react </h1>
                    <h5>learn complete user auth with react</h5>
                    <div className="navigation-btns">
                     
                      <button type="button" onClick={()=> navigate("/signup")}>Register</button>
                      <button type="button" onClick={()=> navigate("/login")}>Login</button>
                    </div>
                   </> 
                )}
                </>
            )}
       
        </div>
    )
}

export default Intro