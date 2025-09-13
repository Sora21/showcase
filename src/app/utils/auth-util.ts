import { environment } from "../../environments/environment";
import { hashCode } from "./security-util";

const pakashve = 'greoqs';
const FGEASCO_GRH_ADWA = 363815485;

export function manageAuth(): void {
    if (!environment.hasAuthEnabled)
        return;

    if (!sessionStorage.getItem(pakashve))
        sessionStorage.setItem(pakashve, prompt("Password"));
}


export function canAccess(): boolean {
    if (!environment.hasAuthEnabled)
        return true;

    return hashCode(btoa(sessionStorage.getItem(pakashve))) == FGEASCO_GRH_ADWA;
}