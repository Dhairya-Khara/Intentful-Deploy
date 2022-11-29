function processTranscript(existingProcessedMap, transcript_json_list) {
    let processedMap = new Map(existingProcessedMap)

    for (const transcript_json of transcript_json_list) {
        processSingleTranscript(transcript_json, processedMap);
    }
    return processedMap

}

function processSingleTranscript(transcript_json, processedMap) {
    let prevIntent = undefined; // initialize

    // iterate over each message in a single transcript
    for (let i = 0; i < transcript_json.length; i++) {
        let message = transcript_json[i];
        // some intents have multiple intents, so we iterate through that as well
        for (const intent of message.intents) {
            updateCurrIntentInProcessedMap(intent);

            if (prevIntent !== undefined && prevIntent !== intent) {
                updatePrevIntentInProcessedMap(intent);
            }
            prevIntent = intent;
        }
    }

    function updateCurrIntentInProcessedMap(intent) {
        if (!processedMap.has(intent)) { // add intent to processedMap
            processedMap.set(intent, [1, new Map()]);
        }
        else { // update existing intent frequency and its associates in the map
            const currList = processedMap.get(intent);
            const newIntentFreq = currList[0] + 1;
            const sameAssociateMap = currList[1];

            processedMap.set(intent, [newIntentFreq, sameAssociateMap]);
        }
    }

    function updatePrevIntentInProcessedMap(intent) {
        const currList = processedMap.get(prevIntent);
        let newAssociateMap = undefined;
        if (currList[1] instanceof Map) {
            newAssociateMap = currList[1];
        }
        else {
            newAssociateMap = new Map(Object.entries(currList[1]));
        }
        if (!newAssociateMap.has(intent)) {
            newAssociateMap.set(intent, 1);
        }
        else {
            const newIntentAssociateFreq = newAssociateMap.get(intent) + 1;
            newAssociateMap.set(intent, newIntentAssociateFreq);
        }
        currList[1] = newAssociateMap;
    }
}

module.exports = processTranscript