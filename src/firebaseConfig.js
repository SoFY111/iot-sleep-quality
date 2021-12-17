import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from './firebaseRealConfig'

import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';


const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app)

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firestoreAppDb = firebaseApp.firestore()


export default firestoreDb;
export { firestoreAppDb };
