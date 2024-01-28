import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import AuthService from "src/services/auths";

export const useLogin = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ["login/verify"],
    async (data: any) => {
      const req = await AuthService.login(data);
      return req.data;
    },
    {
      onSuccess: (data: any) => {
        enqueueSnackbar("Login successful", { variant: "success" });
        return data;
      },
      onError: (error: any) => {
        enqueueSnackbar(error?.response?.data?.message || "Something went wrong", {
          variant: "error",
        });
        return error;
      },
    }
  );
};

export const useRegister = () => {
  const notify = useSnackbar();

  return useMutation(
    ["register"],
    async (data: any) => {
      return {
        user: {
          role: "customer",
          isEmailVerified: false,
          isNumberVerified: false,
          name: "Dibya",
          email: "dibyamagar56@gmail.com",
          mobileNumber: "+919860315483",
          id: "65b4bae8ec8c721d229bd7c7",
        },
        userToken: {
          access: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWI0YmFlOGVjOGM3MjFkMjI5YmQ3YzciLCJpYXQiOjE3MDYzNDMxNDQsImV4cCI6MTcwNjM0NDk0NCwidHlwZSI6ImFjY2VzcyJ9.p0l6W6JcvYulY8An8VdpyzrseQ8qtjqKJ7OkM7qExIc",
            expires: "2024-01-27T08:42:24.687Z",
          },
          refresh: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWI0YmFlOGVjOGM3MjFkMjI5YmQ3YzciLCJpYXQiOjE3MDYzNDMxNDQsImV4cCI6MTcwODkzNTE0NCwidHlwZSI6InJlZnJlc2gifQ.HBtw4EWNaRrLGbgSmf_A9b7no20Jyoymg7P6sOwYaLI",
            expires: "2024-02-26T08:12:24.690Z",
          },
        },
      };

      const res = await AuthService.register(data);
      return res?.data;
    },
    {
      onSuccess: (data: any) => {
        notify.enqueueSnackbar("User Data Saved Successfully!", { variant: "success" });
      },
      onError: (error: any) => {
        notify.enqueueSnackbar(error?.message || "Something went wrong", {
          variant: "error",
        });
        return error;
      },
    }
  );
};

export const verifyEmail = () => {
  const notify = useSnackbar();

  return useMutation(
    ["verifyEmail"],
    async (data: any) => {
      const res = await AuthService.sendEmailVerification(data);
      return res?.data;
    },
    {
      onSuccess: (data: any) => {
        notify.enqueueSnackbar("Email Sent for Verification Successfully!", { variant: "success" });
      },
      onError: (error: any) => {
        notify.enqueueSnackbar(error?.message || "Something went wrong", {
          variant: "error",
        });
        return error;
      },
    }
  );
};

export const sendOTP = () => {
  const notify = useSnackbar();

  return useMutation(
    ["sendOTP"],
    async (data: any) => {
      const res = await AuthService.sendOTP(data);
      return res?.data;
    },
    {
      onSuccess: (data: any) => {
        notify.enqueueSnackbar("OTP Sent Successfully!", { variant: "success" });
      },
      onError: (error: any) => {
        notify.enqueueSnackbar(error?.message || "Something went wrong", {
          variant: "error",
        });
        return error;
      },
    }
  );
};

export const verifyOTP = () => {
  const notify = useSnackbar();

  return useMutation(
    ["verifyOTP"],
    async (data: any) => {
      const res = await AuthService.verifyOTP(data);
      return res?.data;
    },
    {
      onSuccess: (data: any) => {
        notify.enqueueSnackbar("OTP Verified Successfully!", { variant: "success" });
      },
      onError: (error: any) => {
        console.log(error, "error");
        notify.enqueueSnackbar(error?.response?.data?.message || "Something went wrong", {
          variant: "error",
        });
        return error;
      },
    }
  );
};
