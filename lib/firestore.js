import {
  collection,
  Timestamp,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
  collectionGroup,
  limit,
  orderBy,
  startAfter,
  toDate,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import kebabCase from "lodash.kebabcase";

// auth

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

export const getUserData = async (uid) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  return docSnap.data();
};

export const getUserIdFromUsername = async (username) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[0]?.id || null;
};

export const getUserProfileData = async (uid) => {
  const userData = await getUserData(uid);

  // get post count
  const q = query(collection(db, "users", uid, "posts"));
  const querySnapshot = await getDocs(q);
  userData.postCount = querySnapshot.docs.length;

  // get heart count
  userData.heartCount = 0;
  querySnapshot.docs.forEach((doc) => {
    userData.heartCount += doc.data().hearts;
  });

  return userData;
};

// posts

export const createPost = async (post, postId) => {
  const readTime = (text) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(" ").length;
    const timeInMinutes = Math.ceil(wordCount / wordsPerMinute);
    return timeInMinutes;
  };

  const slug = kebabCase(post.postTitle);

  const userData = await getUserData(auth.currentUser.uid);

  const postData = {
    ...post,
    slug,
    dateCreated: Timestamp.fromDate(new Date()),
    dateEdited: Timestamp.fromDate(new Date()),
    authorName: userData.name,
    authorUsername: userData.username,
    authorPfp: userData.pfp,
    authorId: userData.uid,
    readTime: readTime(post.postContent),
    isPublished: true,
  };

  await setDoc(doc(db, "users", auth.currentUser.uid, "posts", postId), {
    ...postData,
  });

  window.location.href = "/";
};

export const checkSlugExists = async (slug) => {
  const q = query(
    collection(db, "users", auth.currentUser.uid, "posts"),
    where("slug", "==", slug)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const getPost = async (username, slug) => {
  const postsRef = collectionGroup(db, "posts");
  const q = query(
    postsRef,
    where("authorUsername", "==", username),
    where("slug", "==", slug)
  );
  const querySnapshot = await getDocs(q);

  const post = querySnapshot.docs[0].data();
  post.dateCreated = post.dateCreated.toDate();
  post.dateEdited = post.dateEdited.toDate();
  return post;
};

export const getPosts = async (isProfile) => {
  const LIMIT = 3;

  let posts = [];
  const postsRef = collectionGroup(db, "posts");
  const q = query(postsRef, orderBy("dateCreated", "desc"), limit(LIMIT));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() });
  });
  return {
    posts,
    lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
  };
};

export const getMorePosts = async (lastVisible, isProfile) => {
  const LIMIT = 2;

  let posts = [];
  const postsRef = collectionGroup(db, "posts");
  const q = query(
    postsRef,
    orderBy("dateCreated", "desc"),
    limit(LIMIT),
    startAfter(lastVisible)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() });
  });
  return {
    posts,
    lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
  };
};

export const getLastPost = async (isProfile) => {
  const postsRef = collectionGroup(db, "posts");
  const q = query(postsRef, orderBy("dateCreated"), limit(1));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs[0];
};
