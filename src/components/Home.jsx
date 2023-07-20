import { Button, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getCompressedTransactions,
  getTransactions,
} from "../services/transactionService";
import AddTransactionDialog from "./AddTransactionDialog";
import TransactionsTable from "./TransactionsTable";

import CsvExport from "./CsvExport";

function Home() {
  const [loading, setLoading] = useState(true);
  const [trnasactions, setTransactions] = useState({});
  const [openAddTransactionDialog, setOpenAddTransactionDialog] =
    useState(false);

  const csvHeaders = [
    { label: "Trading Party", key: "tradingParty" },
    { label: "Counter Party", key: "counterParty" },
    { label: "Amount", key: "amount" },
  ];

  useEffect(() => {
    getTransactionsData();
  }, []);

  const getTransactionsData = async () => {
    const transactions = await getTransactions();
    setTransactions(transactions);
    setLoading(false);
  };

  const handleDialogOpen = () => {
    setOpenAddTransactionDialog(true);
  };

  const handleDialogClose = (reload) => {
    setOpenAddTransactionDialog(false);
    if (reload) {
      setLoading(true);
      getTransactionsData();
    }
  };

  const compressTransactions = async (event, done) => {
    let data = await getCompressedTransactions();
    return { data, filename: "compress_transactions", headers: csvHeaders };
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Grid item>
              <TransactionsTable
                title={"Paying"}
                transactions={trnasactions.paying}
              />
            </Grid>
            <Grid item>
              <TransactionsTable
                title={"Receiving"}
                transactions={trnasactions.receiving}
              />
            </Grid>
          </>
        )}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item>
          <Button variant="contained" onClick={handleDialogOpen}>
            Add New Transaction
          </Button>
        </Grid>
        <Grid item>
          <CsvExport asyncExportMethod={compressTransactions}>
            <Button variant="contained">Compress Transaction</Button>
          </CsvExport>
        </Grid>
      </Grid>
      {openAddTransactionDialog && (
        <AddTransactionDialog
          open={openAddTransactionDialog}
          onClose={handleDialogClose}
        />
      )}
    </Grid>
  );
}

export default Home;
