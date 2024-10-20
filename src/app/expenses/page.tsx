
'use client';

import { Button, Container, FormControl, InputLabel, MenuItem, Select, Table, TableContainer, TextField, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { collection, onSnapshot, query, Unsubscribe, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseAuth";
import { useAuthContext } from "@/context/authContext";
import { db, ExpenseType } from "../firebase/firebaseFirestore";
import { onAuthStateChanged } from "firebase/auth";




export default function Expenses() {
    const router = useRouter();

    const { expenses, setExpenses } = useAuthContext();

    // let readExpensesRealtime: Unsubscribe
    // const realtimeFetch = () => {
    //     let collectionRef = collection(db, "expenses");
    //     let userUid = auth.currentUser?.uid;
    //     let condition = where('userId', '==', userUid);
    //     let q = query(collectionRef, condition);
    //     let expensesClone = [...expenses];

    //     readExpensesRealtime = onSnapshot(q, (querySnapshot) => {
    //         querySnapshot.docChanges().forEach((change) => {
    //             if (change.type === "added") {
    //                 let expense = change.doc.data();
    //                 //   todo.id = change.doc.id;
    //                 expensesClone.push(expense);
    //                 setExpenses([...expensesClone]);
    //                 // setTotalAmount(totalAmount + Number(change.doc.data().amount))
    //                 console.log(expenses);
    //             }
    //             if (change.type === "modified") {
    //                 console.log('edited');
    //             }
    //             if (change.type === "removed") {
    //             }
    //         })
    //     })
    // }

    // useEffect(() => {
    //     let detachOnAuthListener = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             realtimeFetch();
    //         }
    //     })

    //     return () => {
    //         if (readExpensesRealtime) {
    //             console.log('unmounted');
    //             readExpensesRealtime();
    //             detachOnAuthListener();
    //         }
    //     }
    // }, []);

    useEffect(() => {
        // Listener for real-time updates
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userUid = auth.currentUser?.uid;
                const collectionRef = collection(db, "expenses");
                const condition = where('userId', '==', userUid);
                const q = query(collectionRef, condition);

                const unsubscribeExpenses = onSnapshot(q, (querySnapshot) => {
                    const expensesArray = [];
                    querySnapshot.docChanges().forEach((change) => {
                        if (change.type === "added") {
                            const expense = change.doc.data();
                            expensesArray.push(expense);
                        }
                    });
                    setExpenses(expensesArray);  // Update state with new expenses
                });

                // Detach expense listener on component unmount
                return () => {
                    console.log('Unsubscribing from expenses listener');
                    unsubscribeExpenses();
                };
            }
        });

        // Clean up the auth listener when the component unmounts
        return () => {
            console.log('Unsubscribing from auth listener');
            unsubscribeAuth();
        };
    }, [setExpenses]);

    return (
        <body style={{ backgroundColor: '#00bfa1' }}>
            {/* <Container fixed style={{
                border: '1px solid #fff',
                // backgroundColor: '#cfe8fc',
                backgroundColor: '#fff',
                width: '100%',
                height: '550px',
                // textAlign: 'center',
                marginTop: '50px',
                overflow: 'scroll',
                display: 'flex',
                flexWrap: 'wrap',
                // columnGap: '50%',
                justifyItems: 'center',
                flexDirection: 'column',
                alignItems: 'center '
                // gap: '20%'
                // rowGap: '25px',
                // paddingLeft: '20%',
                // paddingTop: '5%'
            }}> */}

            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                // columnGap: '50%',
                                justifyItems: 'center',
                                flexDirection: 'column',
                                alignItems: 'center '
            }}>

                <h2 style={{ color: '#fff', fontSize: '25px', backgroundColor: 'grey', height: '40px', textAlign: 'center', width: '100%' }}>Your Expenses</h2>

                <br />

                <Button
                    variant="contained"
                    style={{
                        backgroundColor: '#2f7c70',
                        width: '30%',
                        height: '35px'
                    }}
                    onClick={() => router.push('/monthlyExpense')}
                >
                    See monthly expenses
                </Button>

                <br />

                <Button
                    variant="contained"
                    style={{
                        backgroundColor: '#2f7c70',
                        width: '8%',
                        height: '45px',
                        fontSize: '13px',
                        textAlign: 'center'
                    }}
                    onClick={() => router.push('/addExpense')}
                >Add Expense</Button>

                <br />

                {/* <table style={{}}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Note</th>
                        </tr>
                    </thead>

                </table> */}

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Note</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expenses.map(({ title, amount, category, date, note }: ExpenseType, index: number) => (
                                <TableRow
                                    key={title + index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {title}
                                    </TableCell>
                                    <TableCell align="right">{amount}</TableCell>
                                    <TableCell align="right">{category}</TableCell>
                                    <TableCell align="right">{date}</TableCell>
                                    <TableCell align="right">{note}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <br />

                </div>

            {/* </Container> */}
        </body>
    )
}