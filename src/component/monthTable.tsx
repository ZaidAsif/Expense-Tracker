// import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
// import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from "react";

// export default function MonthTable({ monthYear, expenses }) {
//     const totalAmount = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  
//     return (
//       <div style={{ marginBottom: '40px' }}>
//         <h2 style={{textAlign: 'center', fontSize: '25px'}}>{monthYear}</h2>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell align="right">Amount</TableCell>
//                 <TableCell align="right">Category</TableCell>
//                 <TableCell align="right">Date</TableCell>
//                 <TableCell align="right">Note</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {expenses.map((expense: { title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; amount: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; category: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; date: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; note: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, index: Key | null | undefined) => (
//                 <TableRow key={index}>
//                   <TableCell>{expense.title}</TableCell>
//                   <TableCell align="right">{expense.amount}</TableCell>
//                   <TableCell align="right">{expense.category}</TableCell>
//                   <TableCell align="right">{expense.date}</TableCell>
//                   <TableCell align="right">{expense.note}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <h3 style={{textAlign: 'center'}}>Total for {monthYear}: <b>{totalAmount}</b></h3>
//       </div>
//     );
//   };
  

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, FormControl, InputLabel, Select, MenuItem, Container } from "@mui/material";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";

type MonthTableType = {
    monthYear: string,
    expenses: any
}

export default function MonthTable({ monthYear, expenses }: MonthTableType) {
    const [selectedCategory, setSelectedCategory] = useState("");

    const filteredExpenses = selectedCategory
        ? expenses.filter((expense: { category: string; }) => expense.category === selectedCategory)
        : expenses;

        // its right but if a NaN is included so the amount will become NaN
    // const totalAmount = filteredExpenses.reduce((sum: number, expense: { amount: any; }) => sum + Number(expense.amount), 0);

    const totalAmount = filteredExpenses.reduce((sum: number, expense: { amount: any }) => {
        const validAmount = isNaN(Number(expense.amount)) ? 0 : Number(expense.amount); 
        return sum + validAmount;
    }, 0);

    return (

        <div style={{ marginBottom: '40px' }}>
            <h2 style={{ textAlign: 'center', fontSize: '25px', color: 'black', fontFamily: 'monospace' }}>{monthYear}</h2>
            
            <FormControl variant="outlined" style={{ width: "150px", marginBottom: "20px" , textAlign: 'center'}}>
                <InputLabel>Category</InputLabel>
                <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="Category"
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Transport">Transport</MenuItem>
                    <MenuItem value="Bills">Bills</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Investments">Investments</MenuItem>
                    <MenuItem value="Luxuries">Luxuries</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                </Select>
            </FormControl>

            {/* Expense Table */}
            <TableContainer component={Paper}>
                <Table>
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
                        {filteredExpenses.map((expense: { title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; amount: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; category: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; date: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; note: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, index: Key | null | undefined) => (
                            <TableRow key={index}>
                                <TableCell>{expense.title}</TableCell>
                                <TableCell align="right">{expense.amount}</TableCell>
                                <TableCell align="right">{expense.category}</TableCell>
                                <TableCell align="right">{expense.date}</TableCell>
                                <TableCell align="right">{expense.note}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {/* Total Amount */}
            <h3 style={{ textAlign: 'center' }}>Total for {monthYear}: <b>{totalAmount}</b></h3>
        </div>
        // </Container>
    );
};
