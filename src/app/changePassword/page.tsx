// src/app/change-password/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase/firebaseAuth';
import { updatePassword } from 'firebase/auth';
import { Container, Button, TextField } from '@mui/material';
import { useAuthContext } from '@/context/authContext';

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();
  const {currentUser, emailVerified} = useAuthContext();

  useEffect(() => {
    if (currentUser === null || emailVerified === false) {
      router.push('/login');
    }
  }, [currentUser, router, emailVerified]);

  const handleChangePassword = async () => {
    try {
      if (currentUser !== null) {
        await updatePassword(currentUser, newPassword).then(() => {
          // Update successful.
        }).catch((error) => {
          // An error ocurred
          // ...
        });
        router.push('/home');
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <body style={{backgroundColor: '#00bfa0'}}>
    <Container
      fixed
      style={{
        border: '1px solid grey',
        backgroundColor: '#fff',
        width: '40%',
        height: '200px',
        padding: '10px',
        textAlign: 'center',
        marginTop: '50px',
      }}
    >
      <h2>Change Password</h2>
      <TextField
        label="New Password"
        type="password"
        variant="standard"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <br />
      <br />
      <Button variant="contained" style={{backgroundColor: '#7dccbe'}} onClick={handleChangePassword}>
        Change Password
      </Button>
    </Container>
    </body>
  );
}
