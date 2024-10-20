// src/app/change-email/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase/firebaseAuth';
import { sendEmailVerification, updateEmail } from 'firebase/auth';
import { Container, Button, TextField } from '@mui/material';
import { useAuthContext } from '@/context/authContext';

export default function ChangeEmail() {
    const [newEmail, setNewEmail] = useState('');
    const router = useRouter();
    const {currentUser, emailVerified} = useAuthContext();
  
    useEffect(() => {
      if (currentUser === null || emailVerified === false) {
        router.push('/login');
      }
    }, [currentUser, router, emailVerified]);

    const handleChangeEmail = async () => {
        try {
            //   if (currentUser) {
            await updateEmail(currentUser, newEmail);
            await sendEmailVerification(currentUser);
            alert("Remember to verify your email after changing it! A verification email has been sent to your new E-mail")
             router.push('/home');
            //   }
        } catch (error) {
            console.error('Error changing email:', error);
        }
    };

    const handleVerifyEmail = () => {
        sendEmailVerification(currentUser)
    }

    return (
        <body style={{backgroundColor: '#00bfa0'}}>
        <Container
            fixed
            style={{
                border: '1px solid grey',
                backgroundColor: '#fff',
                width: '40%',
                height: '250px',
                padding: '10px',
                textAlign: 'center',
                marginTop: '50px',
            }}
        >
            <h2>Change Email</h2>
            <TextField
                label="New Email"
                variant="standard"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
            />
            {/* <br />
            <br />
            <Button variant="contained" onClick={() => { handleVerifyEmail() }}>
                Verify Email
            </Button> */}
            <br />
            <br />
            <Button variant="contained" style={{backgroundColor: '#7dccbe'}} onClick={() => { handleChangeEmail() }}>
                Change Email
            </Button>
        </Container>
        </body>
    );
}
