import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import propsTypes from 'prop-types';

export default function TransactionsTable({ title, transactions }) {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" color={"GrayText"} gutterBottom>
        {title}
      </Typography>
      {transactions.length ? (
        <Table>
          <TableHead sx={{ borderTop: 1 }}>
            <TableRow>
              <TableCell align="center" sx={{ borderRight: 1 }}>
                Counterparty Name
              </TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ borderRight: 1 }} align="center">
                  {row.counterParty}
                </TableCell>
                <TableCell align="center">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Box sx={{ width: 240, borderTop: 1 }}>
          <Typography variant="body1">No Transactions</Typography>
        </Box>
      )}
    </TableContainer>
  );
}

TransactionsTable.defaultProps = {
  title: '',
  transactions: []
};

TransactionsTable.propTypes = {
  title: propsTypes.string,
  transactions: propsTypes.array
};
