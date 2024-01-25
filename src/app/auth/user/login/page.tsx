// sections
import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Login with Hulya Events',
};

console.log("In Login page.tsx")

export default function LoginPage() {
  return <JwtLoginView />;
}
