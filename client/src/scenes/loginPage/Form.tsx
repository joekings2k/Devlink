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
// import Dropzone from "react-dropzone";
import { Dropzone } from "components/Dropzone";
import FlexBetween from "components/FlexBetween";
import { color } from "@mui/system";
import { Token } from "@mui/icons-material";

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
  picture: yup.mixed().required("required"),
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
  const [pageType, setPageType] = useState<string>("login");
  const [profilePic, setProfilePic] = useState(null);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("min-width:600px");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values: any, onSubmitProps: any) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picture", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();
    if (savedUser) {
      setPageType("login");
    }
    console.log(formData);
  };

  const login = async (values: any, onSubmitProps: any) => {
    const loggedInUserResponse = await fetch(
      "http://localhost:3001/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const loggedIn = await loggedInUserResponse.json();
    console.log(loggedIn)
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(setLogin({
        user:loggedIn.user,
        token:loggedIn.token,
      }))
      navigate("/home")
    }
  };

  const handleFormSubmit = async (
    values: FormValuesRegister | FormValuesLogin,
    onSubmitProps: any
  ) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

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
                sx={
                  {
                    // "&>div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }
                }
              >
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{
                      gridColumn: "span 2",
                      gridTemplateColumns: "auto auto ",
                    }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="10px"
                    p="1rem"
                  >
                    {/* put dropzone here */}
                    <Dropzone
                      setFile={setProfilePic}
                      setFieldValue={setFieldValue}
                    />
                  </Box>
                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    type="password"
                    label="Confirm Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    error={
                      Boolean(touched.confirmPassword) &&
                      Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box sx={{ width: "100%", gridColumn: "span 4" }}>
                    <Button
                      fullWidth
                      type="submit"
                      sx={{
                        m: "2rem 0",
                        p: "1rem",
                        backgroundColor: palette.primary.main,
                        color: palette.backgrounds.alt,
                        "&:hover": { color: palette.primary.main },
                      }}
                    >
                      Register
                    </Button>
                    <span
                      onClick={() => {
                        setPageType("login");
                        resetForm();
                      }}
                    >
                      <Typography
                        sx={{
                          textDecoration: "underline",
                          color: palette.primary.main,
                          "&:hover": {
                            cursor: "pointer",
                            color: palette.primary.light,
                          },
                        }}
                      >
                        Already have an account?Click to sign in
                      </Typography>
                    </span>
                  </Box>
                </>
              </Box>
            </form>
          )}
        </Formik>
      )}

      {isLogin && (
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValueLogin}
          validationSchema={loginSchema}
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
                sx={
                  {
                    // "&>div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }
                }
              >
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box sx={{ width: "100%", gridColumn: "span 4" }}>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.backgrounds.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  Login
                </Button>
                <span
                  onClick={() => {
                    setPageType("register");
                    resetForm();
                  }}
                >
                  <Typography
                    sx={{
                      textDecoration: "underline",
                      color: palette.primary.main,
                      "&:hover": {
                        cursor: "pointer",
                        color: palette.primary.light,
                      },
                    }}
                  >
                    Dont have an account ?Click to register
                  </Typography>
                </span>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};
