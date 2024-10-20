import { useRouter } from "next/navigation";
import { app } from "./firebase-config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { saveUser } from "./firebaseFirestore";

export const auth = getAuth(app);


export function signupWithEmailAndPassword(email: string, password: string, rollNum: string, studentName: string) {
    const router = useRouter()
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const {email, uid} = userCredential.user;
        saveUser({email, uid, rollNum, studentName});
        sendEmailVerification(user);
        router.push('/verifyEmail');
    })
    
    .catch((error) => {
        const errorCode = error.errorCode;
        const errorMessage = error.errorMessage;
        console.log(errorMessage, errorCode);
    })
}

// export function loginWithEmailAndPassword(email: string, password: string) {
//     const router = useRouter()
//     signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         const user = userCredential.user;
//         router.push('/home')
//         // return user
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error(errorMessage, errorCode);

//     });
// }