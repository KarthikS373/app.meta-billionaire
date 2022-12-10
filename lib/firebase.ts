import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
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
  const docRef = doc(db, `Profiles/${userId}/`);

  setDoc(docRef, data);
};

export const fetchFirestoreData = async (userId: any) => {
  const docRef = doc(db, `Profiles/${userId}/`);
  console.log(await getDoc(docRef));
  return (await getDoc(docRef)).data();
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
  status: string;
}

export const uploadSubmissions = async (userId: any, data: SubmissionData) => {
  const uuid = uuidv4();

  data.id = uuid;
  data.status = "pending";

  const docRef = doc(db, `Submissions/${userId}/`);
  const collectionRef = collection(db, `Submissions/${userId}/submission/`);

  setDoc(docRef, { exist: true });
  addDoc(collectionRef, data);
};

export const fetchSubmissions = async (userId: any) => {
  const collectionRef = collection(db, `Submissions/${userId}/submission/`);

  const snapshot = await getDocs(collectionRef);

  return snapshot;
};

export const fetchAllSubmissions = async () => {
  const response: Array<any> = [];

  const primeCollectionRef = collection(db, `Submissions`);
  const primeSnapshot = await getDocs(primeCollectionRef);

  return primeSnapshot;
};

export const setSubmissionStatus = async (
  userId: any,
  token: string,
  status: string
) => {
  const docRef = doc(db, `Submissions/${userId}/submission/${token}`);

  updateDoc(docRef, {
    status: status,
  });
};

interface Tag {
  value: string;
  label: string;
}
export const setNetworkTags = async (userId: any, tags: Array<Tag>) => {
  for (let tag of tags) {
    const docRef = doc(db, `NetworkTag/${tag.label}/`);
    const collectionRef = collection(db, `NetworkTag/${tag.label}/network/`);

    setDoc(docRef, { exist: true });
    addDoc(collectionRef, { address: userId });
  }
};
