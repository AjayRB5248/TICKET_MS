import { Avatar } from "@mui/material";
import Link from "next/link";
import { useLogout } from "src/api/auth";
import { useAuth } from "src/auth/context/users/auth-context";
import { usePathname, useRouter } from "src/routes/hook";

interface SubmenuItem {
  label: string;
  href: string;
  className?: string;
}

interface NavItem {
  label: string;
  href: string;
  className?: string;
  submenu?: SubmenuItem[];
}

const navigationItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Events",
    href: "/events",
    submenu: [],
  },
  { label: "Concerts", href: "/concerts" },
  { label: "Hot Tickets", href: "/hot-tickets" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const logoutMutation = useLogout();
  const router = useRouter();

  const { user, refreshToken } = useAuth();

  const logOut = async () => {
    await logoutMutation.mutateAsync({
      refreshToken,
    });
    router.push("/");
  };

  return (
    <ul className="menu">
      {navigationItems.map((item, index) => (
        <>
          <li key={index} className={item.submenu && item.submenu.length ? "menu-item-has-children" : ""}>
            {item.submenu && item.submenu.length > 0 ? (
              <>
                <Link href={"/"} legacyBehavior>
                  <a className={`${item.href === pathname ? "active" : ""}`}>{item.label}</a>
                </Link>
                <ul className="submenu">
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link href={subItem.href}>{subItem.label}</Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link href={item.href} legacyBehavior>
                <a className={`${item.href === pathname ? "active" : ""}`}>{item.label}</a>
              </Link>
            )}
          </li>
        </>
      ))}
      {/* Sign Up Link */}
      <li className="header-button primary-theme-btn pr-0 d-none">
        <a href="">
          <i className="fa fa-ticket-alt mr-2"></i>
          Buy Ticket
        </a>
      </li>
      {user ? (
        <div className="user-profile-wrapper d-flex align-items-center ml-4">
          <a href="/" className="d-flex align-items-center">
            <Avatar
              src={""}
              alt={user?.name}
              sx={{
                width: 24,
                height: 24,
                border: (theme) => `solid 2px ${theme.palette.background.default}`,
              }}
            />
            <span className="user-name ml-3">{user.name?.split(' ')[0]}</span>
          </a>
          <span className="ml-2" onClick={logOut}>
            <i className="fas fa-sign-out-alt"></i>
          </span>
        </div>
      ) : (
        <li className="header-button secondary-theme-btn pr-0">
          <a href="/login-as">Join Us</a>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
