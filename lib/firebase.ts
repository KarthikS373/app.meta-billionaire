import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "./firebase.config";

export const uploadProfilePic = async (file: any, userId: any) => {
  const fileRef = ref(storage, `profile/${userId}.png`);

  const snapshot = await uploadBytes(fileRef, file);
  console.log(snapshot);

  const url = await getDownloadURL(fileRef);
  return url;
};

export const uploadData = async (userId: any, data: any) => {
  const dbRef = doc(db, `Profiles/${userId}/`);

  setDoc(dbRef, data);
};

export const fetchFirestoreData = async (userId: any) => {
  const dbRef = doc(db, `Profiles/${userId}/`);
  console.log((await getDoc(dbRef)));
  return (await getDoc(dbRef)).data();
};
