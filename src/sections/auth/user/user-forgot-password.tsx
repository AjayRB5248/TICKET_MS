"use client";

import LoginBg from "src/assets/frontend/images/account/account-bg.jpg";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PasswordIcon } from "src/assets/icons";
import LoadingButton from "@mui/lab/LoadingButton";
import { resetPassword, sendOTP, verifyOTP } from "src/api/auth";
import { useRouter } from "src/routes/hook/use-router";
import FormProvider, { RHFTextField, RHFCode } from "src/components/hook-form";
import { Link } from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Iconify from "src/components/iconify";
import { useBoolean } from "src/hooks/use-boolean";

const userData: any = localStorage.getItem("user");
const parsedUserData = JSON.parse(userData);

const UserForgotPassword = () => {
  const sendOTPMutation = sendOTP();
  const resetPasswordMutation = resetPassword();

  const router = useRouter();
  const password = useBoolean();

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

      router.push("/auth/user/login");
    } catch (error) {
      console.error(error);
    }
  });

  const generateOTPCode = async () => {
    try {
      let generatedOTPRes;
      if (userData) {
        const payloadForGeneratingOTP = {
          email: parsedUserData?.user?.email,
          tokenType: "OTP_RESET_PASSWORD",
        };
        generatedOTPRes = await sendOTPMutation.mutateAsync(payloadForGeneratingOTP);
      }
      console.log(generatedOTPRes, "generatedOTPRes");
    } catch (error) {
      console.error(error);
    }
  };

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField name="email" label="Email" placeholder="example@gmail.com" InputLabelProps={{ shrink: true }} />

      <RHFCode name="otp" className="otp-code-input-wrapper" />

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

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingPosition="start"
        className="verify-otp-button"
      >
        Reset Password
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
    </Stack>
  );

  return (
    <section className="account-section bg_img" style={{ backgroundImage: `url(${LoginBg.src})` }}>
      <div className="container">
        <div className="padding-top padding-bottom">
          <div className="account-area text-center">
            <PasswordIcon sx={{ height: 96 }} />

            <Stack spacing={1} sx={{ my: 5 }}>
              <Typography variant="h3">Reset Your Password</Typography>

              <Typography sx={{ color: "text.secondary", fontSize: "12px" }}>
                We&apos;ve sent a 6-digit confirmation code to your phone number.
                <br />
                Please enter the code in below box to reset your Password.
              </Typography>
            </Stack>

            <FormProvider methods={methods} onSubmit={onSubmit}>
              {renderForm}
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserForgotPassword;
