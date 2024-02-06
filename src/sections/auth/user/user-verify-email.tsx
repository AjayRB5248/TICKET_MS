"use client";

import LoginBg from "src/assets/frontend/images/account/account-bg.jpg";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { EmailInboxIcon } from "src/assets/icons";
import Iconify from "src/components/iconify";
import LoadingButton from "@mui/lab/LoadingButton";
import { useContext, useEffect, useState } from "react";

import { useRegister, verifyEmail } from "src/api/auth";
import { useAuth } from "src/auth/context/users/auth-context";
import { useRouter } from "src/routes/hook/use-router";

const UserVerifyEmail = () => {
  const { user } = useAuth();
  console.log(user, "User Fetched in Verify Email PAge");

  const verifyEmailMutation = verifyEmail();

  const router = useRouter();

  const sendVerificationEmail = async () => {
    try {
      const verifiedEmailResponse = await verifyEmailMutation.mutateAsync(user);
      console.log(verifiedEmailResponse, "verifiedEmailResponse");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="account-section bg_img" style={{ backgroundImage: `url(${LoginBg.src})` }}>
      <div className="container">
        <div className="padding-top padding-bottom">
          <div className="account-area text-center">
            <EmailInboxIcon sx={{ height: 96 }} />

            <Stack spacing={1} sx={{ my: 5 }}>
              <Typography variant="h3">Verify your email!</Typography>

              <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "16px" }}>
                Now, please check your inbox and follow the link we sent to{" "}
                <span className="text-bold text-success">{user?.email}</span> to verify your email.We just need to make
                sure that the email you entered belongs to you.
              </Typography>

              <LoadingButton
                size="large"
                type="submit"
                // loading={isSubmitting}
                endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                sx={{ pl: 2, pr: 1.5 }}
                onClick={sendVerificationEmail}
              >
                Resend Email
              </LoadingButton>
            </Stack>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserVerifyEmail;
