"use client";

// @mui
import Container from "@mui/material/Container";
//
import LoginAsTitle from "../login-as-title";
import UserType from "../login-user-type";

// ----------------------------------------------------------------------

export default function LoginAsView() {
  return (
    <>
      <LoginAsTitle />

      <Container
        sx={{
          pb: 10,
          position: "relative",
          maxWidth: "800px!important",
        }}
      >
        <UserType />
      </Container>
    </>
  );
}
