import { Box, styled, useTheme } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  updateUserDocument,
} from "../../redux-slices/currentUserSlice";
import { updatePassword } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Divider, IconButton } from "@mui/material";
import Title from "../../components/Title";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";
import {
  isValidUsername,
  usernameExistsPromise,
} from "../../components/helper-functions";
import { toast } from "react-toastify";
import Toast from "../../components/Toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

// Styled components
const StyledField = styled(Field)(({ theme }) => ({
  width: "100%",
  border: "none",
  borderRadius: "5px",
  height: "36px",
  padding: "10px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));
const FieldContainer = styled(Box)({
  margin: "15px 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "10px",
});
const PasswordContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: "10px",
});
const ErrorText = styled("div")(({ theme }) => ({
  color: theme.palette.error.main,
}));
const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: `${theme.palette.background.default}`,
  padding: "20px 30px",
  borderRadius: "8px",
}));
const Heading = styled("h2")({
  marginBottom: "20px",
});
const StyledButton = styled(Button)({
  marginTop: "5px",
});

// Validation
const validateUsername = async (value: string) => {
  let error;
  if (!value) {
    error = "Required.";
  } else if (!isValidUsername(value)) {
    error =
      "Username must not contain any special character except for underscore.";
  }
  try {
    if (currentUser.username !== value) {
      await usernameExistsPromise(value);
    }
  } catch (err) {
    // Username already exists
    error = err;
  }
  return error;
};
const validateDisplayName = (value: string) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};
const validateEmail = (value: string) => {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};
const validatePassword = (values: any) => {
  const errors: any = {};
  if (!values.newPassword) {
    errors.newPassword = "Required";
  } else if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (!/^(?=.*[A-Z]).{6,}$/.test(values.newPassword)) {
    errors.newPassword =
      "Password must contain at least 6 characters & 1 uppercase character";
  } else if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = "Passwords must match";
  }
  return errors;
};

const AccountSettings = () => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { username, email, displayName } = currentUser;
  const [showPassword, setShowPassword] = useState(false);

  // Manage Toast
  const notify = (input: string) => {
    if (input === "success") {
      toast.success("Updated successfully");
    } else if (input === "error") {
      toast.error("Failed to update. Please try again..");
    } else {
      toast.warning(
        "Requires recent login. Please log in again to change password."
      );
    }
  };

  // Handlers
  const handleShowPassword = () => setShowPassword(true);
  const handleHidePassword = () => setShowPassword(false);
  const handleUpdateAccount = async (values: any) => {
    try {
      await dispatch(
        updateUserDocument({ user, username: values.username }) as any
      );
      await dispatch(
        updateUserDocument({ user, displayName: values.displayName }) as any
      );
      await dispatch(updateUserDocument({ user, email: values.email }) as any);
      notify("success");
    } catch (error) {
      notify("error");
      console.log(error);
    }
  };
  const handleChangePassword = async (values: any) => {
    try {
      if (user) {
        await updatePassword(user, values.newPassword);
        notify("success");
      }
    } catch (error: any) {
      notify("error");
      if (error.code === "auth/requires-recent-login") {
        notify("login");
      }
      console.log(error.code, error.message);
    }
  };

  return (
    <Container>
      <Toast />

      {/* General Information */}
      <Heading>Account Information</Heading>
      <Formik
        initialValues={{
          username,
          email,
          displayName,
        }}
        onSubmit={handleUpdateAccount}
      >
        {({ errors, touched }) => (
          <Form>
            <FieldContainer>
              <label htmlFor="username">
                <Title content="Username" />
              </label>
              <StyledField
                id="username"
                name="username"
                validate={validateUsername}
              />
              {errors.username && touched.username && (
                <ErrorMessage name="username" component={ErrorText} />
              )}
            </FieldContainer>

            <FieldContainer>
              <label htmlFor="displayName">
                <Title content="display name" />
              </label>
              <StyledField
                id="displayName"
                name="displayName"
                validate={validateDisplayName}
              />
              {errors.displayName && touched.displayName && (
                <ErrorMessage name="displayName" component={ErrorText} />
              )}
            </FieldContainer>

            <FieldContainer>
              <label htmlFor="email">
                <Title content="Email" />
              </label>
              <StyledField
                id="email"
                name="email"
                type="email"
                validate={validateEmail}
              />
              {errors.email && touched.email && (
                <ErrorMessage name="email" component={ErrorText} />
              )}
            </FieldContainer>

            <StyledButton type="submit" variant="contained">
              Save
            </StyledButton>
          </Form>
        )}
      </Formik>

      <Divider sx={{ mt: "30px", mb: "20px" }} />

      {/* Password */}
      <Heading>Change Password</Heading>
      <Formik
        initialValues={{
          newPassword: "",
          confirmPassword: "",
        }}
        validate={validatePassword}
        onSubmit={handleChangePassword}
      >
        {({ errors, touched }) => (
          <Form>
            <FieldContainer>
              <label htmlFor="newPassword">
                <Title content="new Password" />
              </label>
              <PasswordContainer>
                <StyledField
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                />
                <IconButton
                  aria-label="toggle password visibility"
                  onMouseDown={handleShowPassword}
                  onMouseUp={handleHidePassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </PasswordContainer>
              {errors.newPassword && touched.newPassword && (
                <ErrorMessage name="newPassword" component={ErrorText} />
              )}
            </FieldContainer>
            <FieldContainer>
              <label htmlFor="confirmPassword">
                <Title content="confirm Password" />
              </label>
              <PasswordContainer>
                <StyledField
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                />
                <IconButton
                  aria-label="toggle password visibility"
                  onMouseDown={handleShowPassword}
                  onMouseUp={handleHidePassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </PasswordContainer>
              {errors.confirmPassword && touched.confirmPassword && (
                <ErrorMessage name="confirmPassword" component={ErrorText} />
              )}
            </FieldContainer>
            <StyledButton type="submit" variant="contained">
              Save
            </StyledButton>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AccountSettings;
