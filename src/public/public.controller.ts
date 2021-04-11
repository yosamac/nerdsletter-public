import {
    Controller, UseFilters,
    Post, Get, Body, HttpStatus,
    HttpCode
} from '@nestjs/common';
import { ApiResponse, ApiTags, } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { PublicService } from './public.service';
import { SubscriptionDTO, } from './dto/subscription.dto';
import {
    CreateSubscriptionDTO,
    CreateSubscriptionPipe,
} from './dto/request/create.subscription.dto';
import {
    ServiceHttpResponse,
    HttpExceptionFilter,
} from '../common/exception.filter';
import { isArray } from 'util';

@Controller('subscriptions')
@ApiTags('Subscription')
@UseFilters(HttpExceptionFilter)
export class PublicController {
    constructor(private readonly publicService: PublicService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The subscriptions was successfully created',
        type: SubscriptionDTO
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Payload doesn\'t meet the schema',
        type: ServiceHttpResponse
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'The user already subscribed. Email and newsletterId must be unique',
        type: ServiceHttpResponse,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal error',
        type: ServiceHttpResponse
    })
    createSubscription(
        @Body(CreateSubscriptionPipe) newSubscription: CreateSubscriptionDTO
    ): Observable<SubscriptionDTO> {
        return this.publicService.createSubscription(newSubscription);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The subscriptions was successfully returned',
        type: [SubscriptionDTO]
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal error',
        type: ServiceHttpResponse
    })
    getAllSubscriptions(): Observable<SubscriptionDTO[]> {
        return this.publicService.getAllSubscriptions();
    }

}
