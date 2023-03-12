import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

export const createPost = async (post) => {
  const readTime = (text) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(" ").length;
    const timeInMinutes = Math.ceil(wordCount / wordsPerMinute);
    return timeInMinutes;
  };

  const postData = {
    ...post,
    dateCreated: Timestamp.fromDate(new Date()),
    dateEdited: Timestamp.fromDate(new Date()),
    authorUsername: auth.currentUser.displayName,
    authorPfp: auth.currentUser.photoURL,
    authorId: auth.currentUser.uid,
    readTime: readTime(post.postContent),
  };

  await addDoc(collection(db, "users", auth.currentUser.uid, "posts"), {
    ...postData,
  });
};

export const createUser = async (userData) => {
  const userRef = doc(db, "users", userData.uid);
  await setDoc(userRef, userData);
};

export const checkUsernameExists = async (username) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};
