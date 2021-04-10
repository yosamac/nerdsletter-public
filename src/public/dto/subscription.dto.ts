import { ApiProperty } from '@nestjs/swagger';

import { CreateSubscriptionDTO } from './request/create.subscription.dto';

export class SubscriptionDTO extends CreateSubscriptionDTO {
    @ApiProperty()
    createdAt: string;
    @ApiProperty()
    modifiedAt: string;
}