'use strict';

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyDHlcDpEDoTqEg3su0_4sm2ZJFcKeHqAXw",
authDomain: "chatsample-eaa7a.firebaseapp.com",
databaseURL: "https://chatsample-eaa7a.firebaseio.com",
projectId: "chatsample-eaa7a",
storageBucket: "chatsample-eaa7a.appspot.com",
messagingSenderId: "977664682828",
appId: "1:977664682828:web:8b6ac46625ed105ccf7de9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
const collection = db.collection('messages');

collection.add({
  message: 'test'
})
.then(doc => {
  console.log(`${doc.id} added!`);
})
.catch(error => {
  console.log(error);
});