import figlet from 'figlet';
import { Command } from 'commander';
import { pingdomAction } from './actions/pingdomAction';

const start = new Date().getTime();
const program = new Command();

console.log(figlet.textSync("Cloudflare Watch"));

program
    .name("cloudflare-watch")
    .version("0.0.1")
    .description("A simple toolkit of cloudflare tools.");

program
    .command('pingdom')
    .requiredOption('-s, --sourceUrl <string>', 'IP Address List. Example \'https://my.pingdom.com/probes/ipv4\'')
    .requiredOption('-l, --listId <string>', 'The unique ID of the Cloudflare list')
    .requiredOption('-a, --accountId <string>', 'The unique ID of the Cloudflare Account')
    .requiredOption('-e, --email <string>', 'Cloudflare Global API Key')
    .requiredOption('-t, --token <string>', 'Cloudflare email')
    .requiredOption('-p, --tokenIpInfo <string>', 'Token from ipinfo.io')
    .requiredOption('-o, --output <string>', 'Path of output summary json file. Example \'output.json\'')
    .description('Update pingdom whitelist to Cloudflare Filter List.')
    .action(pingdomAction);

async function main() {
    program
        .parseAsync(process.argv);
}

(async () => {
    try {
        await main();
        const end = new Date().getTime();
        const time = end - start;
        console.log(`Application execution Completed in ${time}ms`);
    } catch (e) {
        console.error(e);
    }
})();