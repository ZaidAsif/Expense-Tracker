// 'use client'


// import { Button, Container } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import { useState } from "react";
// import { signupWithEmailAndPassword } from "./firebase/firebaseAuth";
// import { useRouter } from "next/navigation";

// export default function Home() {

// const [email, setEmail] = useState();
// const [password, setPassword] = useState();

// const router = useRouter();


//   return (
//     <>
// <Container fixed style={{border: '1px solid grey', backgroundColor: '#cfe8fc', opacity: '.8', width: '40%', height: '300px', padding: '10px', textAlign: 'center', marginTop: '50px'}}>
// <h1 style={{color: 'red', opacity: '2', fontSize: '30px'}}>Sign-Up</h1>
//         <TextField id="standard-basic" label="Email" variant="standard" value={email} onChange={(e) => {setEmail(e.target.value)}} />
//         <br />
//         <br />
//         <TextField id="standard-basic" label="Password" variant="standard" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
//         <br />
//         <br />
//         <br />
//         <Button variant="contained" onClick={() => {signupWithEmailAndPassword(email, password), router.push('/verifyEmail')}}>Sign Up</Button>
//         <br />
//         <button style={{color: 'darkblue', textDecoration: 'underline'}} onClick={() =>  router.push('/login')}>Already have a account! Login here</button>
//       </Container>
//     </>
//   );
// }


