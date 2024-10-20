'use client';



// import { useRouter } from 'next/navigation';
// import { auth  } from '../firebase/firebaseAuth';
// import { Container, Button } from '@mui/material';
// import { useEffect, useState } from 'react';
// import { signOut } from 'firebase/auth';
// import { useAuthContext } from '@/context/authContext';
// import { db, fetchTodos } from '../firebase/firebaseFirestore';
// import { collection, onSnapshot, query, where } from 'firebase/firestore';

// export default function UserPanel() {
//   const router = useRouter();
//   const {currentUser, emailVerified, logout, todos, setTodos} = useAuthContext();

//   const [allTodos, setAllTodos] = useState()

//   useEffect(() => {
//     if (currentUser === null || emailVerified === false) {
//       router.push('/login');
//     }
//   }, [currentUser, router, emailVerified]);



// // useEffect(() => {
  
// //   fetchAllTodos();
  
// // }, [])

// // const fetchAllTodos = async () => {
// //   const fetchedData = await fetchTodos();
// //   console.log(fetchedData);
// //   setAllTodos(fetchedData);
// // }



//   return (
//     <body style={{backgroundColor: '#00bfa0'}}>
//     <Container
//       fixed
//       style={{
//         border: '1px solid grey',
//         backgroundColor: '#fff',
//         width: '40%',
//         height: '350px',
//         padding: '10px',
//         textAlign: 'center',
//         marginTop: '50px',
//       }}
//     >
//       <h2>Welcome, User</h2>
//       <br />
//       <h4>Your email is {currentUser?.email}</h4>
//       <br />
//       <Button
//         variant="contained"
//         style={{backgroundColor: '#10a388'}}
//         onClick={() => {
//           logout();
//         }}
//       >
//         Logout
//       </Button>
//       <br />
//       <br />
//       <Button
//         variant="contained"
//         style={{backgroundColor: '#7dccbe'}}
//         onClick={() => router.push('/changeEmail')}
//       >
//         Change Email
//       </Button>
//       <br />
//       <br />
//       <Button
//         variant="contained"
//         style={{backgroundColor: '#7dccbe'}}
//         onClick={() => router.push('/changePassword')}
//       >
//         Change Password
//       </Button>
//       <br />
//       <br />
//       <Button 
//         variant='contained' 
//         style={{backgroundColor: '#1cc1a6'}}
//         onClick={() => router.push('/expenses')}
//       >
//         Manage Expenses
//       </Button>
//     </Container>
//     </body>
//   );
// }





import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/authContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseAuth';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UserPanel() {
  const router = useRouter();
  const { currentUser, emailVerified } = useAuthContext();

  const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage dropdown visibility

  useEffect(() => {
    if (currentUser === null || emailVerified === false) {
      router.push('/login');
    }
  }, [currentUser, router, emailVerified]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle the dropdown visibility
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa' }}>
      {/* Navbar */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: '#343a40',
        }}
      >
        <div>
          <Link href="/home" style={{ color: '#fff', fontSize: '1.5rem' }}>
            Expense Tracker App
          </Link>
        </div>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            alignItems: 'center',
            margin: 0,
            padding: 0,
          }}
        >
          <li style={{ marginRight: '1rem', color: '#fff' }}>
            <button
              style={{ color: '#fff', textDecoration: 'none' }}
              onClick={() => router.push('/expenses')}
            >
              Manage Expenses
            </button>
          </li>
          <li style={{ position: 'relative' }}>
            {/* Profile Dropdown Trigger */}
            <button
              style={{
                color: '#fff',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={toggleDropdown}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginRight: '10px',
                }}
              >
                <img
                  src="data:image/png;base64,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"
                  alt="profile"
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            </button>

            {/* Dropdown Menu */}
            {dropdownVisible && (
              <ul
                style={{
                  position: 'absolute',
                  top: '50px',
                  right: 0,
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  borderRadius: '5px',
                  listStyle: 'none',
                  padding: '10px 0',
                  zIndex: 1000,
                }}
              >
                <li>
                  <button
                    style={{
                      display: 'block',
                      padding: '10px 20px',
                      textDecoration: 'none',
                      color: '#000',
                    }}
                    onClick={() => router.push('/changeEmail')}
                  >
                    Change Email
                  </button>
                </li>
                <li>
                  <button
                    style={{
                      display: 'block',
                      padding: '10px 20px',
                      textDecoration: 'none',
                      color: '#000',
                    }}
                    onClick={() => router.push('/changePassword')}
                  >
                    Change Password
                  </button>
                </li>
                <li>
                  <hr />
                </li>
                <li>
                  <button
                    style={{
                      display: 'block',
                      padding: '10px 20px',
                      textDecoration: 'none',
                      color: '#dc3545',
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Body Content */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <div
          style={{
            padding: '20px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            width: '400px',
            textAlign: 'center',
          }}
        >
          <h2>Welcome, {currentUser?.email}</h2>
          <p style={{ color: '#6c757d' }}>
            You can manage your account settings using the profile menu above.
          </p>
        </div>
      </div>
    </div>
  );
}
