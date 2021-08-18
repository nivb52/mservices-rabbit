import * as amqp from 'amqplib';
import { Blob, Buffer } from 'buffer';
interface PubSub {
    connection: amqp.Connection
    channel: amqp.Channel
    moduleName: string
    channelName: string
    q: string
}

interface createMessageOptions {
    buffer?:boolean
    text?: boolean
}
class PubSub {

    constructor(moduleName, channelName, qName) {
        this.moduleName = moduleName;
        this.channelName = channelName;
        this.q = qName;
    }

    async init<Promise>() {
        try {
            this.connection = await amqp.connect(process.env.AMQP);
            globalThis.connections.push(this.connection);
        } catch (err) {
            console.warn(err)
        }
    }

    async close() {
        this.connection.close();
    }
    async publish<Promise>(text?: string | null, data?: ArrayBuffer | null, closeChannel = true) {
        return this.connection.createChannel().then( async (channel) => {
            this.channel = channel;
            await channel.assertQueue(this.q, { durable: false });
            channel.sendToQueue(this.q, text ? Buffer.from(text)  : Buffer.from(data));
            console.log(" [x] Sent '%s'", text);
            return closeChannel ? channel.close() : channel;
        });
    }
    async consume<Promise>() {
        this.connection.createChannel().then(function (channel) {
            this.channel = channel;
            channel.consume(this.q, function (msg) {
                if (msg !== null) {
                    console.log(msg.content.toString());
                    channel.ack(msg);
                }
            });
        });
    }
    
    subscribe = this.consume;

}

const createDataObject = (event: string, payload: Object, metadata: Object, options: createMessageOptions = { text: true }): string => 
    JSON.stringify({ event, payload, metadata });

export const createBlobMessage = (event: string, payload: Object, metadata: Object, options: createMessageOptions = { text: true }) : Blob => 
        new Blob([createDataObject(event, payload, metadata)]);

export const createTextMessage = (event: string, payload: Object, metadata: Object, options: createMessageOptions = { text: true }):  string => 
    createDataObject(event, payload, metadata);
;


    export default PubSub;