import { useRouter } from "src/routes/hook/use-router";
import { useAuth } from "../context/users/auth-context";
import { useCallback, useEffect, useState } from "react";

import { paths } from "src/routes/paths";

type Props = {
  children: React.ReactNode;
};

const loginPaths: Record<string, string> = {
  company: paths.auth.company.login,
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const { user } = useAuth();

  const [checked, setChecked] = useState(false);

  const checkAuth = useCallback(() => {
    if (!user || user.role === "customer") {
      const searchParams = new URLSearchParams({ returnTo: window.location.pathname }).toString();
      const loginPath = loginPaths.company;

      router.replace(`${loginPath}?${searchParams}`);
    } else {
      setChecked(true);
    }
  }, [user, router]);

  useEffect(() => {
    checkAuth();
  }, [user, router]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
