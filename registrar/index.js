import SipClient from './sip-client.js';

const port = 5060;
const bind = '0.0.0.0';
const host = 'localhost';

const sipClient = new SipClient({
    port, bind, host
});

await sipClient.start();