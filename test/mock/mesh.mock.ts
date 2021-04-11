import { of, throwError } from 'rxjs';

export const emailRegistered = 'valid@email.com';
export const validNewsletterId = 'validNerdsLetter';

const validSubscription = {
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
}
