import * as amqp from 'amqplib'
interface PubSub {
    connection: amqp.Connection
    channel: amqp.Channel
    moduleName: string
    channelName: string
    q: string
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
    async publish<Promise>(msg:any, closeChannel = true) {
        return this.connection.createChannel().then( async (channel) => {
            this.channel = channel;
            await channel.assertQueue(this.q, { durable: false });
            channel.sendToQueue(this.q, Buffer.from(msg));
            console.log(" [x] Sent '%s'", msg);
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


export default PubSub;