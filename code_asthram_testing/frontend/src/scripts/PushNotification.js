// Convert base64 string to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const publicKey = 'BOIvf15GoDqqKXv8UmDjpYdhMkY8mNT5ISD7K_IahKhjUL2FsguR_Cfoddfitt6useI7RjgBs1CgvwQxwK8KDbA'; // Use your VAPID public key here

export async function subscribeUserToPush() {
  const convertedVapidKey = urlBase64ToUint8Array(publicKey);

  try {
    const registration = await navigator.serviceWorker.ready;

    // Check if the user is already subscribed
    const existingSubscription = await registration.pushManager.getSubscription();
    if (existingSubscription) {
      console.log('User is already subscribed:', existingSubscription);
      localStorage.setItem('isSubscribedToPush', 'true');
      return existingSubscription;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    });
    console.log('User is subscribed:', subscription);

    // Send the subscription to your server
    await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Store subscription status in local storage
    localStorage.setItem('isSubscribedToPush', 'true');
    return subscription;
  } catch (error) {
    console.error('Failed to subscribe the user:', error);
    throw error;
  }
}
