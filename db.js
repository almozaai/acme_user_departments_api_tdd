const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4 } = Sequelize;

const conn = new Sequelize('postgres://localhost/user_departments_db', { logging: false });

const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }

});

const create = (items, model) => {
  return Promise.all(items.map(item => model.create(item)));
};

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const users = [
    { name: 'user1' },
    { name: 'user2' },
    { name: 'user3' }
  ];

  const [user1, user2,user3] = await create(users, User);

  return {
    users: {
      user1,
      user2,
      user3
    }
  }

};

module.exports = {
  syncAndSeed,
  models: {
    User
  }
}
