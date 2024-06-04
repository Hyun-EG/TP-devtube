import { collection, addDoc, deleteDoc, doc } from "firebase/firestore"
import { useReducer } from "react"
import { appFirestore, timestamp } from "../firebase/config"

const initState = {
  document: null,
  isPending: false,
  error: null,
  success: false
}

const storeReducer = (state, action) => {
  switch (action.type){
    case 'isPending':
      return { isPending: true, document: null, success: false, error: null }
    case 'addDoc':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'error':
      return { isPending: false, document: null, success: false, error: action.payload }
    case 'deleteDoc':
      return { isPending: false, document: action.payload, success: true, error: null }
    default :
      return state
  }
}

export const useFirestore = (transaction) => {

  const [response, dispatch] = useReducer(storeReducer, initState)

  // colRef : 컬렉션의 참조를 요구합니다.
  const colRef = collection(appFirestore, transaction);

  // 컬렉션에 문서를 추가합니다.
  const addDocument = async (doc) => {
    dispatch({ type: "isPending" });

    try {
      const createdTime = timestamp.fromDate(new Date());
      const docRef = await addDoc(colRef, { ...doc, createdTime });
      dispatch({ type: "addDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  } // await 함수이기 때문에 앞에 async를 붙임

  // 컬렉션에 문서를 제거합니다.
  const deleteDocument = async (id) => {
    dispatch({ type: "isPending" });

    try {
      const docRef = await deleteDoc(doc(colRef, id));
      dispatch({ type: "deleteDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  }
  return { addDocument, deleteDocument, response }
}