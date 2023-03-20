import { PingdomIpImpl } from "../models/PingdomIp";
import { PingdomIpInfoResponse } from "../models/PingdomIpInfoResponse";

export const ipInfo = async (ips: string[], tokenIpInfo: string): Promise<PingdomIpImpl[]> => {
    const body = JSON.stringify(ips);
    console.log(body);

    const response = await fetch(`https://ipinfo.io/batch?token=${tokenIpInfo}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: body,
    });
    const text = await response.text();
    const result = JSON.parse(text) as PingdomIpInfoResponse;

    const pingdomIps = Object.keys(result)
        .map(key => result[key])
        .map(x => new PingdomIpImpl(x));

    return pingdomIps;
}