// src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Container, TextField } from '@mui/material';
import { auth, signupWithEmailAndPassword } from './firebase/firebaseAuth';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { saveUser } from './firebase/firebaseFirestore';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const signupWithEmailAndPassword = (email: string, password: string) => {
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const {email, uid} = userCredential.user;
        sendEmailVerification(userCredential.user);
        router.push('/verifyEmail');
    })
    
    .catch((error) => {
        const errorCode = error.errorCode;
        const errorMessage = error.errorMessage;
        console.log(errorMessage, errorCode);
    })
}

  const handleSignup = async () => {
    try {
      await signupWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <body style={{backgroundColor: '#00bfa1'}}>
    <Container
      fixed
      style={{
        border: '1px solid grey',
        // backgroundColor: '#cfe8fc',
        backgroundColor: '#fff',
        opacity: '',
        width: '40%',
        height: '400px',
        padding: '0px',
        // textAlign: 'center',
        marginTop: '50px',
        // overflow: 'scroll'
      }}
    >
      <h1 style={{ color: '#fff', fontSize: '30px', backgroundColor: '#00a288', height: '70px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Sign-Up</h1>
      <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          columnGap: '50%',
          justifyContent: 'flex-start',
          alignContent: 'center',
          rowGap: '25px',
          paddingLeft: '10%',
          paddingTop: '10%'
        }}>

        <div style={{display: 'flex', marginLeft: '-5%'}}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAACUCAMAAACz6atrAAAAZlBMVEX///8AAAD8/Pz4+PiAgIDa2tr19fXn5+ckJCTW1tZKSkpubm7Ozs65ubmbm5vq6uqtra2lpaVbW1uOjo7CwsIvLy9gYGAfHx9AQEBzc3MpKSmzs7MYGBiHh4fh4eE7OzsQEBBSUlLFZoE6AAAGmklEQVR4nO1caZeqOBCVsMmObGqjqP//T05zfP3GQCXUDUHnnOn7vdOXJFV1a4m73S9+8Yv/BYQbFEPaZH3fZ006FIErPk1pRJFm+fnROjLaxznP0uKDvESad6ejo8Lx1OXpJzbQ9ctOyeoVXem7b2UWZN2exWzEvsuCtxFLPTavH3jpO+iJnneWU3T91levKKcmyUdbbmm4ooyNmY2Iy632zm1Oq5iNODWbGK1vds+m6Hz71HK1k8VwzC0zi+xs2hNdZJNaxve0HOwza8yKs1VmI86W3ElRWafmOJUVctllA2qOc7FwrtkmzEasJldvRs1x6lXMRL4hNcfJ14SwLXdthPnObbxrI4x3bntq3+TMqJVvoOY4pQm1dBu/NsUlxalF97dQc5w7HPmDdQoXQQymOW7yNmqOk2Ba+PBGao5zQKhFb6XmOMCVCx5v5vbgX7nrm6k5zvW/eqIjmKcamOtcc3dd8U7VxEZv57zxA1e4gd/k55vBCixbdfGcqmrCVz0hwgbf+j3HyaGara2ptKSo0aIOQ8uF4IEkqhqCD4aWW2h52756zVL9F7TW4sYVkKm1g3axATrXy1LKCmndaukYQsgmFjRwgHwpI9JA0a/Vr9cDS8XLl/d75xAdqLu8OxcoZTH1KqKfO52P84GP5CYhSEqkq2kCAiThZpYC8HM6OcK3BCA9AhK2Vr1Kw/9Cj01ttwPaOI1yEeBIkWo3cIuVh1rw7b1C6hiC74FjVWwA9C5WKQBMVeWY+KKyxRoYPt/GVBKT73iBvGgEELk6xRJ8D45Y6Qi+pd7pBQb2AlgivoNSEFp1ARVxtRuiAThOunoOeDeOAnlFyF+a9HBI3EObKgV/aTJOFw/+AuhgQMBf+kF99wAkWBvu240yhgho3qK9YyCiHqnIkPL/fks7dSjxhTTV0K4Akr1RTgTRzmeQG9IcpmQEUj5SShkagPiiYw5SbAAbFlAbhSo9QIVU7MJBxQIqMEDDWRfE+wZQjYXSONjgGOJFEA9ig1vMTxgE1n5azw2YBACnEShuYC215bqRAiyuUnaKdpm5/hcdyqFcANxm5glzuCNAxQV8SEVbLvsDpKD3BHWRMUsfwYgOBo11yjtF+DL3pZ3r8cb6hdJvQPL9L/S1B5NJCbJkAImFv6jUVfzBqGdHShyk1vuC9kBHCHEwmwSma774JPYT+8MwpSeGg+kUJF3OMJ8faL3+NZsOe898epr2mqvazZfbOe+btOnz823VQA5dgHPXLGkNihbD+pHs9TjR1DafxONA1ajEo5Z9qPQ01nJODs0QRtlV5bJjL4vCoTlA7Wdl8xkZkKrSn0tbZBS7OPvx724KxAf12BQ7/iWyAvHr6tXV7qtaDoop+6PV8ZlZXrzMn28EUZN7SRd3iZc30SxBFCXT52kKoqzvO5s8GQpY0jzRrMCw1LvpqHXG0HK6rHdZJz3Mn5T4j6XF9SWgpWTL6Dx/sHiu+iqLry+seutepwV6GXZcOBPtpxnNCUvQeqmljFcnlGw8ENJdmqXBCU0HBG1i0VAr2OXphEZl6mjvTwXVnbszymaKjfNsPeUTCnI6v/sDuk+BDlZroBgHZzlO6rsYg3N8kFqMd2V8YqTO3kO0EURZ6IsZb+amxB4NZmJek2c7gemFsHjZnphduZj9p9EkKbd7oiMmp7oHht3l0IJ2rziQYyMUDCWJbycgyJDudAX9aSHl0Ruf6QlsY0sKmKwlroFcI0U7xZMiMvznWsjSn1PSnkAKD0ebx5pJAtZEQ0zUksHXKSCfCHtuU8Jk+mobjQROhP1FKJPr9MPjPAxyVflhrCFkT+J8rbeIRtYRqPd4xSDHvfuqh7bjg1ZZVMerTmIalGODV49/kU4XWykhiknX4W6cogbeJBPp1j+xn2kt8n3MEopZwdaGJhQzqRnjwf8wyxEU7RwU6Uzff+WI7Yf5TOXf1txbCcM8L2w97uop0aRJbLjKPxA50Z661dHSzSuimsip9itd0RQRmVSerqWv+j/CL69kNyW2rbh2QU4XI/a37pAOQeCKJ0kh3CAY0kN3ozuB93yLX3GKdNWzW5V417qur15S6doUnvVNe0KkD81/5eCx5e+aNWt+U6ezq55nCBrTvXs0b/i5sMHDm5knz6JH0yIssRGGqrRZhlqml1e8F5xfFRTf7EBE/eLhnrw++tRPNoqwqbtTO29KHNtTV8uvoD+C7yiQ9XntnZOkS5KzV+d99h0pPk3rFd/BaoT4+F794hdG+Adcnl7Cj8dfiAAAAABJRU5ErkJggg==" alt="user-icon" style={{height: '50px'}}/>
      <TextField
        label="Email"
        variant="standard"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>

      <div style={{display: 'flex', marginLeft: '-5%'}}>
        <img src="data:image/png;base64,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" alt="user-icon" style={{height: '50px'}}/>
      <TextField
        label="Password"
        type="password"
        variant="standard"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>

      <Button variant="contained" style={{backgroundColor: '#00a188'}} onClick={handleSignup}>
        Sign Up
      </Button>
      <br />
      <button
        style={{ color: '#2fb7a4', textDecoration: 'underline' }}
        onClick={() => router.push('/login')}
      >
        Already have an account? Login here
      </button>
      </div>
    </Container>
    </body>
  );
}

