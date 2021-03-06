import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { SUBSCRIPTION_MESH_CLIENT } from './subscription.constant';

@Injectable()
export class SubscriptionMeshService {
    constructor(
        @Inject(SUBSCRIPTION_MESH_CLIENT)
        private readonly subscriptionClient: ClientProxy
    ) {}

    createSubscription(data: any): Observable<any> {
        return this.subscriptionClient.send<any>(
            { cmd: 'createSubscription' },
            { ...data }
        );
    }

    getAllSubscriptions(): Observable<any[]> {
        return this.subscriptionClient.send<any>(
            { cmd: 'getAllSubscriptions' },
            { }
        );
    }

    getSubscription(id: string): Observable<any> {
        return this.subscriptionClient.send<any>(
            { cmd: 'getSubscription' },
            { id }
        );
    }

    cancelSubscription(id: string): Observable<any> {
        return this.subscriptionClient.send<any>(
            { cmd: 'cancelSubscription' },
            { id }
        );
    }
}
