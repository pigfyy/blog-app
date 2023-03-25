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
  addDoc,
  deleteDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import kebabCase from "lodash.kebabcase";
import { renameTempCoverImg } from "./storage";

// auth

export const createUser = async (userData) => {
  const userRef = doc(db, "users", userData.uid);
  await setDoc(userRef, userData);

  window.location.href = "/";
};

export const checkUserExists = async (uid) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  return docSnap.exists();
};

export const checkUsernameExists = async (username) => {
  const q = query(
    collection(db, "users"),
    where("username", "==", username),
    where("uid", "!=", auth.currentUser.uid)
  );
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

export const getPostId = async (username, slug) => {
  const userId = await getUserIdFromUsername(username);
  const postsRef = collectionGroup(db, "posts");
  const q = query(
    postsRef,
    where("authorId", "==", userId),
    where("slug", "==", slug)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[0].id;
};

export const setPost = async (post, postId, defaultValues) => {
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
    dateCreated: defaultValues
      ? Timestamp.fromMillis(defaultValues.dateCreated)
      : Timestamp.fromDate(new Date()),
    dateEdited: Timestamp.fromDate(new Date()),
    authorId: auth.currentUser.uid,
    readTime: readTime(post.postContent),
  };

  if (defaultValues) {
    await updateDoc(
      doc(db, "users", auth.currentUser.uid, "posts", postId),
      postData
    );
  } else {
    await setDoc(
      doc(db, "users", auth.currentUser.uid, "posts", postId),
      postData
    );
  }

  window.location.href = "/";
};

export const deletePost = async (username, slug, postId) => {
  const batch = writeBatch(db);

  const heartDocuments = await getHeartDocuments(username, slug);
  heartDocuments.forEach(async (doc) => {
    batch.delete(doc.ref);
  });

  batch.delete(doc(db, "users", auth.currentUser.uid, "posts", postId));
  await batch.commit();
};

export const checkSlugExists = async (slug, postId) => {
  const q = query(
    collection(db, "users", auth.currentUser.uid, "posts"),
    where("slug", "==", slug)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.some((doc) => doc.id !== postId);
};

export const getPost = async (username, slug) => {
  const userId = await getUserIdFromUsername(username);
  const userData = await getUserData(userId);

  const postsRef = collectionGroup(db, "posts");
  const q = query(
    postsRef,
    where("authorId", "==", userId),
    where("slug", "==", slug)
  );
  const querySnapshot = await getDocs(q);

  const post = querySnapshot.docs[0].data();
  post.dateCreated = post.dateCreated.toMillis();
  post.dateEdited = post.dateEdited.toMillis();
  post.authorName = userData.name;
  post.authorUsername = userData.username;
  post.authorPfp = userData.pfp;
  return { ...post, postId: querySnapshot.docs[0].id };
};

export const getPosts = async (username) => {
  const LIMIT = 3;

  const userId = username ? await getUserIdFromUsername(username) : null;

  let posts = [];
  const postsRef = collectionGroup(db, "posts");

  const allQ = query(postsRef, orderBy("dateCreated", "desc"), limit(LIMIT));
  const limitedQ = query(
    postsRef,
    orderBy("dateCreated", "desc"),
    where("authorId", "==", userId),
    limit(LIMIT)
  );

  const querySnapshot = await getDocs(username ? limitedQ : allQ);

  for (const doc of querySnapshot.docs) {
    const userData = await getUserData(doc.data().authorId);
    posts.push({
      id: doc.id,
      ...doc.data(),
      authorName: userData.name,
      authorUsername: userData.username,
      authorPfp: userData.pfp,
    });
  }

  return {
    posts,
    lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
  };
};

export const getUserPosts = async (userId) => {
  const postsRef = collection(db, "users", userId, "posts");

  const querySnapshot = await getDocs(postsRef);

  let posts = [];
  for (const doc of querySnapshot.docs) {
    posts.push({
      ...doc.data(),
    });
  }

  return posts;
};

export const getMorePosts = async (lastVisible, username) => {
  const LIMIT = 3;

  const userId = username ? await getUserIdFromUsername(username) : null;

  let posts = [];
  const postsRef = collectionGroup(db, "posts");

  const allQ = query(
    postsRef,
    orderBy("dateCreated", "desc"),
    limit(LIMIT),
    startAfter(lastVisible)
  );
  const limitedQ = query(
    postsRef,
    orderBy("dateCreated", "desc"),
    where("authorId", "==", userId),
    limit(LIMIT),
    startAfter(lastVisible)
  );

  const querySnapshot = await getDocs(username ? limitedQ : allQ);

  for (const doc of querySnapshot.docs) {
    const userData = await getUserData(doc.data().authorId);
    posts.push({
      id: doc.id,
      ...doc.data(),
      authorName: userData.name,
      authorUsername: userData.username,
      authorPfp: userData.pfp,
    });
  }

  return {
    posts,
    lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
  };
};

export const getLastPost = async (username) => {
  const userId = username ? await getUserIdFromUsername(username) : null;

  const postsRef = collectionGroup(db, "posts");
  const allQ = query(postsRef, orderBy("dateCreated"), limit(1));
  const limitedQ = query(
    postsRef,
    orderBy("dateCreated"),
    where("authorId", "==", userId),
    limit(1)
  );
  const querySnapshot = await getDocs(username ? limitedQ : allQ);

  return querySnapshot.docs[0]?.data();
};

// hearts

export const editHeartCount = async (username, slug) => {
  const docId = await getHeartDocument(username, slug);
  !docId ? await addHeart(username, slug) : await removeHeart(docId);
};

export const getHeartDocument = async (username, slug, userId) => {
  const uid = userId || auth.currentUser?.uid;

  const postId = await getPostId(username, slug);

  const heartsRef = collection(db, "users", uid, "hearts");
  const q = query(heartsRef, where("postId", "==", postId));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[0]?.id || null;
};

export const getHeartDocuments = async (username, slug) => {
  const postId = await getPostId(username, slug);

  const heartsRef = collectionGroup(db, "hearts");
  const q = query(heartsRef, where("postId", "==", postId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs;
};

export const getHeartCount = async (username, slug) => {
  const postId = await getPostId(username, slug);

  const heartsRef = collectionGroup(db, "hearts");
  const q = query(heartsRef, where("postId", "==", postId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length;
};

export const getUserHeartCount = async (username) => {
  const userId = await getUserIdFromUsername(username);
  const posts = await getUserPosts(userId);

  const res = await (async () => {
    let count = 0;
    for (const post of posts) {
      const hearts = await getHeartCount(username, post.slug);
      count += hearts;
    }
    return count;
  })();

  return res;
};

export const addHeart = async (username, slug) => {
  const postId = await getPostId(username, slug);
  await addDoc(collection(db, "users", auth.currentUser.uid, "hearts"), {
    postId,
  });
};

export const removeHeart = async (docId) => {
  await deleteDoc(doc(db, "users", auth.currentUser.uid, "hearts", docId));
};
