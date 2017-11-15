import 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import User from '../../../src/models/User';

const expect = chai.use(chaiAsPromised).expect;

describe('User Model', () => {
  beforeEach(() => {
    return User.destroy({where: {'userName': {$not: 'admin'}}});
  });

  describe('#create', function () {
    it('create with invalid email', () => {
      return expect(User.create<User>({
        firstName: 'John',
        lastName: 'Doe',
        email: 'xxx'
      })).to.be.rejectedWith('Validation error');
    });

    const sampleUser = {firstName: 'John', lastName: 'Doe', email: 'jdoe@foo.com'};
    const samplePassport = {protocol: 'local', password: '12345678'};

  });

});
