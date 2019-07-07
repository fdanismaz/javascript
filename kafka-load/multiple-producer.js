var config = require('./config'),
    kafkaConfig = config.kafkaConfig,
    testConfig = config.testConfig;
    
var kafka = require('kafka-node');
const uuid = require('uuid/v1');

// create a produce request object
var payload = [];
var successCount = 0;
var failureCount = 0;
var unknownCount = 0;

// Prepare messages to send to kafka
for (var i = 0; i < testConfig.loopCount; i++) {
    /**
     * A sample JSON object to be sent to kafka
     */
    let incident = {
        id : uuid(),
        type : 'Security Breach',
        file : '/users/test/file-1'
    }

    // Create a kafka KeyedMessage object which will be sent to kafka
    let message = new kafka.KeyedMessage(incident.id, incident);

    payload.push({
        topic: kafkaConfig.topics.incidents,
        messages: message
    });
}

console.log(payload.length + " messages are ready. COMMENCING LOAD");

var startTime = (new Date).getTime();

payload.forEach(message => {
    let client = new kafka.KafkaClient({kafkaHost: kafkaConfig.brokers });
    let producer = new kafka.Producer(client, kafkaConfig.producer.options);

    producer.on('ready', () => {
        producer.send([message], (err, data) => {
            if (err) {
                failureCount++;
                console.log(err);
            } else if (data) {
                successCount++;
            } else {
                unknownCount++;
            }
            producer.close();
        })    
    });

    producer.on('error', error => {
        console.log("AN ERROR HAS OCCURRED: ");
        console.log(error);
    })
});

waitForCompletion();


function shouldWait() {
    return successCount + failureCount + unknownCount != payload.length;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForCompletion() {
    while (shouldWait()) {
        await sleep(50);
    }

    var endTime = (new Date).getTime();

    console.log("Process completed. " + payload.length + " messages have been sent.");
    console.log("SUCCESS count : " + successCount);
    console.log("FAILURE count : " + failureCount);
    console.log("UNKNOWN count : " + unknownCount);
    console.log("START TIME: " + startTime);
    console.log("END TIME: " + endTime);
    console.log("DURATION: " + (endTime - startTime));
}