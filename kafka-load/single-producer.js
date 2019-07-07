var config = require('./config'),
    kafkaConfig = config.kafkaConfig,
    testConfig = config.testConfig;
    
var kafka = require('kafka-node'),
    /**
     * The default value of KafkaClient's kafkaHost field is localhost:9092, 
     * so passing {kafkaHost: 'localhost:9092'} as a constructor parameter
     * does not change anything.
     * 
     * If you have more than one kafka broker, then append one after 
     * another separated by comma, like below:
     * "192.168.10.21:9092,192.168.10.22:9092,192.168.10.23:9092"
     */
    client = new kafka.KafkaClient({kafkaHost: kafkaConfig.brokers }),
    producer = new kafka.Producer(client, kafkaConfig.producer.options);

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

// when the producer is ready
producer.on('ready', async () => {
    console.log("Kafka producer is ready");

    var startTime = (new Date).getTime();
    payload.forEach((message) => {
        producer.send([message], (err, data) => {
            if (err) {
                failureCount++;
            } else if (data) {
                successCount++;
            } else {
                unknownCount++;
            }
        })
    });

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

    producer.close();
})

function shouldWait() {
    return successCount + failureCount + unknownCount != payload.length;
}

producer.on('error', error => {
    console.log("AN ERROR HAS OCCURRED: ");
    console.log(error);
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}