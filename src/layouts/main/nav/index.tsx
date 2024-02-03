import { Avatar } from "@mui/material";
import Link from "next/link";
import { useLogout } from "src/api/auth";
import { useAuth } from "src/auth/context/users/auth-context";
import UserAccountPopover from "src/layouts/_common/user-account-popover";
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
    href: "/events/",
    submenu: [],
  },
  { label: "Concerts", href: "/concerts" },
  { label: "Hot Tickets", href: "/hot-tickets" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const { user } = useAuth();

  return (
    <>
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
        {!user && (
          <li className="header-button secondary-theme-btn pr-0">
            <a href="/login-as">Join Us</a>
          </li>
        )}
      </ul>

      {user && <UserAccountPopover />}
    </>
  );
};

export default Navbar;
