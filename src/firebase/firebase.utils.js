import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyCmT34-QDcyMXSR3iUSa-uCHHkxrrHcMrQ',
	authDomain: 'crown-db-b1e20.firebaseapp.com',
	projectId: 'crown-db-b1e20',
	storageBucket: 'crown-db-b1e20.appspot.com',
	messagingSenderId: '64390472539',
	appId: '1:64390472539:web:0bd6cd8966bc8079a0f07e',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
