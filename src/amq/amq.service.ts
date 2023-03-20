import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RmqRecordBuilder } from "@nestjs/microservices";


@Injectable()
export class RmqEventService {
    constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

    async sendEvent() {
        try{
            
            const message = {message: 'dummy'}
            const record = new RmqRecordBuilder(message)
                .setOptions({
                    headers: {
                        ['x-version']: '1.0.0',
                    },
                    priority: 3,
                })
                .build();
            const result = await this.client.emit('user', record);
            console.log('message::', message)
            return result
        } catch(error) {
            console.log(error)
        }
    }
}