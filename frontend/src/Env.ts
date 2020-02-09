import process from "process";

const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export default function getURL(): string {
    if(isProductionEnv()) {
        return getProductionURL();
    } else {
        return getDevelopmentURL();
    }
}

export function isDevelopmentEnv(): boolean
{
    return development;
}

export function isProductionEnv(): boolean
{
    return !isDevelopmentEnv();
}

export function getDevelopmentURL(): string {
    return 'http://localhost:8081';
}

export function getProductionURL(): string {
    return 'https://api.sakul6499.de';
}
