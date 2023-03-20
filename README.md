# Introduction

## Pingdom Cloudflare Sync

This is a very simple program that syncs the IP addresses of Pingdom's probes to a Cloudflare list. It is written in TypeScript and uses the [Cloudflare API](https://api.cloudflare.com/) and [IPInfo](https://ipinfo.io/) for reporting IP information.

__Only supports https://my.pingdom.com/probes/ipv4 for now! Some issues encountered when dealing with ipv6.__

```bash
npm run build && node dist/index.js pingdom \
     --sourceUrl "https://my.pingdom.com/probes/ipv4" \
     --listId "{cloudflare_list_id}" \
     --tokenIpInfo "{ipinfo_token}" \
     --token "{cloudflare_token}" \
     --accountId "{cloudflare_account_id}" \
     --email "{cloudflare_email_address}"
```