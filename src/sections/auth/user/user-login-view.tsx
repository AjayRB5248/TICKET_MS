"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useForgotPassword, useLogin } from "src/api/auth";
import LoginBg from "src/assets/frontend/images/account/account-bg.jpg";
import FormProvider from "src/components/hook-form";
import * as Yup from "yup";

import PhoneInput from "react-phone-number-input";
import { useState } from "react";

import { useRouter } from "src/routes/hook";
import { LoadingButton } from "@mui/lab";

interface FormData {
  email: string;
  password: string;
}

const UserRegisterView: React.FC = () => {
  const router = useRouter();
  const loginMutation = useLogin();
  const forgotPasswordMutation = useForgotPassword();

  const defaultValues: FormData = {
    email: "",
    password: "",
  };

  const [loggedInUser, setLoggedInUser] = useState(defaultValues);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const methods = useForm<FormData>({
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
      await loginMutation.mutateAsync(data);
      router.push("/");
    } catch (error) {
      console.error(error);
      reset();
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

      router.push("/auth/user/forgot-password");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="account-section bg_img" style={{ backgroundImage: `url(${LoginBg.src})` }}>
      <div className="container">
        <div className="padding-top padding-bottom">
          <div className="account-area">
            <div className="section-header-3">
              <span className="cate">Welcome to Hulya Events </span>
              <h4 className="title">Elevate Your Experience – Login for Hassle-Free Ticketing!</h4>
            </div>

            <FormProvider methods={methods} onSubmit={onSubmit} className={"account-form"}>
              <div className="form-group">
                <label htmlFor="email">
                  Email<span>*</span>
                </label>
                <input type="text" placeholder="Enter Your Email" id="email" {...methods.register("email")} />
                <p className="text-danger">{methods.formState.errors.email?.message}</p>
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password<span>*</span>
                </label>
                <input type="password" placeholder="Password" id="password" {...methods.register("password")} />
                <p className="text-danger">{methods.formState.errors.password?.message}</p>
              </div>

              <div className="option text-right">
                <a href="javascript:void(0)" onClick={forgotPassword}>
                  {" "}
                  Forgot Password?{" "}
                </a>
              </div>

              <div className="form-group text-center">
                <LoadingButton type="submit" className="btn-loading" loadingPosition="start" loading={isSubmitting}>
                  <span>Sign In</span>
                </LoadingButton>
              </div>
            </FormProvider>

            <div className="option">
              New user? <a href="/auth/user/register">Sign Up Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRegisterView;
