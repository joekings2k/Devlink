import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";

import FlexBetween from "components/FlexBetween";


interface FormValuesRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  location: string;
  occupation: string;
  picture: string;
}

interface FormValuesLogin {
  email: string;
  password: string;
}

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup
    .string()
    .required("required")
    .oneOf([yup.ref("password")]),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValueRegister: FormValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValueLogin: FormValuesLogin = {
  email: "",
  password: "",
};

export const Form = () => {
  const [pageType, setPageType] = useState<string>("register");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("min-width:600px");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const handleFormSubmit = async (
    values: FormValuesRegister | FormValuesLogin,
    onsubmitProps: any
  ) => {};

  return (
    <div>
      {isRegister && (
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValueRegister}
          validationSchema={registerSchema}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4,minmax(0,1fr))"
                sx={{
                  "&>div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                    helperText = {touched.firstName && errors.firstName}
                    sx={{gridColumn:"span 2"}}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={console.log(values.lastName)}
                    name="lastName"
                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                    helperText = {touched.lastName && errors.lastName}
                    sx={{gridColumn:"span 2"}}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={console.log(values.location)}
                    name="location"
                    error={Boolean(touched.location) && Boolean(errors.location)}
                    helperText = {touched.location && errors.location}
                    sx={{gridColumn:"span 4"}}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={console.log(values.occupation)}
                    name="occupation"
                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                    helperText = {touched.occupation && errors.occupation}
                    sx={{gridColumn:"span 4"}}
                  />
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius ="10px"
                    p="1rem"
                  >
                    {/* put dropzone here */}
                    hello

                  </Box>
                </>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};
