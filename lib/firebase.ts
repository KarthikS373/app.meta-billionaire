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
import { auth, db, storage } from "./firebase.config";
import { uuidv4 } from "@firebase/util";
import { signInWithEmailAndPassword } from "firebase/auth";

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
  status: string;
}

export const uploadSubmissions = async (userId: any, data: SubmissionData) => {
  const uuid = uuidv4();

  data.id = uuid;
  data.status = "pending";

  const dbRef = doc(db, `Submissions/${userId}/`);
  const collectionRef = collection(db, `Submissions/${userId}/submission/`);

  setDoc(dbRef, { exist: true });
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

export const checkAdmin = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return userCredential;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(error);
    });
};

export const addContent = async (
  name: string,
  imageUrl: string,
  videoUrl: string,
  videoPlatform: string,
  category: "podcast" | "ama" | "value",
  speaker: string
) => {
  const collectionRef = collection(db, `Content`);

  return addDoc(collectionRef, {
    name: name,
    image: imageUrl,
    video: videoUrl,
    platform: videoPlatform,
    category: category,
    speakers: speaker,
  });
};

export const fetchContent = async () => {
  const collectionRef = collection(db, `Content`);

  const snapshot = await getDocs(collectionRef);

  return snapshot;
};
