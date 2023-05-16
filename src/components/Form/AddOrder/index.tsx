import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useGlobal } from "@/context/GlobalContext";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";

const emptyForm = {
  consigneeName: "",
  consigneeAddress: "",
  consigneeCity: "",
  consigneeCountry: "",
  consigneePostalCode: "",
  consigneeProvince: "",
  consigneeNumber: "",
  height: "",
  weight: "",
  length: "",
  width: "",
  paymentType: "cod",
};

const validationSchema = yup.object({
  consigneeName: yup.string().required("Consignee Name is required"),
  consigneeAddress: yup.string().required("Consignee Address is required"),
  consigneeCity: yup.string().required("Consignee City is required"),
  consigneeCountry: yup.string().required("Consignee Country is required"),
  consigneePostalCode: yup
    .number()
    .required("Consignee Postal Cod is required"),
  consigneeProvince: yup.string().required("Consignee Province is required"),
  consigneeNumber: yup.string().required("Consignee Number is required"),
  height: yup.number().required("Height is required"),
  weight: yup.number().required("Weight is required"),
  width: yup.number().required("Width is required"),
  length: yup.number().required("Length is required"),
  paymentType: yup.string().required("Payment Type is required"),
});

const paymentTypes = [
  {
    id: 1,
    value: "cod",
    displayName: "Cash On Delivery",
  },
];

const FormAddOrder = () => {
  const { createOrder, formLoading, isFormOpen, handleAddFormClick } =
    useGlobal();
  const [paymentType, setPaymentType] = useState("cod");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const formik = useFormik({
    initialValues: emptyForm,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleChange = (event: SelectChangeEvent) => {
    setPaymentType(event.target.value as string);
  };

  const handleSubmit = async (values: any) => {
    const { weight, height, width, length } = values;

    const data = {
      ...values,
      weight: Number(weight),
      height: Number(height),
      width: Number(width),
      length: Number(length),
    };

    try {
      createOrder(data);
      formik.resetForm();
      setIsSnackbarOpen(true);
    } catch (error: any) {
      console.error(error?.message || "Error: Cannot submit new order");
    }
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Snackbar
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Order successfully created
        </Alert>
      </Snackbar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" noWrap sx={{ flexGrow: 1 }}>
            Create New Order
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddFormClick}
          >
            New Order
          </Button>
        </Box>

        {isFormOpen && (
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Divider sx={{ mt: 4, mb: 1 }}>Consignee Detail</Divider>
            <TextField
              margin="normal"
              fullWidth
              name="consigneeName"
              label="Consignee Name"
              id="ConsigneeName"
              value={formik.values.consigneeName}
              onChange={formik.handleChange}
              error={
                formik.touched.consigneeName &&
                Boolean(formik.errors.consigneeName)
              }
              helperText={
                formik.touched.consigneeName && formik.errors.consigneeName
              }
            />
            <TextField
              margin="normal"
              fullWidth
              name="consigneeNumber"
              label="Consignee Number"
              id="ConsigneeNumber"
              value={formik.values.consigneeNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.consigneeNumber &&
                Boolean(formik.errors.consigneeNumber)
              }
              helperText={
                formik.touched.consigneeNumber && formik.errors.consigneeNumber
              }
            />
            <TextField
              margin="normal"
              fullWidth
              name="consigneeAddress"
              label="Consignee Address"
              id="ConsigneeAddress"
              value={formik.values.consigneeAddress}
              onChange={formik.handleChange}
              error={
                formik.touched.consigneeAddress &&
                Boolean(formik.errors.consigneeAddress)
              }
              helperText={
                formik.touched.consigneeAddress &&
                formik.errors.consigneeAddress
              }
              multiline
              rows={4}
            />
            <TextField
              margin="normal"
              fullWidth
              name="consigneeCity"
              label="Consignee City"
              id="ConsigneeCity"
              value={formik.values.consigneeCity}
              onChange={formik.handleChange}
              error={
                formik.touched.consigneeCity &&
                Boolean(formik.errors.consigneeCity)
              }
              helperText={
                formik.touched.consigneeCity && formik.errors.consigneeCity
              }
            />
            <TextField
              margin="normal"
              fullWidth
              name="consigneeProvince"
              label="Consignee Province"
              id="ConsigneeProvince"
              value={formik.values.consigneeProvince}
              onChange={formik.handleChange}
              error={
                formik.touched.consigneeProvince &&
                Boolean(formik.errors.consigneeProvince)
              }
              helperText={
                formik.touched.consigneeProvince &&
                formik.errors.consigneeProvince
              }
            />
            <TextField
              margin="normal"
              fullWidth
              name="consigneePostalCode"
              label="Consignee Postal Code"
              id="ConsigneePostalCode"
              value={formik.values.consigneePostalCode}
              onChange={formik.handleChange}
              error={
                formik.touched.consigneePostalCode &&
                Boolean(formik.errors.consigneePostalCode)
              }
              helperText={
                formik.touched.consigneePostalCode &&
                formik.errors.consigneePostalCode
              }
            />
            <TextField
              margin="normal"
              fullWidth
              name="consigneeCountry"
              label="Consignee Country"
              id="ConsigneeCountry"
              value={formik.values.consigneeCountry}
              onChange={formik.handleChange}
              error={
                formik.touched.consigneeCountry &&
                Boolean(formik.errors.consigneeCountry)
              }
              helperText={
                formik.touched.consigneeCountry &&
                formik.errors.consigneeCountry
              }
            />
            <Divider sx={{ mt: 4, mb: 1 }}>Order Detail</Divider>
            <TextField
              margin="normal"
              fullWidth
              name="weight"
              label="Weight"
              id="Weight"
              value={formik.values.weight}
              onChange={formik.handleChange}
              error={formik.touched.weight && Boolean(formik.errors.weight)}
              helperText={formik.touched.weight && formik.errors.weight}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kg</InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="height"
              label="Height"
              id="Height"
              value={formik.values.height}
              onChange={formik.handleChange}
              error={formik.touched.height && Boolean(formik.errors.height)}
              helperText={formik.touched.height && formik.errors.height}
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="width"
              label="Width"
              id="Width"
              value={formik.values.width}
              onChange={formik.handleChange}
              error={formik.touched.width && Boolean(formik.errors.width)}
              helperText={formik.touched.width && formik.errors.width}
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="length"
              label="Length"
              id="Length"
              value={formik.values.length}
              onChange={formik.handleChange}
              error={formik.touched.length && Boolean(formik.errors.length)}
              helperText={formik.touched.length && formik.errors.length}
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
            />
            <Divider sx={{ mt: 4, mb: 1 }}>Payment Method</Divider>
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">
                Payment Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={paymentType}
                label="Payment Type"
                onChange={handleChange}
              >
                {paymentTypes.map((type) => (
                  <MenuItem key={type.id} value={type.value}>
                    {type.displayName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2 }}
              disabled={formLoading}
            >
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default FormAddOrder;
