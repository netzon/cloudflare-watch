/**
 * https://stackoverflow.com/a/69642134/546506
 * 
 * @param ipv6 the ipv6 address to convert to cidr /64
 * @returns the ipv6 address in /64 cidr notation
 */
export const ipToCidr = (ipv6: string): string => {
    if (!ipv6.includes(":")) return ipv6;
    if (ipv6.includes("/")) return ipv6;
    const groups = ipv6.split(":");
    const i = 64;
    let groupIndex = Math.floor(i / 16);
    let mask = (i % 16) ? (0xffff << (16 - (i % 16))) & 0xffff : 0;

    const ipv6NoCompaction =  groups.map((value, j) => {
        return (j < groupIndex ? value : j == groupIndex ? parseInt(value, 16) & mask : 0).toString(16)
    }).join(":") + `/${i}`;

    const ipv6Compacted = ipv6NoCompaction.replace(/\b(?:0+:){2,}/, ':');
    return ipv6Compacted;
}