let wakeLock = null;

async function requestWakeLock() {
  try {
   
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Screen is kept awake!');
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
}



document.addEventListener('visibilitychange', async () => {
  if (wakeLock !== null && document.visibilityState === 'visible') {
    await requestWakeLock();
  }
});


function releaseWakeLock() {
  if (wakeLock !== null) {
    wakeLock.release();
    wakeLock = null;
    console.log('Wake lock released.');
  }
}

