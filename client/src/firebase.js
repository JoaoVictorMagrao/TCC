// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyD6O20H31BazdHUsISYTw0wgSwggCArNGA",
  authDomain: "upload-imagem-alunos.firebaseapp.com",
  projectId: "upload-imagem-alunos",
  storageBucket: "upload-imagem-alunos.appspot.com",
  messagingSenderId: "311411592669",
  appId: "1:311411592669:web:eab1d58463034ac4713a34",
  measurementId: "G-F5J97V2NW4"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
