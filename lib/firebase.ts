import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "./firebase.config";
import { uuidv4 } from "@firebase/util";

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
  console.log(await getDoc(dbRef));
  return (await getDoc(dbRef)).data();
};

interface SubmissionData {
  address: string;
  product: string;
  image: string;
  description: string;
  quantity: number;
  price: number;
  maxPerUser: number;
  id: string;
}

export const uploadSubmissions = async (userId: any, data: SubmissionData) => {
  const uuid = uuidv4();

  data.id = uuid;

  const collectionRef = collection(db, `Submissions/${userId}/submission/`);

  addDoc(collectionRef, data);
};

export const fetchSubmissions = async (userId: any) => {
  const collectionRef = collection(db, `Submissions/${userId}/submission/`);

  const snapshot = await getDocs(collectionRef);

  return snapshot;
};
