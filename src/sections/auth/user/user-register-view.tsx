"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRegister, verifyEmail } from "src/api/auth";
import LoginBg from "src/assets/frontend/images/account/account-bg.jpg";
import FormProvider from "src/components/hook-form";
import * as Yup from "yup";

import PhoneInput from "react-phone-number-input";
import { useState } from "react";

import { useRouter } from "src/routes/hook";
import { useAuthContext } from "src/auth/hooks";

interface FormData {
  name: string;
  email: string;
  password: string;
  // confirmPassword: string;
  mobileNumber: string;
}

const UserRegisterView: React.FC = () => {
  const router = useRouter();
  const registerMutation = useRegister();
  const verifyEmailMutation = verifyEmail();

  const { register } = useAuthContext();

  const [phoneNumber, setPhoneNumber] = useState<any>("");

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("User Full Name required"),
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
    // confirmPassword: Yup.string()
    //   .required("Confirm Password is required")
    //   .oneOf([Yup.ref("password")], "Passwords must match"),
    mobileNumber: Yup.string()
      .required("Mobile Number is required")
      .test("isValidMobileNumber", "Invalid mobile number", (value) => {
        const cleanNumber = value.replace(/\D/g, "");
        const isValidLength = cleanNumber.length >= 7;
        return isValidLength;
      }),
  });

  const defaultValues: FormData = {
    name: "Dibya Magar",
    email: "dibyamagar56@gmail.com",
    password: "1234567A!",
    // confirmPassword: "1234567A!",
    mobileNumber: "+97 9860315483",
  };

  const methods = useForm<FormData>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const sendVerificationEmail = async (userData: any) => {
    try {
      if (userData) {
        const verifiedEmailResponse = await verifyEmailMutation.mutateAsync(userData);
        console.log(verifiedEmailResponse, "verifiedEmailResponse");
      } else {
        console.error("User is not available");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log(data, "data=====");

    try {
      const registeredUser = await registerMutation.mutateAsync(data);
      console.log(registeredUser, "registeredUser");
      await register(registeredUser);

      await sendVerificationEmail(registeredUser);

      router.push("/auth/user/verifyEmail");
    } catch (error) {
      console.error(error);
      reset();
    }
  });
  return (
    <section className="account-section bg_img" style={{ backgroundImage: `url(${LoginBg.src})` }}>
      <div className="container">
        <div className="padding-top padding-bottom">
          <div className="account-area">
            <div className="section-header-3">
              <span className="cate">Welcome to Hulya Events </span>
              <h4 className="title">Elevate Your Experience – Register Today for Hassle-Free Event Ticketing!</h4>
            </div>

            {/* Form Starts */}
            <FormProvider methods={methods} onSubmit={onSubmit} className={"account-form"}>
              <div className="form-group">
                <label htmlFor="fullName">
                  Full Name<span>*</span>
                </label>
                <input type="text" placeholder="Enter Your Full Name" id="fullName" {...methods.register("name")} />
                <p className="text-danger">{methods.formState.errors.name?.message}</p>
              </div>

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

              {/* <div className="form-group">
                <label htmlFor="pass2">
                  Confirm Password<span>*</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="pass2"
                  {...methods.register("confirmPassword")}
                />
                <p className="text-danger">{methods.formState.errors.confirmPassword?.message}</p>
              </div> */}

              <div className="form-group">
                <label htmlFor="mobileNumber">
                  Mobile Number<span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Mobile Number"
                  id="mobileNumber"
                  {...methods.register("mobileNumber")}
                />

                {/* <PhoneInput
                  international
                  placeholder="Enter phone number"
                  {...methods.register("mobileNumber")}
                  defaultCountry="AU"
                  value={phoneNumber}
                  onChange={(val) => {
                    setPhoneNumber(val?.toString());
                  }}
                /> */}
                <p className="text-danger">{methods.formState.errors.mobileNumber?.message}</p>
              </div>

              <div className="form-group text-center mt-5">
                <input type="submit" value="Sign Up" />
              </div>
            </FormProvider>
            {/* Form Ends */}

            <div className="option">
              Already have an account? <a href="/auth/user/login">Login</a>
            </div>
            <div className="or d-none">
              <span>Or</span>
            </div>
            <ul className="social-icons d-none">
              <li>
                <a href="#0">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#0" className="active">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="fab fa-google"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRegisterView;
