import chai from 'chai';
import nock from 'nock';
import index from '../index';

const { expect } = chai;


nock('https://www.google.com/')
  .get('/api/v1/auth/google')
  .reply(200, 'Welcome to Author Haven', {
  });

nock('https://www.twitter.com/')
  .get('/api/v1/auth/twitter')
  .reply(200, 'Welcome to Author Haven', {
  });

nock('https://www.facebook.com/')
  .get('/api/v1/auth/facebook')
  .reply(200, 'Welcome to Author Haven');

describe('google strategy', () => {
  it('should call the google route', async () => {
    const response = await chai.request(index).get('/api/v1/auth/google');
    expect(response).to.have.status(200);
  });
});

describe('twitter strategy', () => {
  it('should call the twitter route', async () => {
    const response = await chai.request(index).get('/api/v1/auth/twitter');
    expect(response).to.have.status(200);
  });
});

describe('facebook strategy', () => {
  it('should be a function', () => {
  });
});