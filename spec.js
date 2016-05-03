var request = require('supertest');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('./server');
  });
  afterEach(function () {
    server.close();
  });
  
  it('responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
  
    it('responds to /user', function testSlash(done) {
  request(server)
    .get('/user')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
  
    it('responds to /user/1 ', function testSlash(done) {
  request(server)
    .get('/user/1')
    .expect('Content-Type', /json/)
    .expect(200, {
        id: 1,
        username: "goldroger",
        name:"Gol D. Roger",
        position:"Pirate King"
      }, done);
  });
  
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});