import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { SubscriptionMeshModule } from '../mesh/subscription';

@Module({
    imports:[ConfigModule, SubscriptionMeshModule ],
    controllers: [PublicController],
    providers: [PublicService]
})
export class PublicModule {}
