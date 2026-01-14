import type { RoleType } from "./role_types";
import type { Icon } from "@tabler/icons-react";

export type PublicNavItemTypes = {
    name: string;
    to: string;
    children?: PublicNavItemTypes[];
    hasAccess?: RoleType[];
};

export type DashboardNavItemTypes = {
    name: string;
    to: string;
    children?: Omit<DashboardNavItemTypes, 'icon'>[];
    hasAccess?: RoleType[];
    icon: Icon;
};