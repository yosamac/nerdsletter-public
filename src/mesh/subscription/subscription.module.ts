import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { SubscriptionMeshService } from './subscription.service';
import { SUBSCRIPTION_MESH_CLIENT } from './subscription.constant';

const SubscriptionProvider = {
    provide: SUBSCRIPTION_MESH_CLIENT,
    useFactory: (config: ConfigService) => {
        return ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: config.get<string>('mesh.subscription.host'),
                port: config.get<number>('mesh.subscription.port')
            }
        });
    },
    inject: [ConfigService]
};

@Module({
    providers: [SubscriptionMeshService, SubscriptionProvider],
    exports: [SubscriptionMeshService]
})
export class SubscriptionMeshModule {}
