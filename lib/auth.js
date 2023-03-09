import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export function login() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(() => {
      // redirect to homepage after login
      window.location.href = "/";
    })
    .catch((error) => {
      console.error(error);
    });
}

export function logout() {
  signOut(auth)
    .then(() => {
      // redirect to homepage after logout
      window.location.href = "/";
    })
    .catch((error) => {
      console.error(error);
    });
}
