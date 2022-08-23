import { initializeApp, getApps, getApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDgTSWeX8t0Q19bBuhdC_LuSN1nFavuU5g',
  authDomain: 'project-musicapp-ffae8.firebaseapp.com',
  projectId: 'project-musicapp-ffae8',
  storageBucket: 'project-musicapp-ffae8.appspot.com',
  messagingSenderId: '762543995593',
  appId: '1:762543995593:web:dbf7e4cfcf5dd911e5eb18'
}

const app = getApps.length ? getApp() : initializeApp(firebaseConfig)
const storage = getStorage(app)

export { app, storage }
