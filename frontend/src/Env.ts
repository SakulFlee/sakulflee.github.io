import process from "process";

export default function getURL(): string {
    if (isProductionEnv()) {
        return getProductionURL();
    } else {
        return getDevelopmentURL();
    }
}

export function isDevelopmentEnv(): boolean {
    return !isProductionEnv();
}

export function isProductionEnv(): boolean {
    return window.location.host.startsWith("sakul6499.de");
}

export function getDevelopmentURL(): string {
    return 'http://localhost:8081';
}

export function getProductionURL(): string {
    return 'https://api.sakul6499.de';
}
