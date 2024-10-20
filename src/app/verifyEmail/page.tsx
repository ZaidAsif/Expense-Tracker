// 'use client';

// import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { auth } from "../firebase/firebaseAuth";


// const verifyEmail = () => {
//         sendEmailVerification(auth.currentUser);
// }

// export default function VerifyEmail() {
//     const router = useRouter()

//     return (
//         <>
//         <h2>Hello user</h2>
//         <p>Please! check your email inbox for verification link</p>
//         <button style={{color: 'grey', textDecoration: 'underline'}} onClick={() => verifyEmail}>Click here! to get a email if you have'nt yet</button>
//         <br />
//         <button style={{color: 'blue', textDecoration: 'underline'}} onClick={() => router.push('/login')}>If your E-mail is verified login here</button>
//         </>
//     )
// }



// src/app/verify-email/page.tsx
'use client';

import { sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase/firebaseAuth';
import { useAuthContext } from '@/context/authContext';
import { useEffect } from 'react';
import { Container } from '@mui/material';


export default function VerifyEmail() {
    const router = useRouter();
    const {currentUser, emailVerified} = useAuthContext()

    useEffect(() => {
        if(emailVerified === true) {
            router.push('/home');
        }
    }, [currentUser, router, emailVerified])
    
    // const handleVerifyEmail = async () => {
    //   try {
    //     if (auth.currentUser) {
    //       await sendEmailVerification(auth.currentUser);
    //       alert('Verification email sent!');
    //     }
    //   } catch (error) {
    //     console.error('Error sending email:', error);
    //   }
    // }

    const handleVerifyEmail = () => {
        sendEmailVerification(currentUser);
    }

  return (
    
    <body style={{backgroundColor: '#00baaf'}}>
    <Container
      fixed style={{
        backgroundColor: '#00a58b ',
        width: '40%',
        height: '160px',
        padding: '10px',
        textAlign: 'center',
        marginTop: '50px',
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        gap: '10px',
        color: '#fff'
        }}>
      <h2>Hello user</h2>
      <p>Please! check your email inbox for the verification link.</p>
      <button
        style={{ color: 'brown', textDecoration: 'underline' }}
        onClick={handleVerifyEmail}
      >
        Click here! to get a new email if you haven’t yet
      </button>
      <br />
      <p>If you have verified your email. Reload this page</p>
      </Container>
      </body>
    
  );
}
