import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

import { JoiValidationPipe } from '../../../common/joi.validation.pipe';

export enum GENDER {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

const validOptions = Object.keys(GENDER);

export class CreateSubscriptionDTO {
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly dateOfBirth: string;
    @ApiProperty()
    readonly flagForConsent: boolean;
    @ApiProperty()
    readonly newsletterId: string;
    @ApiProperty()
    readonly firstName: string;
    @ApiProperty()
    readonly gender: string;
}

export const CreateSubscriptionSchema = Joi.object({
    email: Joi.string().required().email({ minDomainSegments: 2 })
        .label('email').description('User email'),
    dateOfBirth: Joi.string().required()
        .label('dateOfBirth').description('User date of birth'),
    flagForConsent: Joi.boolean().required()
        .label('flagForConsent').description('User flag for consent'),
    newsletterId: Joi.string().required().default('default-campaign')
        .label('newsletterId').description('Newsletter ID'),
    firstName: Joi.string().optional()
        .label('firstName').description('User first name'),
    gender: Joi.string().optional().valid(...validOptions).uppercase()
        .label('gender').description('User gender'),
});

export const CreateSubscriptionPipe =
    new JoiValidationPipe(CreateSubscriptionSchema);