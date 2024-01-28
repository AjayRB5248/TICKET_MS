"use client";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// routes
import { paths } from "src/routes/paths";
// assets
import { EmailInboxIcon } from "src/assets/icons";
// components
import Iconify from "src/components/iconify";
import { RouterLink } from "src/routes/components";
import FormProvider, { RHFCode, RHFTextField } from "src/components/hook-form";
import { sendOTP, verifyOTP } from "src/api/auth";
import { useAuth } from "src/auth/context/users/auth-context";
import { useSearchParams, useRouter } from "src/routes/hook";
import { PATH_AFTER_LOGIN } from "src/config-global";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function CompanyVerifyOTP() {
  const sendOTPMutation = sendOTP();
  const verifyOTPMutation = verifyOTP();
  const { user } = useAuth();

  const router = useRouter();

  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  const VerifySchema = Yup.object().shape({
    otp: Yup.string().min(8, "Code must be at least 8 characters").required("Code is required"),
  });

  const defaultValues = {
    otp: "",
    email: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (user) {
        const payloadForGeneratingOTP = {
          email: user?.email,
          otp: data?.otp,
        };

        await verifyOTPMutation.mutateAsync(payloadForGeneratingOTP);
      }

      setTimeout(() => {
        router.push(returnTo || PATH_AFTER_LOGIN);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  });

  const generateOTPCode = async () => {
    try {
      let generatedOTPRes;
      if (user) {
        const payloadForGeneratingOTP = {
          email: user?.email,
          tokenType: "OTP_MOBILE",
        };
        generatedOTPRes = await sendOTPMutation.mutateAsync(payloadForGeneratingOTP);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderHead = (
    <>
      <EmailInboxIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Please check your email!</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          We have emailed a 6-digit confirmation code to acb@domain, please enter the code in below box to verify your
          email.
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      <Stack spacing={3} alignItems="center">
        <RHFCode name="otp" />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loadingPosition="start"
          loading={isSubmitting}
        >
          <span>Verify OTP</span>
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
    </FormProvider>
  );
}
