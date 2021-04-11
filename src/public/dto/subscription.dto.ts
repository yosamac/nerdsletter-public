import { ApiProperty } from '@nestjs/swagger';

import { CreateSubscriptionDTO } from './request/create.subscription.dto';

export class SubscriptionDTO extends CreateSubscriptionDTO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    createdAt: string;
    @ApiProperty()
    modifiedAt: string;
}