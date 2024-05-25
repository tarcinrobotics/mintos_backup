// AnimLoader.js
import React, { useState, useEffect } from 'react';
import SyncLoader from "react-spinners/SyncLoader";
import './animloader.css';
import App from '../App'; // Import the App component
import MainBack from './code_asthram_logo.gif';
import { subscribeUserToPush } from '../scripts/PushNotification.js'; // Update the path according to your project structure

function AnimLoader() {
    const [loading, setLoading] = useState(true);
    const [showPushPrompt, setShowPushPrompt] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setShowPushPrompt(true);
        }, 2200);
    }, []);

    const handleSubscribe = () => {
        subscribeUserToPush();
        setShowPushPrompt(false);
    };

    return (
        <div>
            {loading ? (
                <div className='loader'>
                    <img src={MainBack} style={{ height: "100vh", width: "100%" }} alt='Loading...' />
                </div>
            ) : (
                <div>
                    <App />
                    {showPushPrompt && (
                        <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
                            <p>Would you like to subscribe to notifications?</p>
                            <button onClick={handleSubscribe}>Yes</button>
                            <button onClick={() => setShowPushPrompt(false)}>No</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AnimLoader;
