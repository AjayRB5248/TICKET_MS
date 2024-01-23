import { useEffect, useCallback, useState } from 'react';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
//
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

const loginPaths: Record<string, string> = {
  jwt: paths.auth.jwt.login,
  auth0: paths.auth.auth0.login,
  amplify: paths.auth.amplify.login,
  firebase: paths.auth.firebase.login,
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  console.log(router, "router")

  const { authenticated, method } = useAuthContext();
  console.log(authenticated, method, "from useAuthContext")

  const [checked, setChecked] = useState(false);
  console.log(checked, "checked")

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({ returnTo: window.location.pathname }).toString();
      console.log(searchParams, "searchParams===")

      const loginPath = loginPaths[method];

      const href = `${loginPath}?${searchParams}`;
      console.log(href, "href===")
      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, method, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
