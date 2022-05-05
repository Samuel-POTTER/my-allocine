import * as chai from 'chai';
import chaiHttp from 'chai-http';
import { expect, request } from 'chai';
import { Response } from 'superagent';

import 'mocha';
import API_CNF from '../config/config';

chai.use(chaiHttp);

describe(`Hello API Request on ${process.env.API_PORT} ${'http://'}${API_CNF.API.getInstance().Domain}:${
    API_CNF.API.getInstance().Port
}`, () => {
    it("should return 'hello' on call", async () => {
        const res: Response = await request(
            `${'http://'}${API_CNF.API.getInstance().Domain}:${API_CNF.API.getInstance().Port}`
        ).get(`/app/hi`);
        expect(res).to.have.status(200);
        console.log(res.text);
        expect(res.text).to.eql('hello');
    });
});
