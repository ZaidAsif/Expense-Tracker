'use client';

import { app } from "@/app/firebase/firebase-config";
import { auth } from "@/app/firebase/firebaseAuth";
import { ExpenseType } from "@/app/firebase/firebaseFirestore";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { DocumentData} from 'firebase/firestore';
import { useRouter } from "next/navigation";
import { createContext, useContext, ReactNode, useEffect, useState } from "react";

// type UserType = {
//     displayName: string,
//     email: string | null,
//     uid: string
// }

type AuthContextType = {
    user: User | null
}


const AuthContext = createContext<AuthContextType | null>(null);



export default function AuthContextProvider({children}: {children: ReactNode}) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [emailVerified, setEmailVerified] = useState<boolean | undefined>(false);

    const [expenses, setExpenses] = useState<ExpenseType[] | []>([]);
    const [totalAmount, setTotalAmount] = useState<number | undefined>(0);







    const router = useRouter();
    const auth = getAuth(app);

    useEffect(() => {

        onAuthStateChanged(auth, (loggedInUser) => {
            setCurrentUser(loggedInUser);
            setEmailVerified(loggedInUser?.emailVerified);
        })
    }, []);

    const logout = async () => {
        await signOut(auth);
        setCurrentUser(null);
        setEmailVerified(false)
        router.push('/login')
    }


    return (
        <AuthContext.Provider value={{currentUser, logout, emailVerified, expenses, setExpenses, totalAmount, setTotalAmount}}>
            {children}
        </AuthContext.Provider>
    )
}   

export const useAuthContext = () => useContext(AuthContext);