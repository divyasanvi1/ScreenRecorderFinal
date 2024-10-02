import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { styled } from "@mui/system";
import { useState, useEffect, useRef } from "react";
import Button from '@mui/material/Button';
import bgImage from "./pages/Images/Intro1.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { gapi } from 'gapi-script';
import conf from "./library/conf";

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage:`url(${bgImage})`,
  backgroundSize: "cover",
  height: "100vh",
  padding: "3vw",
  boxSizing: "border-box",
  flexDirection: "column",
});

const VideoContainer = styled("div")({
  width: "80vw",
  paddingTop: "45vw", // 16:9 aspect ratio
  position: "relative",
  overflow: "hidden",
  borderRadius: "10px",
  backgroundColor: "rgba(173, 216, 230, 0.3)",
  maxWidth: "100%",
});

const VideoElement = styled("video")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  preload: "auto", 
  borderRadius: "10px",
});

function AppComponent({ selectedMediaType,audioEnabled }) {
  const [mediaStream, setMediaStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const videoRef = useRef(null);
  const downloadLinkRef = useRef(null);

  const handleDownload = async (mediaBlobUrl) => {
    if (mediaBlobUrl) {
      toast("Downloading started!");
      try {
        const response = await fetch(mediaBlobUrl);
        console.log("Download Response:", response);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Use the blob and URL as needed
        console.log("Download URL:", url);
        downloadLinkRef.current.href = url;
        downloadLinkRef.current.download = "recorded-media.mp4";
        downloadLinkRef.current.click();

        // Revoke the URL when done to release memory
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading media:", error);
      }
    }
  };

  

  console.log("app :", audioEnabled);
  useEffect(() => {
    // Request access to the user's camera when the component mounts
    if (selectedMediaType === "video" && audioEnabled===true) {
      console.log("1");
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          // Store the obtained MediaStream in the component's state
          setMediaStream(stream);
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
      }
       else if (selectedMediaType === "video" && audioEnabled===false) {
        console.log("11");
      navigator.mediaDevices
        .getUserMedia({ video: true,audio:false })
        .then((stream) => {
          // Store the obtained MediaStream in the component's state
          setMediaStream(stream);
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    } else if (selectedMediaType === "screen" && audioEnabled===true) {
      console.log("111");
      navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: true })
        .then((stream) => {
          // Store the obtained MediaStream in the component's state
          setMediaStream(stream);
        })
        .catch((error) => {
          console.error("Error accessing screen:", error);
          setErrorMessage("Unable to access the screen. Please check your browser settings.");
        });
    }
    else if (selectedMediaType === "screen" && audioEnabled===false ) {
      console.log("1111");
      navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: false })
        .then((stream) => {
          // Store the obtained MediaStream in the component's state
          setMediaStream(stream);
        })
        .catch((error) => {
          console.error("Error accessing screen:", error);
          setErrorMessage("Unable to access the screen. Please check your browser settings.");
        });
    } 
  }, [selectedMediaType, audioEnabled]);
  


  const handleStart = () => {
    setRecording(true);
    toast("Recording started!");
  };

  const handleStop = () => {
    // Stop the media stream when recording stops
    setRecording(false);
    toast("Recording stopped!");
    if (mediaStream) {
      console.log("stoppp");
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
  };
  useEffect(() => {
    if (mediaStream && videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);
//google
const initializeGapiClient = () => {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      clientId: conf.googleclientid, // Your client ID
      scope: 'https://www.googleapis.com/auth/drive.file',
    }).then(() => {
      console.log('GAPI client initialized');
    }).catch((error) => {
      console.error('Error initializing GAPI client:', error);
    });
  });
};

useEffect(() => {
  // Initialize Google API client
  initializeGapiClient();
}, []);

// Handle authentication click
const handleButtonClick = () => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${conf.googleclientid}&redirect_uri=${encodeURIComponent("https://screenrecorderfinal-1.onrender.com/app")}&response_type=token&scope=${encodeURIComponent("https://www.googleapis.com/auth/drive.file")}`;

  
  window.location.href = authUrl; // Redirect to Google's OAuth 2.0 authorization endpoint
};

// Handle the redirect after authentication
useEffect(() => {
  const hash = window.location.hash;
  if (hash) {
    const params = new URLSearchParams(hash.substring(1));
    const Token = params.get('access_token');
    
    if (Token) {
      setAccessToken(Token);
      console.log("Access Token:", accessToken);
      // Here, you can store the access token and use it for file uploads
      // For example, you could call your handleDriveUpload function here
    }
    else
    {
      toast.error('Upload failed.');
    }
  }
}, []);


useEffect(() => {
  if (accessToken) {
      console.log("Access Token:", accessToken);
      setAccessToken(Token);
      // Now you can use the accessToken for file uploads or any other logic
      // For example, call your handleDriveUpload function here if needed
  }
}, [accessToken]);
// Google Drive upload function
const handleDriveUpload = async (file) => {
  try {// Get access token
    if (!accessToken) {
      throw new Error('Access token is null');
    }

    const metadata = {
      name: 'recorded-media.mp4', // Filename
      mimeType: 'video/mp4', // File type
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file); // Append the media file

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: new Headers({ Authorization: `Bearer ${accessToken}` }),
      body: form,
    });

    if (response.ok) {
      const result = await response.json();
      toast.success(`File uploaded successfully: ${result.id}`);
    } else {
      throw new Error('Failed to upload file');
    }
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    toast.error('Upload failed.');
  }
};

// Handle media upload
const handleMediaUpload = async (mediaBlobUrl) => {
  if (mediaBlobUrl) {
    try {
      const response = await fetch(mediaBlobUrl);
      const blob = await response.blob();
      handleDriveUpload(blob);
    } catch (error) {
      console.error('Error fetching mediaBlobUrl:', error);
    }
  }
};

// Handle button click to open authentication

  return (
    <>
      <ReactMediaRecorder
        video={selectedMediaType === "video"}
        screen={selectedMediaType === "screen"}
        audio={audioEnabled}
        onStop={handleStop}
        onStart={handleStart}
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <Container>
            
              <VideoContainer>
                {mediaStream  && <VideoElement ref={videoRef} autoPlay />}

                {mediaBlobUrl && (
                  <VideoElement src={mediaBlobUrl} controls loop />
                )}
              </VideoContainer>
               
              <div className="flex justify-center items-center m-20">
              <button onClick={handleButtonClick}>Open Authentication Form</button>
                {status==="idle" && (
                  <button
                    onClick={() => {
                      startRecording();
                    }}
                    className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                   
                    Start Recording
                  </button>
                )}
                {recording && (
                  <button
                    onClick={() => {
                      stopRecording();
                      setRecording(false);
                      
                    }}
                    className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Stop Recording
                  </button>
                )}
                {status === "stopped" && mediaBlobUrl && (
                  <>
                  <Button variant="contained" onClick={() => handleDownload(mediaBlobUrl)}>
                    Download Recorded Media
                  </Button>
                  <Button variant="contained" onClick={() => handleMediaUpload(mediaBlobUrl)}>
                    Upload to Google Drive
                  </Button>
                </>
                )}
                
                <a ref={downloadLinkRef} style={{ display: "none" }} />
              </div>
            <ToastContainer />
          </Container>
        )}
      />
    </>
  );
}

export default AppComponent;
