'use client'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { db, ExpenseType } from "../firebase/firebaseFirestore"; // Import firebase functionality
import { collection, query, where, onSnapshot, Unsubscribe } from "firebase/firestore";
import { auth } from "../firebase/firebaseAuth";
import MonthTable from "@/component/monthTable";
import { onAuthStateChanged } from "firebase/auth";

export default function EachMonthExpenses() {
    const [groupedExpenses, setGroupedExpenses] = useState({});

    let readExpensesRealtime: Unsubscribe;
    const realtimeFetch = () => {
        let collectionRef = collection(db, "expenses");
        let userUid = auth.currentUser?.uid;
        let condition = where('userId', '==', userUid);
        let q = query(collectionRef, condition);
        readExpensesRealtime = onSnapshot(q, (querySnapshot) => {
            const expensesArray: ExpenseType[] | [] = [];
            querySnapshot.forEach((doc) => {
                expensesArray.push(doc.data());
            });
            // Group expenses by month and set state
            const grouped = groupExpensesByMonth(expensesArray);
            setGroupedExpenses(grouped);
        });
    }

    useEffect(() => {
        let detachOnAuthListener = onAuthStateChanged(auth, (user) => {
            if (user) {
                realtimeFetch();
            }
        })

        return () => {
            if (readExpensesRealtime) {
                console.log('unmounted');
                readExpensesRealtime();
                detachOnAuthListener();
            }
        }
    }, []);

    const groupExpensesByMonth = (expenses: any[]) => {
        return expenses.reduce((grouped: { [x: string]: any[]; }, expense: { date: string | number | Date; }) => {
            const date = new Date(expense.date);
            const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

            if (!grouped[monthYear]) {
                grouped[monthYear] = [];
            }
            grouped[monthYear].push(expense);
            return grouped;
        }, {});
    };
    return (
        <body style={{backgroundColor: '#d4fff9'}}>
            {Object.entries(groupedExpenses).map(([monthYear, expenses]) => (
                <MonthTable key={monthYear} monthYear={monthYear} expenses={expenses} />
            ))}
        </body>
    );
}

// Optimized grouping function using reduce
