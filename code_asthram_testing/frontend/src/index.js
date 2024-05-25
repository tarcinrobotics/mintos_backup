import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AnimLoader from './component/AnimLoader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import './Login.css';
import { AuthProvider } from './AuthProvider.js';

const App = () => {
  const [isSuperuser, setIsSuperuser] = useState(false);
  console.log('isSuperuser:', isSuperuser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <AuthProvider> {/* Wrap the Routes with the AuthProvider */}
            <Login setIsSuperuser={setIsSuperuser} />
          </AuthProvider>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<AnimLoader />} />
      </Routes>
    </BrowserRouter>
  );
};
if ('serviceWorker' in navigator && 'PushManager' in window) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
              console.log('Service Worker registered with scope:', registration.scope);
              checkSubscription(registration);
          })
          .catch(error => {
              console.error('Service Worker registration failed:', error);
          });
  });
}

const publicKey = 'BOIvf15GoDqqKXv8UmDjpYdhMkY8mNT5ISD7K_IahKhjUL2FsguR_Cfoddfitt6useI7RjgBs1CgvwQxwK8KDbA'; // Use your VAPID public key here

async function subscribeUserToPush(registration) {
  const convertedVapidKey = urlBase64ToUint8Array(publicKey);

  try {
      const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
      });
      console.log('User is subscribed:', subscription);

      await fetch('/subscribe', {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
              'Content-Type': 'application/json'
          }
      });

      localStorage.setItem('isSubscribedToPush', 'true');
  } catch (error) {
      console.error('Failed to subscribe the user:', error);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function checkSubscription(registration) {
  registration.pushManager.getSubscription()
      .then(subscription => {
          if (subscription === null && localStorage.getItem('isSubscribedToPush') !== 'true') {
              subscribeUserToPush(registration);
          } else {
              console.log('User is already subscribed');
          }
      })
      .catch(error => {
          console.error('Error during getSubscription()', error);
      });
}

ReactDOM.render(<App />, document.getElementById('root'));
reportWebVitals();

