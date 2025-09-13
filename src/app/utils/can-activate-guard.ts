import { canAccess } from "./auth-util";

const authGuardFn = () => {
    return canAccess();
};

export const authGuards = [authGuardFn];
