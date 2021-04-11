import { of, throwError } from 'rxjs';

export const emailRegistered = 'valid@email.com';
export const validNewsletterId = 'validNerdsLetter';

export const validSubscriptionId = 'validSubscriptionId';
const validSubscription = {
    id: validSubscriptionId,
    email: 'yos@nerdsletter.com',
    dateOfBirth: '1990-08-24',
    flagForConsent: true,
    newsletterId: 'campaign-1',
    firstName: 'Yosnier',
    gender: 'MALE'
};


export class SubscriptionServiceMock {
    createSubscription(data) {
        if (data.email == emailRegistered &&
            data.newsletterId == validNewsletterId
        ) {
            return throwError({ code: 6, details: 'Email already exists' });
        }
        return of(data);
    }

    getAllSubscriptions(){
        return of([validSubscription]);
    }

    getSubscription(id: string) {
        return id == validSubscriptionId
            ? of(validSubscription)
            : throwError({ code: 5, details: 'Subscription not found' });
    }

    cancelSubscription(id: string) {
        return id == validSubscriptionId
            ? of(validSubscriptionId)
            : throwError({ code: 5, details: 'Subscription not found' });
    }
}
