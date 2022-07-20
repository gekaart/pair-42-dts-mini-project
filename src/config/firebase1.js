import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  // apiKey: REACT_APP_FIREBASE_KEY,
  apiKey: "AIzaSyAjDd7FTA5t1hum0PSRb4G3DVCb4e8cwf8",
  authDomain: "dts-mini-project-933f4.firebaseapp.com",
  projectId: "dts-mini-project-933f4",
  storageBucket: "dts-mini-project-933f4.appspot.com",
  messagingSenderId: "1058919908536",
  appId: "1:1058919908536:web:3f29b9c8321c1e328e604d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const register = async (email, password) => {
  try {
    const userRegister = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userRegister.user);
  } catch (err) {
    console.log(err);
    console.log(err.code);
    console.log(err.message);
  }
};

const login = async (email, password) => {
  try {
    const userRegister = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userRegister.user);
  } catch (err) {
    console.log(err.code);
    console.log(err.message);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
  }
};

export { auth, register, login, logout };
