
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import 'firebase/firestore'
import { getFirestore } from "firebase/firestore";





export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)