import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";

export const uploadImage = async (file, path) => {
  const storage = getStorage();
  const coverImgRef = ref(storage, `${path}/${uuid()}`);

  await uploadBytes(coverImgRef, file);
  return await getDownloadURL(coverImgRef);
};
