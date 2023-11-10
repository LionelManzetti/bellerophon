// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { ref, set, get, child, getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCOLBM6ziaISi63oTVjmEMMLcyZWS0tAEQ',
  authDomain: 'bellerophon-898f9.firebaseapp.com',
  projectId: 'bellerophon-898f9',
  storageBucket: 'bellerophon-898f9.appspot.com',
  messagingSenderId: '239009981867',
  appId: '1:239009981867:web:10c930c86add9ff3c01eee',
  databaseURL:
    'https://bellerophon-898f9-default-rtdb.europe-west1.firebasedatabase.app',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export const invalidatePuzzle = (puzzle) => {
  set(ref(database, 'puzzles/' + puzzle + '/'), false);
};

export const validatePuzzle = (puzzle) => {
  set(ref(database, 'puzzles/' + puzzle + '/'), true);
};

export const handlePuzzleStatus = (puzzle, setPuzzleStatusCallback) => {
  const dbRef = ref(database);
  get(child(dbRef, 'puzzles/' + puzzle + '/'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setPuzzleStatusCallback(snapshot.val());
      } else {
        setPuzzleStatusCallback(false);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
