import React, { useState,useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import "simplebar/dist/simplebar.min.css";
import { Link,useNavigate } from "react-router-dom";
import Switch from '@mui/material/Switch';
import CameraIcon from '@mui/icons-material/Camera';
import TvIcon from '@mui/icons-material/Tv';
import SettingsIcon from '@mui/icons-material/Settings';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import  {useAuth} from './AuthProvider';


function Home({ setSelectedMediaType,setAudioEnabled }) {
  const [selectedOption, setSelectedOption] = useState("video");
  const [selectAudio, setSelectedAudio]=useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleOptionChange = (event) => {
    console.log(event);
    setSelectedOption(event.target.value);
    setSelectedMediaType(event.target.value);
  };
 const handleAudio=()=>{
      setSelectedAudio(!selectAudio);
      setAudioEnabled(!selectAudio); 
 };

 const navigate=useNavigate();
 
 const { logout } = useAuth();
 const handleLogout = async (e) => {
  try {
    console.log( "HI");
    await logout(); // Call logout function from AuthProvider
    console.log( "tu");
  } catch (err) {
    console.error('Logout failed:', err);
  }
};

useEffect(() => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent)) {
    setIsMobile(true); // Set mobile flag if user is on a mobile device
  } else {
    setIsMobile(false); // Set desktop flag
  }
}, []);

  return (
    <div className="background-home">
      <div className="block-home">
      <div className="block2-home">
        <h1 className="text-black text-5xl custom-border">
          <GraphicEqIcon />
          Recorder App
        </h1>
        <div className="m-8">
          <p className="text-black">
            Wish to record videos from your web browser!!! Try this Recorder App
            which records either audio and video from device default camera and
            mic or capture screen and you can download the recorded media in mp4
            file. Give it a try!!!
          </p>
        </div>

          <button className="Go-app" onClick={()=>navigate("/app")}>GO TO APP ⎋</button>
        <div className="m-4 flex flex-row">
          <p>Check your browser compatibility by</p>
          <Button className="bg-green-500" href="https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API#browser_compatibility">
            clicking here
          </Button>
        </div>

        <div className="settings-container">
          <h1 className="settings-header"><SettingsIcon/>Settings</h1>
          <div className="divider"></div>
          <div className="setting-item">
          <h3 className="setting-text"><CameraIcon/>Camera Recording</h3>
            <Switch
              checked={selectedOption==="video"}
              value="video"
              onChange={handleOptionChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div className="setting-item">
          <h3 className="setting-text"><TvIcon/>Screen Capture</h3>
            <Switch
              checked={selectedOption==="screen"}
              value="screen"
              onChange={handleOptionChange}
              inputProps={{ "aria-label": "controlled" }}
              disabled={isMobile}
            />
          </div>
          <div className="setting-item">
          <h3 className="setting-text"><VolumeUpIcon/>Audio Capture</h3>
            <Switch
              checked={selectAudio}
              onChange={handleAudio}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div> 
          <p>**Only Audio Recording is not Available</p>
        </div>
      </div>
      <button className="Go-app" onClick={handleLogout}>LOGOUT</button>
      </div>
     
    </div>
  );
}
export default Home;
