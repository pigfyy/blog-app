import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import kebabCase from "lodash.kebabcase";

export const createPost = async (post) => {
  const readTime = (text) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(" ").length;
    const timeInMinutes = Math.ceil(wordCount / wordsPerMinute);
    return timeInMinutes;
  };

  const slug = kebabCase(post.postTitle);

  const postData = {
    ...post,
    slug,
    dateCreated: Timestamp.fromDate(new Date()),
    dateEdited: Timestamp.fromDate(new Date()),
    authorUsername: auth.currentUser.displayName,
    authorPfp: auth.currentUser.photoURL,
    authorId: auth.currentUser.uid,
    readTime: readTime(post.postContent),
    isPublished: true,
  };

  await addDoc(collection(db, "users", auth.currentUser.uid, "posts"), {
    ...postData,
  });

  window.location.href = "/";
};

export const createUser = async (userData) => {
  const userRef = doc(db, "users", userData.uid);
  await setDoc(userRef, userData);
};

export const checkUserExists = async (uid) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  return docSnap.exists();
};

export const checkUsernameExists = async (username) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};
