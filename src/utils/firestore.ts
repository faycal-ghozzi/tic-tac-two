import { db } from "./firebase";
import { doc, setDoc, getDoc, updateDoc, increment } from "firebase/firestore";

export const initializeUserScore = async (userId: string) => {
  const userDoc = doc(db, "scores", userId);
  const docSnapshot = await getDoc(userDoc);
  if (!docSnapshot.exists()) {
    await setDoc(userDoc, { wins: 0, losses: 0, ties: 0 });
  }
};

export const updateUserScore = async (
  userId: string,
  result: "win" | "loss" | "tie"
) => {
  const userDoc = doc(db, "scores", userId);
  const updates = {
    win: { wins: increment(1) },
    loss: { losses: increment(1) },
    tie: { ties: increment(1) },
  };
  await updateDoc(userDoc, updates[result]);
};

export const fetchUserScore = async (userId: string) => {
  const userDoc = doc(db, "scores", userId);
  const docSnapshot = await getDoc(userDoc);
  if (docSnapshot.exists()) {
    return docSnapshot.data();
  }
  return { wins: 0, losses: 0, ties: 0 };
};
