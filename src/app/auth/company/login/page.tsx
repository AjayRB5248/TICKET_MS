// sections
import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Login to Hulya Events',
};

export default function LoginPage() {
  return <JwtLoginView />;
}
