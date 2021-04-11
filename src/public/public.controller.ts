import {
    Controller, UseFilters,
    Post, Get, Body, HttpStatus,
    HttpCode,
    Param
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { PublicService } from './public.service';
import { SubscriptionDTO, } from './dto/subscription.dto';
import { SubscriptionIdPipe, SubscriptionIdDTO } from './dto/request/subscription.id.dto';
import {
    CreateSubscriptionDTO,
    CreateSubscriptionPipe,
} from './dto/request/create.subscription.dto';
import {
    ServiceHttpResponse,
    HttpExceptionFilter,
} from '../common/exception.filter';

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
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The subscriptions were successfully returned',
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

    @Get('/:id')
    @ApiParam({ name: 'id' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The subscription was successfully returned',
        type: SubscriptionDTO
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'The subscription wasn\'t found',
        type: ServiceHttpResponse,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal error',
        type: ServiceHttpResponse
    })
    getSubscription(
        @Param(SubscriptionIdPipe) param: SubscriptionIdDTO
    ): Observable<SubscriptionDTO> {
        return this.publicService.getSubscription(param.id);
    }

}
