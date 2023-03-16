import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "./firebase";
import { v4 as uuid } from "uuid";

export const uploadImg = async (file, path) => {
  const storage = getStorage();
  const coverImgRef = ref(storage, path);

  await uploadBytes(coverImgRef, file);
  return await getDownloadURL(coverImgRef);
};

export const uploadCoverImg = async (file, postId) => {
  return await uploadImg(
    file,
    `users/${auth.currentUser.uid}/posts/${postId}/coverImg`
  );
};

export const uploadPostImg = async (file, postId) => {
  return await uploadImg(
    file,
    `users/${auth.currentUser.uid}/posts/${postId}/images/${uuid()}`
  );
};

export const uploadProfileImg = async (file) => {
  return await uploadImg(file, `users/${auth.currentUser.uid}/pfp`);
};
