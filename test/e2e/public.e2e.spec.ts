import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';

import { MainModule } from '../../src/main.module';
import { SubscriptionMeshService } from '../../src/mesh/subscription';
import {
    SubscriptionServiceMock,
    emailRegistered,
    validNewsletterId,
    validSubscriptionId
} from '../mock/mesh.mock';

describe('PublicController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        process.env = Object.assign(process.env, {
            LOGGING_LEVEL: 'NONE',
        });

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ MainModule ],
        })
            .overrideProvider(SubscriptionMeshService)
            .useClass(SubscriptionServiceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe ('/subscriptions', () => {

        it('/ (POST) 201', () => {
            const validSubscription = {
                email: 'yos@nerdsletter.com',
                dateOfBirth: '1990-08-24',
                flagForConsent: true,
                newsletterId: 'campaign-1',
                firstName: 'Yosnier',
                gender: 'MALE'
            };
            return request(app.getHttpServer())
                .post('/subscriptions').send(validSubscription)
                .expect(HttpStatus.CREATED);
        });

        it('/ (POST) 400', () => {
            const validSubscription = {
                email: 'invalida-email.com',
                dateOfBirth: '1990-08-24',
                flagForConsent: true,
                newsletterId: 'campaign-1',
                firstName: 'Yosnier',
                gender: 'MALE'
            };
            return request(app.getHttpServer())
                .post('/subscriptions').send(validSubscription)
                .expect(HttpStatus.BAD_REQUEST);
        });

        it('/ (POST) 409', () => {
            const validSubscription = {
                email: emailRegistered,
                dateOfBirth: '1990-08-24',
                flagForConsent: true,
                newsletterId: validNewsletterId,
                firstName: 'Yosnier',
                gender: 'MALE'
            };
            return request(app.getHttpServer())
                .post('/subscriptions').send(validSubscription)
                .expect(HttpStatus.CONFLICT);
        });

        it('/ (GET) 200', () => {
            return request(app.getHttpServer())
                .get('/subscriptions')
                .expect(HttpStatus.OK);
        });

        it('/:id (GET) 200', () => {
            return request(app.getHttpServer())
                .get(`/subscriptions/${validSubscriptionId}`)
                .expect(HttpStatus.OK);
        });

        it('/:id (GET) 404', () => {
            return request(app.getHttpServer())
                .get('/subscriptions/invalid-Id')
                .expect(HttpStatus.NOT_FOUND);
        });

        it('/:id (DELETE) 204', () => {
            return request(app.getHttpServer())
                .delete(`/subscriptions/${validSubscriptionId}`)
                .expect(HttpStatus.NO_CONTENT);
        });

        it('/:id (DELETE) 404', () => {
            return request(app.getHttpServer())
                .delete('/subscriptions/invalid-Id')
                .expect(HttpStatus.NOT_FOUND);
        });
    });
});
