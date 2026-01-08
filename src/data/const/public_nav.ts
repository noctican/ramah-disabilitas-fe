import type { PublicNavItemTypes } from "../types/nav_types";

export const PUBLIC_NAV_ITEMS: PublicNavItemTypes[] = [
  { name: "Home", to: "/" },
  {
    name: "Products",
    to: "#",
    children: [
      { name: "Analytics", to: "/products/analytics" },
      { name: "Automation", to: "/products/automation" },
    ],
  },
  {
    name: "Resources",
    to: "#",
    children: [
      { name: "Blog", to: "/resources/blog" },
      { name: "Help Center", to: "/resources/help" },
    ],
  },
  { name: "Pricing", to: "/pricing" },
];