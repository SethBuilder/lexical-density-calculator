// const { wordCounter } = require('../../util');
const app = require('./index')
const supertest = require('supertest')
const request = supertest(app)
var assert = require('assert')
const text = 'This is a test phrase. And this is another one.';

it('should output lexical density for text', async (done) => {
    await request.get('/api/words')
        .send({ text: text })
        .then(response => {
            assert.equal(response.body.data.overall_ld, 0.7)
        })
        ;
    done()
}, 10000)

it('should output 422 error for text being over a 100 word', async (done) => {
    await request.get('/api/words')
        .send({ text: 'word '.repeat(110) })
        .then(response => {
            assert.equal(response.status, 422)
        })
        ;
    done()
}, 10000)

it('should output 422 error for text being over a 100 word', async (done) => {
    await request.get('/api/words')
        .send({ text: 'c'.repeat(1500) })
        .then(response => {
            assert.equal(response.status, 422)
        })
        ;
    done()
}, 10000)