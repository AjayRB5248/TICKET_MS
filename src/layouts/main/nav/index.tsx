import Link from "next/link";
import { usePathname } from "src/routes/hook";

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
    href: "#",
    submenu: [
      {
        label: "Trending Now",
        href: "",
      },
    ],
  },
  { label: "Sports", href: "#", submenu: [] },
  { label: "Blog", href: "#", submenu: [] },
  { label: "Contact", href: "" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const renderLink = (item: NavItem | SubmenuItem, key: number) => (
    <li key={key}>
      <Link href={item.href} legacyBehavior>
        <a className={`${item.href === pathname ? "active" : ""}`}>{item.label}</a>
      </Link>
    </li>
  );

  return (
    <ul className="menu">
      {navigationItems.map((item, index) => (
        <li key={index} className={item.submenu && item.submenu.length ? "menu-item-has-children" : ""}>
          {item.submenu && item.submenu.length > 0 ? (
            <>
              {renderLink(item, index)}
              <ul className="submenu">{item.submenu.map(renderLink)}</ul>
            </>
          ) : (
            renderLink(item, index)
          )}
        </li>
      ))}
      {/* Sign Up Link */}
      <li className="header-button pr-0">
        <a href="">Buy Ticket</a>
      </li>
    </ul>
  );
};

export default Navbar;