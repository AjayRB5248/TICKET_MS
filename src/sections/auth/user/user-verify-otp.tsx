"use client";

import LoginBg from "src/assets/frontend/images/account/account-bg.jpg";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SentIcon } from "src/assets/icons";
import LoadingButton from "@mui/lab/LoadingButton";
import { sendOTP, verifyOTP } from "src/api/auth";
import { useRouter } from "src/routes/hook/use-router";
import FormProvider, { RHFTextField, RHFCode } from "src/components/hook-form";
import { Link } from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const userData: any = localStorage.getItem("user");
const parsedUserData = JSON.parse(userData);

const UserVerifyOTP = () => {
  const sendOTPMutation = sendOTP();
  const verifyOTPMutation = verifyOTP();

  const router = useRouter();

  const NewPasswordSchema = Yup.object().shape({
    otp: Yup.string().min(6, "Code must be at least 6 characters").required("Code is required"),
  });

  const defaultValues = {
    otp: "",
    email: "",
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
      let verifiedOTPRes;
      if (userData) {
        const payloadForGeneratingOTP = {
          email: parsedUserData?.user?.email,
          otp: data?.otp,
        };
        console.log(payloadForGeneratingOTP, "payloadForGeneratingOTP------from localstorage");
        verifiedOTPRes = await verifyOTPMutation.mutateAsync(payloadForGeneratingOTP);
      }

      console.log(verifiedOTPRes, "verifiedOTPRes");

      setTimeout(() => {
        router.push("/");
      }, 1000);
      
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
          tokenType: "OTP_MOBILE",
        };
        console.log(payloadForGeneratingOTP, "payloadForGeneratingOTP------from localstorage");
        generatedOTPRes = await sendOTPMutation.mutateAsync(payloadForGeneratingOTP);
      }
      console.log(generatedOTPRes, "generatedOTPRes");
    } catch (error) {
      console.error(error);
    }
  };

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFCode name="otp" className="otp-code-input-wrapper" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="outlined"
        loadingPosition="start"
        loading={isSubmitting}
        className="verify-otp-button"
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
    </Stack>
  );

  console.log(isSubmitting, "isSubmitting===");
  return (
    <section className="account-section bg_img" style={{ backgroundImage: `url(${LoginBg.src})` }}>
      <div className="container">
        <div className="padding-top padding-bottom">
          <div className="account-area text-center">
            <SentIcon sx={{ height: 96 }} />

            <Stack spacing={1} sx={{ my: 5 }}>
              <Typography variant="h3">OTP Code sent successfully!</Typography>

              <Typography sx={{ color: "text.secondary", fontSize: "12px" }}>
                We&apos;ve sent a 6-digit confirmation code to your phone number.
                <br />
                Please enter the code in below box to verify your number.
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

export default UserVerifyOTP;
