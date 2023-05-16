import { useEffect, useState } from "react";
import { useGlobal } from "@/context/GlobalContext";

import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import ListFooter from "@/components/Dashboard/OrdersFooter";

type RowProps = {
  row: IOrder;
};

const NoOrder = () => (
  <Typography
    component="div"
    variant="subtitle1"
    color="text.secondary"
    gutterBottom
  >
    0 Order
  </Typography>
);

const OrderRow = ({ row }: RowProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.TrackingNumber}</TableCell>
        <TableCell>{row.ConsigneeName}</TableCell>
        <TableCell>{row.ConsigneeNumber}</TableCell>
        <TableCell>{row.ConsigneeCountry}</TableCell>
        <TableCell>{row.PaymentType}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container spacing={2} sx={{ px: 3, mx: 3 }}>
              <Grid item xs={12} md={6}>
                <Box sx={{ margin: 1 }}>
                  <Typography
                    variant="overline"
                    gutterBottom
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    Consignee Detail
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" component="div">
                      No: {row.ConsigneeNumber}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {row.ConsigneeName} <br />
                      {row.ConsigneeAddress} <br />
                      {row.ConsigneeCity} <br />
                      {row.ConsigneeProvince} <br />
                      {row.ConsigneeCountry}
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ margin: 1 }}>
                  <Typography
                    variant="overline"
                    gutterBottom
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    Dimension Detail
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" component="div">
                      Weight: {row.Weight} kg
                      <br />
                      Height: {row.Height} m<br />
                      Width: {row.Width} m<br />
                      Length: {row.Length} m<br />
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default function Orders() {
  const { orderList: rows, fetchOrders, page, rowsPerPage } = useGlobal();

  useEffect(() => {
    fetchOrders();
  }, [rows]);

  if (!rows.length) {
    return (
      <>
        <Typography
          component="h2"
          variant="subtitle1"
          color="primary"
          gutterBottom
        >
          Orders
        </Typography>
        <NoOrder />
      </>
    );
  }

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Orders
      </Typography>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Tracking Number</TableCell>
              <TableCell>Consignee Name</TableCell>
              <TableCell>Consignee Number</TableCell>
              <TableCell>Consignee Country</TableCell>
              <TableCell>Payment Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              (rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => <OrderRow row={row} key={row.TrackingNumber} />)}
          </TableBody>
          <ListFooter rows={rows} />
        </Table>
      </TableContainer>
    </>
  );
}
