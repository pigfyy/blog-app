import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";

export const uploadImage = async (file) => {
  const storage = getStorage();
  const coverImgRef = ref(storage, `cover-images/${uuid()}`);

  await uploadBytes(coverImgRef, file);
  return await getDownloadURL(coverImgRef);
};
