import React, {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useCallback
} from 'react';
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc
} from 'firebase/firestore';
import { db } from '../../firebase/config';

const LocalStorageUserData = () => {
	const userData = JSON.parse(localStorage.getItem('userData'));
	return userData ? userData.id : null;
};

// Create context
const EventsContext = createContext();

// Initial state
const initialState = {
	items: [],
	status: 'idle',
	error: null
};

// Reducer
const eventsReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_EVENTS_REQUEST':
			return { ...state, status: 'loading' };
		case 'FETCH_EVENTS_SUCCESS':
			return { ...state, status: 'succeeded', items: action.payload };
		case 'FETCH_EVENTS_FAILURE':
			return { ...state, status: 'failed', error: action.error };
		case 'ADD_EVENT_SUCCESS':
			return { ...state, items: [...state.items, action.payload] };
		case 'UPDATE_EVENT_SUCCESS':
			return {
				...state,
				items: state.items.map(event =>
					event.id === action.payload.id ? action.payload : event
				)
			};
		case 'DELETE_EVENT_SUCCESS':
			return {
				...state,
				items: state.items.filter(event => event.id !== action.payload)
			};
		default:
			return state;
	}
};

// Context Provider component
export const EventsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(eventsReducer, initialState);

	const fetchEvents = useCallback(async () => {
		dispatch({ type: 'FETCH_EVENTS_REQUEST' });

		try {
			const userId = LocalStorageUserData();
			if (!userId) {
				throw new Error('No logged-in user.');
			}

			const eventsCollection = collection(db, `users/${userId}/my-schedules`);
			const eventsSnapshot = await getDocs(eventsCollection);
			const events = eventsSnapshot.docs.map(doc => {
				const data = doc.data();
				return { id: doc.id, ...data, start: data.start, end: data.end };
			});

			dispatch({ type: 'FETCH_EVENTS_SUCCESS', payload: events });
		} catch (error) {
			dispatch({ type: 'FETCH_EVENTS_FAILURE', error: error.message });
		}
	}, []);

	const addEvent = async event => {
		try {
			const userId = LocalStorageUserData();
			if (!userId) {
				throw new Error('No logged-in user.');
			}

			const newEvent = {
				...event,
				start: event.start,
				end: event.end,
				note: event.note || '',
				colorbar: event.colorbar || ''
			};

			const docRef = await addDoc(
				collection(db, `users/${userId}/my-schedules`),
				newEvent
			);
			dispatch({
				type: 'ADD_EVENT_SUCCESS',
				payload: { ...newEvent, id: docRef.id }
			});
		} catch (error) {
			console.error('Error adding event:', error);
		}
	};

	const updateEvent = async event => {
		try {
			const userId = LocalStorageUserData();
			if (!userId) {
				throw new Error('No logged-in user.');
			}

			const updatedEvent = {
				...event,
				start: event.start,
				end: event.end,
				note: event.note || '',
				colorbar: event.colorbar || ''
			};

			await updateDoc(
				doc(db, `users/${userId}/my-schedules`, event.id),
				updatedEvent
			);
			dispatch({ type: 'UPDATE_EVENT_SUCCESS', payload: updatedEvent });
		} catch (error) {
			console.error('Error updating event:', error);
		}
	};

	const deleteEvent = async id => {
		try {
			const userId = LocalStorageUserData();
			if (!userId) {
				throw new Error('No logged-in user.');
			}

			await deleteDoc(doc(db, `users/${userId}/my-schedules`, id));
			dispatch({ type: 'DELETE_EVENT_SUCCESS', payload: id });
		} catch (error) {
			console.error('Error deleting event:', error);
		}
	};

	useEffect(() => {
		fetchEvents();
	}, [fetchEvents]);

	return (
		<EventsContext.Provider
			value={{ state, addEvent, updateEvent, deleteEvent }}>
			{children}
		</EventsContext.Provider>
	);
};

// Custom hook to use the Events context
export const useEvents = () => {
	return useContext(EventsContext);
};
