import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { CreateSubscriptionDTO } from './dto/request/create.subscription.dto';
import { SubscriptionDTO } from './dto/subscription.dto';
import { ServiceLogger } from '../logger/logger.service';
import { SubscriptionMeshService } from '../mesh/subscription';
import { handleError } from '../common/helper';
import { toSubscriptionDTO, toSubscriptionsListDTO } from './public.mapper';

@Injectable()
export class PublicService {
    constructor(
        private readonly logger: ServiceLogger,
        private subscriptionService: SubscriptionMeshService
    ) {
        const instance = this.constructor;
        logger.setContext(instance.name);
    }

    createSubscription(
        newSubscription: CreateSubscriptionDTO
    ): Observable<SubscriptionDTO> {
        this.logger.info(`Providing new subscription for ${newSubscription.email}`);

        return this.subscriptionService.createSubscription(
            newSubscription
        ).pipe(
            map(toSubscriptionDTO),
            catchError(handleError(this.logger))
        );
    }

    getAllSubscriptions(): Observable<SubscriptionDTO[]> {
        this.logger.info('Providing all subscriptions');

        return this.subscriptionService.getAllSubscriptions()
            .pipe(
                map(toSubscriptionsListDTO),
                catchError(handleError(this.logger))
            );
    }
}
