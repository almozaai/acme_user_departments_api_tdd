const { expect } = require('chai');
const db = require('./db');
const { User, Department } = db.models;
const app = require('supertest')(require('./app'));

describe('Models: Users', () => {
  let seed;
  beforeEach(async () => seed = await db.syncAndSeed());
  describe('User Model', () => {
    it('User1, User2, and User3 are users', () => {
      expect(seed.users.user1.name).to.equal('user1');
      expect(seed.users.user2.name).to.equal('user2');
      expect(seed.users.user3.name).to.equal('user3');
    });
    it('A user belongs to a department', () => {
      expect(seed.users.user1.departmentId).to.equal(seed.departments.HR.id);
    });
  });
  describe('Hooks', () => {
    it('An empty depatmentId will get set to null', async () => {
      const user = await User.create({name: 'user4', departmentId: ''});
      expect(user.departmentId).to.equal(null);
    })
  });
  describe('User Validation', () => {
    it('name cannot be an empty string', () => {
      return User.create({name: ''})
        .then(() => {
          throw new 'Name cannot be empty!';
        })
        .catch(ex => expect(ex.errors[0].path).to.equal('name'));
    });
  });
});

describe('API User Routes', () => {
  let seed;
  beforeEach(async () => seed = await db.syncAndSeed());
  describe('GET /api/users', () => {
    it('returns the users', () => {
      return app.get('/api/users')
        .expect(200)
        .then(response => {
          expect(response.body.length).to.equal(3);
        });
    });
  });
  describe('POST /api/users', () => {
    it('add a user', () => {
      return app.post('/api/users')
        .send({ name: 'user4', departmentId: ''})
        .expect(201)
        .then( response => {
          expect(response.body.name).to.equal('user4');
          expect(response.body.departmentId).to.equal(null);
        });
    });
  });
  describe('PUT /api/users', () => {
    it('updates a user', () => {
      return app.put(`/api/users/${seed.users.user1.id}`)
        .send({name: 'user1.1', departmentId: seed.departments.IT.id})
        .expect(200)
        .then( response => {
          expect(response.body.name).to.equal('user1.1');
          expect(response.body.departmentId).to.equal(seed.departments.IT.id);
        });
    });
  });
  describe('DELETE /api/users', () => {
    it('deletes a user', () => {
      return app.delete(`/api/users/${seed.users.user2.id}`)
        .expect(204);
    });
  });
});

describe('API Department Routes', () => {
  let seed;
  beforeEach(async () => seed = await db.syncAndSeed());
  describe('GET /api/departments', () => {
    it('returns all departments', () => {
      return app.get('/api/departments')
        .expect(200)
        .then( response => {
          expect(response.body.length).to.equal(3);
        });
    });
  });
  describe('POST /api/departments', () => {
    it('creates a department', () => {
      return app.post('/api/departments')
        .send({name: 'LG'})
        .expect(201)
        .then( response => {
          expect(response.body.name).to.equal('LG');
        });
    });
  });
  describe('PUT /api/departments', () => {
    it('updates a department', () => {
      return app.put(`/api/departments/${seed.departments.FN.id}`)
        .send({name: 'TL'})
        .expect(200)
        .then( response => {
          expect(response.body.name).to.equal('TL');
        });
    });
  });
  describe('DELETE /api/departments', () => {
    it('delete a department', () => {
      return app.delete(`/api/departments/${seed.departments.IT.id}`)
        .expect(204);
    });
  });
});
