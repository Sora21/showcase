import Aos from "aos";

export function aosInit(): void {
    Aos.init();
    setTimeout(() => { Aos.refresh(); }, 500);
}