"use client";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
// routes
import { paths } from "src/routes/paths";
// hooks
import { useBoolean } from "src/hooks/use-boolean";
// components
import Iconify from "src/components/iconify";
import { RouterLink } from "src/routes/components";
import FormProvider, { RHFTextField, RHFCode } from "src/components/hook-form";
// assets
import { PasswordIcon } from "src/assets/icons";
import { resetPassword, sendOTP } from "src/api/auth";
import { useRouter, useSearchParams } from "src/routes/hook";
import { useAuth } from "src/auth/context/users/auth-context";
import { useEffect, useState } from "react";
import { PATH_AFTER_LOGIN } from "src/config-global";
// ----------------------------------------------------------------------

export default function CompanyNewPasswordView() {
  const sendOTPMutation = sendOTP();
  const resetPasswordMutation = resetPassword();

  const router = useRouter();
  const password = useBoolean();

  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  const NewPasswordSchema = Yup.object().shape({
    otp: Yup.string().min(6, "Code must be at least 6 characters").required("Code is required"),
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const defaultValues = {
    otp: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loggedInUser, setLoggedInUser] = useState(defaultValues);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const resetPayload = {
        otp: data?.otp,
        email: data?.email,
        password: data?.password,
      };

      await resetPasswordMutation.mutateAsync(resetPayload);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
    }
  });

  const generateOTPCode = async () => {
    setLoggedInUser(methods.getValues());
    try {
      const payloadForGeneratingOTP = {
        email: loggedInUser?.email,
        tokenType: "OTP_RESET_PASSWORD",
      };
      await sendOTPMutation.mutateAsync(payloadForGeneratingOTP);
    } catch (error) {
      console.error(error);
    }
  };

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField name="email" label="Email" placeholder="example@gmail.com" InputLabelProps={{ shrink: true }} />

      <RHFCode name="otp" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <RHFTextField
        name="confirmPassword"
        label="Confirm New Password"
        type={password.value ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? "solar:eye-bold" : "solar:eye-closed-bold"} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Update Password
      </LoadingButton>

      <Typography variant="body2">
        {`Don’t have a code? `}
        <Link
          variant="subtitle2"
          sx={{
            cursor: "pointer",
          }}
          onClick={generateOTPCode}
        >
          Resend code
        </Link>
      </Typography>

      {/* <Link
        component={RouterLink}
        href={paths.authDemo.classic.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign in
      </Link> */}
    </Stack>
  );

  const renderHead = (
    <>
      <PasswordIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Reset Your Password</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "12px" }}>
          We&apos;ve sent a 8-digit confirmation email to your email.
          <br />
          Please enter the code in below box to reset your Password.
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
