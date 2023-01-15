// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCueEZsT6ekWHeCUM_YeavF1UVV3Tg2JkU",
	authDomain: "the-storeroom.firebaseapp.com",
	projectId: "the-storeroom",
	storageBucket: "the-storeroom.appspot.com",
	messagingSenderId: "989100091538",
	appId: "1:989100091538:web:76d00b75967d6e657b5e4b",
	measurementId: "G-GDPJTPJC9S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
