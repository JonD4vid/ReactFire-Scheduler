import app from 'firebase/app';
import 'firebase/auth';
import { withRouter, Redirect} from 'react-router-dom';
import { compose } from 'recompose';


const firebaseConfig = {
    apiKey: "AIzaSyBGq-3MeR6v02D6y6rxE4drXzJl7uzNrjs",
    authDomain: "usc-scheduler.firebaseapp.com",
    databaseURL: "https://usc-scheduler.firebaseio.com",
    projectId: "usc-scheduler",
    storageBucket: "usc-scheduler.appspot.com",
    messagingSenderId: "273478421299",
    appId: "1:273478421299:web:a44d26987c27f5930b4c46",
    measurementId: "G-YETGSPR9DH"
  };


  class Firebase {
    constructor(props) {
      app.initializeApp(firebaseConfig);
      this.auth = app.auth();
      this.db = app.firestore();


    }

    
 // *** Auth API ***
 
 doSignInWithEmailAndPassword = (email, password) =>
 this.auth.signInWithEmailAndPassword(email, password);

 doSignOut = () => {
   this.auth.signOut().then(() => this.props.history.push('./'))
  }

 collection = (name) => this.db.collection(name)

  }

  
const FireConfig = compose(
  withRouter,
)(Firebase);
export default Firebase;
export { FireConfig };