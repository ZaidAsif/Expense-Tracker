import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { app } from "./firebase-config";
import { auth } from "./firebaseAuth";
import { useAuthContext } from "@/context/authContext";



export const db = getFirestore(app);

type UserType = {
    email: string,
    uid: string,
}

export type ExpenseType = {
    userId: string | undefined,
    title: string,
    amount: string,
    category: string,
    date: string,
    note: string
}

export async function saveUser(user: UserType) {

    // let docRef = doc(db, 'collection name', 'docId')
    // await setDoc('where', 'what')

    try{
    let docRef = doc(db, 'users', user.uid)
    await setDoc(docRef, user);
    } catch (error) {
        console.log(error);
    }

}

export async function saveExpense(expenseTitle: string, expenseAmount: string, expenseCategory: string, currentDate: string, optionalNote: string) {
    let uid = auth.currentUser?.uid
    let expense:ExpenseType = {
        userId: uid,
        title: expenseTitle,
        amount: expenseAmount,
        category: expenseCategory,
        date: currentDate,
        note: optionalNote
    }

    try {
        let collectionRef = collection(db, 'expenses');
        await addDoc(collectionRef, expense);
    } catch (error) {
        console.log(error)
    }
}