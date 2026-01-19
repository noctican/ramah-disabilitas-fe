import { ROLE_STUDENT } from "../enums/roles";
import type { PublicNavItemTypes } from "../types/nav_types";

export const PUBLIC_NAV_ITEMS: PublicNavItemTypes[] = [
  {
    name: "Kelas",
    to: "/classes",
    hasAccess: [ROLE_STUDENT]
  },
  {
    name: "Tugas",
    to: "/assignments",
    hasAccess: [ROLE_STUDENT]
  },
];