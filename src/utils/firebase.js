import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAd02MB3dLKMJUDPyNzp1FEeey-o4g8R_I',
  authDomain: 'text-editor-1b9a7.firebaseapp.com',
  databaseURL: 'https://text-editor-1b9a7-default-rtdb.firebaseio.com',
  projectId: 'text-editor-1b9a7',
  storageBucket: 'text-editor-1b9a7.appspot.com',
  messagingSenderId: '89782388831',
  appId: '1:89782388831:web:825aca22acfa4335d1b3ea',
  measurementId: 'G-BLBFPXDE3L',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;