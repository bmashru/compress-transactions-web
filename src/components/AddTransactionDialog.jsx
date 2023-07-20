import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { addTransaction } from "../services/transactionService";
import propsTypes from 'prop-types';

export default function AddTransactionDialog({ onClose, open } ) {

  const tradingParty = "me";

  const [type, setType] = useState(-1);
  const [counterParty, setCounterPart] = useState("");
  const [amount, setAmount] = useState();
  const [addTransactionInProgress, setAddTransactionInProgress] =
    useState(false);

  const handleClose = () => {
    onClose();
  };

  const addTransactionData = async () => {
    setAddTransactionInProgress(true);
    await addTransaction({ tradingParty, counterParty, amount: type * amount });
    setAddTransactionInProgress(false);
    onClose(true);
  };

  const isAmountValid = () => {
    return /^[1-9]\d*$/.test(amount);
  }

  return (
    <Dialog maxWidth="sm" fullWidth={true} onClose={handleClose} open={open}>
      <DialogTitle>Add Transaction</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Trading Party"
              value={tradingParty}
              variant="standard"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="type-label">Age</InputLabel>
              <Select
                labelId="type-label"
                value={type}
                label="Age"
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                <MenuItem value={-1}>Paying</MenuItem>
                <MenuItem value={1}>Receiving</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Counter Party"
              value={counterParty}
              onChange={(event) => {
                setCounterPart(event.target.value);
              }}
              variant="standard"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              inputProps={{
                min: 1,
              }}
              label="Amount"
              variant="standard"
              type="number"
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value);
              }}
              fullWidth
              required
              error={amount && !isAmountValid()}
              helperText={amount && !isAmountValid() ? 'Pleas enter valid number' : ''}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {addTransactionInProgress ? (
          <CircularProgress />
        ) : (
          <>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={addTransactionData}
              autoFocus
              disabled={!(counterParty && amount && isAmountValid())}
            >
              Add Transaction
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

AddTransactionDialog.defaultProps = {
  onClose: () => null,
  open: false,
};

AddTransactionDialog.propTypes = {
  onClose: propsTypes.func,
  open: propsTypes.bool
};
