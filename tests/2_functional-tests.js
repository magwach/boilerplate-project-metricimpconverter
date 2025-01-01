import * as chai from 'chai';
const assert = chai.assert;
import { suite, test } from 'mocha';
import chaiHttp  from 'chai-http';
import ConvertHandler from '../controllers/convertHandler.js';
let convertHandler = new ConvertHandler();
chai.use(chaiHttp);
import server from '../server.js'; // Assuming this is where the Express app is set up

suite('Functional Tests', function() {
  
  // Test: Convert a valid input such as 10L
  test('ConvertHandler should correctly convert gal to L via API', function(done) {
    chai.request(server).keepOpen()
      .get('/api/convert')
      .query({ input: '10L' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'initNum');
        assert.property(res.body, 'initUnit');
        assert.property(res.body, 'returnNum');
        assert.property(res.body, 'returnUnit');
        assert.isString(res.body.string);
        done();
      });
  });

  // Test: Convert an invalid input such as 32g
  test('ConvertHandler should return an error for invalid input unit', function(done) {
    chai.request(server).keepOpen()
      .get('/api/convert')
      .query({ input: '32g' })
      .end(function(err, res) {
        assert.equal(res.status, 400);
        assert.equal(res.body.error, 'invalid unit');
        done();
      });
  });

  // Test: Convert an invalid number such as 3/7.2/4kg
  test('ConvertHandler should return an error for invalid number format', function(done) {
    chai.request(server).keepOpen()
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end(function(err, res) {
        assert.equal(res.status, 400);
        assert.equal(res.body.error, 'invalid number');
        done();
      });
  });

  // Test: Convert an invalid number AND unit such as 3/7.2/4kilomegagram
  test('ConvertHandler should return an error for invalid number AND unit', function(done) {
    chai.request(server).keepOpen()
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end(function(err, res) {
        assert.equal(res.status, 400);
        assert.equal(res.body.error, 'invalid number and unit');
        done();
      });
  });

  // Test: Convert with no number such as kg
  test('ConvertHandler should default to 1 for missing number in input', function(done) {
    chai.request(server).keepOpen()
      .get('/api/convert')
      .query({ input: 'kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.property(res.body, 'initUnit');
        assert.property(res.body, 'returnNum');
        assert.property(res.body, 'returnUnit');
        done();
      });
  });

});
