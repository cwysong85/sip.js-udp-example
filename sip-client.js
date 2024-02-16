import { UserAgent, Inviter } from 'sip.js';
import udpTransport from './udp-transport.js'
import SessionDescriptionHandler from './sdp.js';

class SIP {

    constructor(conf){
        this.conf = conf
        this.userAgent = new UserAgent({
            transportConstructor: udpTransport,
            transportOptions: {
                port: conf.port,
                host: conf.bind
            },
            contactName: 'sip.js-udp-example',
            contactParams: {
                transport: 'udp',
            },
            viaHost: conf.host,
            sessionDescriptionHandlerFactory: (session, options) => {
                return new SessionDescriptionHandler(session, options);
            },
            uri: UserAgent.makeURI(`sip:sip.js-udp-example@${conf.host}`)
        });

    }

    async start() {
        const resp = await this.userAgent.start();
        console.log('SIP service started');
    }

    async call(to, from) {
        const target = UserAgent.makeURI(to);
        const fromUri = UserAgent.makeURI(`sip:${from}@${this.conf.host}`);
        if (!target) {
            throw new Error("Failed to create target URI.");
        }

        const inviter = new Inviter(this.userAgent, target, { params: { fromUri }});

        inviter.stateChange.addListener((state) => {

            console.log(`Call state changed to ${state}`)
            let sdh = null;

            switch (state) {
                case "Initial":
                    break;
                case "Establishing":
                    break;
                case "Established":
                    sdh = inviter.sessionDescriptionHandler;

                    // a reference to this inviters session description handler to get media details if needed

                    break;
                case "Terminating":
                    break;
                case "Terminated":
                    sdh = inviter.sessionDescriptionHandler;
                    sdh.close();
                    break;
                default:
                    // throw new Error("Unknown state.");
                    console.log("Unknown state.", state);
            }
        });

        await inviter.invite();
    }

}

export default SIP;