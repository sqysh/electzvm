import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAZE8vaJTJS9Lb43E-b6Fxn1gI_7gQs-iY',
  authDomain: 'electzvm.firebaseapp.com',
  projectId: 'electzvm',
  storageBucket: 'electzvm.firebasestorage.app',
  messagingSenderId: '691417934073',
  appId: '1:691417934073:web:35116ea87742f0038cda28',
  measurementId: 'G-1SM95V1CGV'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
