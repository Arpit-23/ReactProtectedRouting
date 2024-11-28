import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

const userAuthContext = createContext();

export default function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [triger, setTriger] = useState(true);
  const [loading ,setLoading] = useState(false);

  console.log(loading);

  async function addTodo(todo) {
    const user = auth.currentUser;
    try {
      if (user) {
        setLoading(true)
        await addDoc(collection(db, "todos"), {
          uid: user.uid,
          name: todo,
          completed: false,
        });
        setLoading(false)
        setTriger((prev) => !prev);
      }
    } catch (e) {
      console.log("Error while adding todos:", e);
    }
  }

  async function getTodo() {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, "todos"),
          where("uid", "==", user.uid)
        );
        const data = await getDocs(q);
        const todos = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        return todos;
      }
    } catch (errror) {
      console.log("Error while fetching todos:", errror);
    }
  }

  async function updateTodo(id,completed) {
    try{
      setLoading(true)
      const ref = doc(db,"todos",id);
      await updateDoc(ref,{completed});
      setTriger((prev) => !prev);
      setLoading(false);
    }
    catch(error){
      console.log("Error while updateTodos ",error);
    }
  }

  async function deleteTodo(id) {
    try{
      setLoading(true)
      const ref = doc(db,"todos",id);
      await deleteDoc(ref);
      setTriger((prev) => !prev);
      setLoading(false);
    }
    catch(error){
      console.log("Error while deleting todos",error);
    }
  }

  async function logIn(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
  }
  async function signUp(formData) {
    let k = null;
    await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    ).then(() => {
      k = auth.currentUser;
      auth.signOut();
    });
    if (k) {
      await setDoc(doc(db, "Users", k.uid), {
        email: formData.email,
        name: formData.name,
        contactNumber: formData.contactNumber,
        gender: formData.gender,
        address: formData.address,
      });
    }
  }
  async function logOut() {
    return await signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut,addTodo,updateTodo,deleteTodo,getTodo,triger,loading}}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
