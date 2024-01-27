// sections
import { UserLoginView } from "src/sections/auth/user";

// ----------------------------------------------------------------------

export const metadata = {
  title: "Login with Hulya Events",
};

console.log("In Login page.tsx");

export default function LoginPage() {
  return <UserLoginView />;
}
