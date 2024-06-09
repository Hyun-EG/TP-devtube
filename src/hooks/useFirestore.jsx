import {
  collection,
  addDoc,
	updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { useReducer } from 'react';
import { db } from '../firebase/config';

const initState = {
  document: null,
  isPending: false,
  error: null,
  success: false
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case 'isPending':
      return { isPending: true, document: null, success: false, error: null };
    case 'addDoc':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null
      };
    case 'updateDoc':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null
      };
    case 'deleteDoc':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null
      };
    case 'error':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const useFirestore = (transaction) => {
  const [response, dispatch] = useReducer(storeReducer, initState);

  // colRef: 컬렉션의 참조 요구
  const colRef = collection(db, transaction);

  // 컬렉션에 문서 추가
  const addDocument = async (doc) => {
    dispatch({ type: 'isPending' });

    try {
      const createdTime = serverTimestamp();
      const docRef = await addDoc(colRef, { ...doc, createdTime });
      dispatch({ type: 'addDoc', payload: docRef });
    } catch (error) {
      dispatch({ type: 'error', payload: error.message });
    }
  };

  // 컬렉션에 문서 업데이트
  const updateDocument = async (id, updatedDoc) => {
    dispatch({ type: 'isPending' });

    try {
      const docRef = doc(colRef, id);
      await updateDoc(docRef, updatedDoc);
      dispatch({ type: 'updateDoc', payload: { id, ...updatedDoc } });
    } catch (error) {
      dispatch({ type: 'error', payload: error.message });
    }
  };

  // 컬렉션에 문서 제거
  const deleteDocument = async (id) => {
    dispatch({ type: 'isPending' });

    try {
      await deleteDoc(doc(colRef, id));
      dispatch({ type: 'deleteDoc', payload: id });
    } catch (error) {
      dispatch({ type: 'error', payload: error.message });
    }
  };

  return { addDocument, updateDocument, deleteDocument, response };
};
