import { db, auth } from "../firebaseConfig/init";
import { createUserDocument } from "./create";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const serverError = (errorCode: any, errorMessage: any) => {
    return { errorCode: errorCode, errorMessage: errorMessage };
  };

const signUpUser = async (email: string, password: string) => {
let user = undefined;
await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        user = userCredential.user;
        console.log(user);
        createUserDocument(user);
    })
    .catch((error) => {
    console.log(serverError(error.code, error.message));
    });
return user;
};

const signUpUserGoogle = async () => {
let user = undefined;
const googleProvider = new GoogleAuthProvider();

await signInWithPopup(auth, googleProvider)
    .then((result) => {
        user = result.user;
        console.log(user);
        createUserDocument(user);
    })
    .catch((error) => {
        console.log(serverError(error.code, error.message));
    });
    return user;
}

const signInUser = async (email: string, password: string) => {
let user = undefined;
await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        user = userCredential.user;
        console.log(user);
    })
    .catch((error) => {
        console.log(serverError(error.code, error.message));
    });
return user;
};

export { signUpUser, signUpUserGoogle, signInUser };
