import { IconBook, IconDashboard, IconActivity } from "@tabler/icons-react";
import { ROLE_TEACHER } from "../enums/roles";
import type { DashboardNavItemTypes } from "../types/nav_types";

export const DASHBOARD_NAV_ITEMS: DashboardNavItemTypes[] = [
    {
        name: 'Dashboard',
        to: '/teacher',
        hasAccess: [ROLE_TEACHER],
        icon: IconDashboard
    },
    {
        name: 'Kelas',
        to: '/teacher/classes',
        hasAccess: [ROLE_TEACHER],
        icon: IconBook
    },
    {
        name: 'Aktivitas',
        to: '/teacher/activities',
        hasAccess: [ROLE_TEACHER],
        icon: IconActivity
    }
]
