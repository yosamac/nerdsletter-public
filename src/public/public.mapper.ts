import { SubscriptionDTO } from './dto/subscription.dto';
import { GENDER } from './dto/request/create.subscription.dto';


/**
 * @description Transform subscription service response at SubscriptionDTO format
 * @param other
 * @typeParam any
 * @returns SubscriptionDTO
 * @category Mapper
 */
export function toSubscriptionDTO(other: any): SubscriptionDTO {

    const dto: SubscriptionDTO = {
        id: other.id,
        email: other.email,
        dateOfBirth: other.dateOfBirth,
        flagForConsent: other.flagForConsent,
        newsletterId: other.newsletterId,
        firstName: other.firstName,
        gender: GENDER[other.gender],
        createdAt: other.createdAt,
        modifiedAt: other.modifiedAt
    };

    return dto;
}

export function toSubscriptionsListDTO(other: any): SubscriptionDTO[] {
    return other.map(toSubscriptionDTO);
}