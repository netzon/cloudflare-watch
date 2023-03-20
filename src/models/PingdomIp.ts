import { ipToCidr } from "../utils/ipv6ToCidr";

export interface PingdomIp {
    ip?: string;
    hostname?: string;
    city?: string;
    region?: string;
    country?: string;
    loc?: string;
    org?: string;
    postal?: string;
    timezone?: string;
}

export class PingdomIpImpl implements PingdomIp {
    public ip?: string = undefined;
    public hostname?: string = undefined;
    public city?: string = undefined;
    public region?: string = undefined;
    public country?: string = undefined;
    public loc?: string = undefined;
    public org?: string = undefined;
    public postal?: string = undefined;
    public timezone?: string = undefined;

    constructor(data?: PingdomIp) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    toString(): string {
        const outputArray: string[] = [];

        if (this.country) outputArray.push(this.country);
        if (this.city) outputArray.push(this.city);
        if (this.region) outputArray.push(this.region);
        if (this.postal) outputArray.push(this.postal);

        // combine as address
        const address = outputArray.join(", ");

        // remove all items in outputArray
        outputArray.splice(0, outputArray.length);

        // add address
        outputArray.push(address);

        // add hostname
        if (this.hostname) outputArray.push(this.hostname);

        // combine address and hostname
        const addressWithHostname = outputArray.join(" - ");
        
        return addressWithHostname;
    }

    ipToCidr(): string {
        if (this.ip === undefined) {
            throw new Error("ip is undefined");
        } else if (this.ip?.includes(":")) {
            return ipToCidr(this.ip);
        } else {
            return this.ip;
        }
    }
}