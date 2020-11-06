import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.confiq';
import { userContext } from '../../App'
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    const [loggedInUser, setLogInUser] = useContext(userContext)
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    //learn new
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }
    //


    const hendleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var { displayName, email } = result.user;
            const signInUser = { name: displayName, email };
            setLogInUser(signInUser)
            history.replace(from)
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={hendleGoogleSignIn}>google sign in</button>
        </div>
    );
};

export default Login;