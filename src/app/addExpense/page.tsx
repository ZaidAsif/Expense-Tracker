'use client';

import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { saveExpense } from "../firebase/firebaseFirestore";
import { useRouter } from "next/navigation";




export default function AddExpense() {
    const [title, setTitle] = useState<string | undefined>();
    const [amount, setAmount] = useState<string>();
    const [category, setCategory] = useState<string>();
    const [note, setNote] = useState<string>();

    let currentDate = new Date();
    let dateString = currentDate.toLocaleString();

    const router = useRouter()

    const handleAddExpense = async () => {
        try {
            await saveExpense(title, amount, category, dateString, note);
            router.push('/expenses');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <body style={{ backgroundColor: '#00bfa1' }}>
            <Container fixed style={{
                border: '1px solid #fff',
                // backgroundColor: '#cfe8fc',
                backgroundColor: '#fff',
                width: '70%',
                height: '500px',
                padding: '0px',
                // textAlign: 'center',
                marginTop: '50px',
                overflow: 'scroll',
                display: 'flex',
                flexWrap: 'wrap',
                // columnGap: '50%',
                alignContent: 'center',
                flexDirection: 'column'
                // gap: '20%'
                // rowGap: '25px',
                // paddingLeft: '20%',
                // paddingTop: '5%'
            }}>

                <TextField
                    label="Title"
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        marginTop: '5%'
                    }}
                />

                <TextField
                    label="Amount"
                    variant="standard"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{
                        marginTop: '5%'
                    }}
                />

                <br />

                <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value={'Food'}>Food</MenuItem>
                        <MenuItem value={'Transport'}>Transport</MenuItem>
                        <MenuItem value={'Bills'}>Bills</MenuItem>
                        <MenuItem value={'Education'}>Education</MenuItem>
                        <MenuItem value={'Investments'}>Investments</MenuItem>
                        <MenuItem value={'Luxuries'}>Luxuries</MenuItem>
                        <MenuItem value={'Others'}>Others</MenuItem>
                    </Select>
                </FormControl>

                <br />

                <TextField
                    id="optional-note"
                    label="Note"
                    placeholder="Optional note"
                    multiline
                    variant="standard"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />

                <br />
                <br />

                <Button
                    variant="contained"
                    style={{
                        backgroundColor: '#2f7c70'
                    }}
                    onClick={() => {
                        handleAddExpense()
                    }}
                >+Add Expense</Button>


            </Container>
        </body>
    )
}