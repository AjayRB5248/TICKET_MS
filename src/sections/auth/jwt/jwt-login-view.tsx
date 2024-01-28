"use client";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
// hooks
import { useBoolean } from "src/hooks/use-boolean";
// routes
import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";
import { useSearchParams, useRouter } from "src/routes/hook";
// config
import { PATH_AFTER_LOGIN } from "src/config-global";
// auth

import Iconify from "src/components/iconify";
import FormProvider, { RHFTextField } from "src/components/hook-form";
import { useForgotPassword, useLogin } from "src/api/auth";

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");

  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo");

  const password = useBoolean();

  const loginMutation = useLogin();
  const forgotPasswordMutation = useForgotPassword();

  const defaultValues = {
    email: "dibyamagar5@gmail.com",
    password: "123456A!",
  };

  const [loggedInUser, setLoggedInUser] = useState(defaultValues);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const loginPayload = {
        email: data?.email,
        password: data?.password,
      };

      await loginMutation.mutateAsync(loginPayload);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === "string" ? error : error.message);
    }
  });

  const forgotPassword = async () => {
    setLoggedInUser(methods.getValues());
    try {
      const payload = {
        email: loggedInUser?.email,
        tokenType: "OTP_RESET_PASSWORD",
      };
      await forgotPasswordMutation.mutateAsync(payload);

      router.push("/auth/company/reset-password");
    } catch (error) {
      console.error(error);
    }
  };

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
      <Typography variant="h4">Sign in to Hulya Events</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.company.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <RHFTextField name="email" label="Email address" />

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

        <Link
          variant="body2"
          color="inherit"
          underline="always"
          sx={{ alignSelf: "flex-end", cursor: "pointer" }}
          onClick={forgotPassword}
        >
          Forgot password?
        </Link>

        <LoadingButton fullWidth color="inherit" size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}
    </>
  );
}
