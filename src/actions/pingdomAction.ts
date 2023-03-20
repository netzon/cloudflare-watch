import { OptionValues, Command } from "commander";
import { writeFileSync } from "fs";
import { ipInfo } from "../utils/ipInfo";

export const pingdomAction = async (options: OptionValues, command: Command): Promise<void> => {
    const sourceUrl = options['sourceUrl'];
    const tokenIpInfo = options['tokenIpInfo'];
    const listId = options['listId'];
    const output = options['output'];

    console.log(`options ${JSON.stringify(options)}`);

    const headers = {
        'Content-Type': 'application/json',
        'X-Auth-Email': options['email'],
        'X-Auth-Key': options['token']
    };

    const getFromSourceUrlResponse = await fetch(sourceUrl, { method: 'GET' });
    const ipListText = await getFromSourceUrlResponse.text();
    const newList = ipListText
        .split("\n")
        .filter(x => x !== "");

    const newListWithInfo = await ipInfo(newList, tokenIpInfo);

    const newListComplete = newListWithInfo.map((ip) => ({
        ip: ip.ipToCidr(),
        comment: ip.toString(),
    }));

    const saveListResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${options['accountId']}/rules/lists/${listId}/items`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(newListComplete),
    });
    const saveListResponseJson = await saveListResponse.json();

    const summary = {
        final: newListComplete,
        response: saveListResponseJson,
        ipInfo: newListWithInfo,
    };

    const summaryText = JSON.stringify(summary, null, 2);
    writeFileSync(output, summaryText, { encoding: 'utf8', flag: 'w' });
}