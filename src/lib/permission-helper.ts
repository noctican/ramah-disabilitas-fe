import { type RoleType } from "@/data/types/role_types";

export const hasPermission = (userRole: RoleType, allowedRoles?: RoleType[]) => {
    if(!allowedRoles || allowedRoles.length === 0) return true;
    return allowedRoles.includes(userRole);
}