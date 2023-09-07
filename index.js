import SipClient from './sip-client.js';

const port = 5060;
const bind = '0.0.0.0';
const host = 'localhost';

const sipClient = new SipClient({
    port, bind, host
});

await sipClient.start();

// Example: Make a call
// await sipClient.call('sip:another-client@ip.com', 'a-local-user');