import { auth } from "@/lib/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
} from "firebase/auth";

export const login = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const creationTime = user.metadata.creationTime;
      const lastSignInTime = user.metadata.lastSignInTime;
      if (creationTime === lastSignInTime) {
        window.location.href = "/new-user";
      } else {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      // redirect to homepage after logout
      window.location.href = "/";
    })
    .catch((error) => {
      console.error(error);
    });
};
