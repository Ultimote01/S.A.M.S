 let wakeLock = null;

 async function requestWakeLock() {
  try {
   
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Screen is kept awake!');
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }

}


 export function handelLockAndAwakeScreen(quest){
    
    console.log(wakeLock)
    if (quest === 'woke' && wakeLock !== null){
        document.addEventListener('visibilitychange', async () => {
      if (wakeLock !== null && document.visibilityState === 'visible') {
        await requestWakeLock();
      }
    });
    }
    else if (quest === 'normal') {
         releaseWakeLock();
    }
     
 }


function releaseWakeLock() {

  if (wakeLock !== null) {
    wakeLock.release();
    wakeLock = null;
    console.log('Wake lock released.');
  }

}

