import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  DocumentData,
  WhereFilterOp,
  CollectionReference,
} from "firebase/firestore";
import { db } from "./config";

/**
 * Add a document to a collection
 */
export const addDocument = async <T extends DocumentData>(
  collectionName: string,
  data: T
) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

/**
 * Get a document by ID
 */
export const getDocument = async <T extends DocumentData>(
  collectionName: string,
  id: string
): Promise<(T & { id: string }) | null> => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...(docSnap.data() as T) };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    throw error;
  }
};

/**
 * Get all documents from a collection
 */
export const getCollection = async <T extends DocumentData>(
  collectionName: string
): Promise<Array<T & { id: string }>> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as T),
    }));
  } catch (error) {
    console.error("Error getting collection: ", error);
    throw error;
  }
};

/**
 * Update a document
 */
export const updateDocument = async <T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Partial<T>
) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

/**
 * Delete a document
 */
export const deleteDocument = async (collectionName: string, id: string) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    return true;
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

/**
 * Query documents with filters
 */
export const queryDocuments = async <T extends DocumentData>(
  collectionName: string,
  conditions: Array<{
    field: string;
    operator: WhereFilterOp;
    value: unknown;
  }> = [],
  orderByField: string | null = null,
  orderDirection: "asc" | "desc" = "asc"
): Promise<Array<T & { id: string }>> => {
  try {
    const collectionRef: CollectionReference = collection(db, collectionName);

    if (conditions.length > 0 || orderByField) {
      const queryConstraints = [];

      // Add conditions
      for (const condition of conditions) {
        queryConstraints.push(
          where(condition.field, condition.operator, condition.value)
        );
      }

      // Add ordering
      if (orderByField) {
        queryConstraints.push(orderBy(orderByField, orderDirection));
      }

      const q = query(collectionRef, ...queryConstraints);
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as T),
      }));
    } else {
      const querySnapshot = await getDocs(collectionRef);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as T),
      }));
    }
  } catch (error) {
    console.error("Error querying documents: ", error);
    throw error;
  }
};
