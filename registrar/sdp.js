class SessionDescriptionHandler {

    constructor(session, options) {
        this.localSDP = null;
        this.remoteSDP = null;
    }

    async getDescription(options, modifiers) {

        return new Promise((resolve, reject) => {
            let sdp = "YOUR_MEDIA_SDP";
            resolve(sdp);
        });

    }

    async setDescription(sdp, options, modifiers) {
        this.remoteSDP = sdp;
        return new Promise((resolve, reject) => {

            // Handle setDescription
            resolve();

        });
    }

    hasDescription(contentType) {
        return contentType === 'application/sdp';
    }

    async close() {
        // end media
    }

    sendDtmf(tones, options) { }

}

export default SessionDescriptionHandler;