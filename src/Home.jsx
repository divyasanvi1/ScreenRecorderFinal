import React, { useState } from "react";
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
  const handleOptionChange = (event) => {
    console.log(event);
    setSelectedOption(event.target.value);
    setSelectedMediaType(event.target.value);
  };
 const handleAudio=()=>{
      setSelectedAudio(!selectAudio);
      setAudioEnabled(!selectAudio); 
 };

 
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


  return (
    <div className="flex flex-col min-h-screen bg-image">
      <div className="flex-grow flex flex-col items-center justify-center">
      <div className="flex flex-col  items-center second-div h-80% w-70%">
        <h1 className="text-white text-5xl border-b-4 border-grey-300">
          <GraphicEqIcon />
          Recorder App
        </h1>
        <div className="m-4">
          <p className="text-grey">
            Wish to record videos from your web browser!!! Try this Recorder App
            which records either audio and video from device default camera and
            mic or capture screen and you can download the recorded media in mp4
            file. Give it a try!!!
          </p>
        </div>
        <div className="m-10">
          <Button
            className="m-4 text-xl py-3 px-6 bg-blue-300"
            variant="contained"
          >
            <Link className="text-white" to="/app">
              Go to App
            </Link>
          </Button>
        </div>
        <div className="m-4 flex flex-row">
          <p>Check your browser compatibility by</p>
          <Button className="bg-green-500" href="https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API#browser_compatibility">
            clicking here
          </Button>
        </div>

        <div className="w-vw-60 max-h-screen m-6 bg-white flex flex-col items-center shadow-lg overflow-y-auto">
          <h1 className="text-xl m-1"><SettingsIcon/>Settings</h1>
          <div className="w-32rem h-1 bg-black mt-1 m-4"></div>
          <div className="flex flex-row ">
          <h3 className="text-xl mr-32 "><CameraIcon/>Camera Recording</h3>
            <Switch
              checked={selectedOption==="video"}
              value="video"
              onChange={handleOptionChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div className="flex flex-row">
          <h3 className="text-xl mr-36"><TvIcon/>Screen Capture</h3>
            <Switch
              checked={selectedOption==="screen"}
              value="screen"
              onChange={handleOptionChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div className="flex flex-row">
          <h3 className="text-xl mr-36"><VolumeUpIcon/>Audio Capture</h3>
            <Switch
              checked={selectAudio}
              onChange={handleAudio}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div> 
          <p>**Only Audio Recording is not Available</p>
        </div>
      </div>
      <footer className="footer bg-gray-800 text-white text-center py-4">
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </footer>
      </div>
     
    </div>
  );
}
export default Home;
