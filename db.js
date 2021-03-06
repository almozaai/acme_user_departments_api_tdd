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
    unique: true,
    validate: {
      notEmpty: true
    }
  }
}, {
  hooks: {
    beforeSave: function(user) {
      if(user.departmentId === ''){
        user.departmentId = null;
      }
    }
  }
});

const Department = conn.define('department', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
});

User.belongsTo(Department);

const create = (items, model) => {
  return Promise.all(items.map(item => model.create(item)));
};

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const departments = [
    { name: 'HR' },
    { name: 'IT' },
    { name: 'FN' }
  ];

  const [HR, IT, FN] = await create(departments, Department);

  const users = [
    { name: 'user1', departmentId: HR.id },
    { name: 'user2', departmentId: IT.id },
    { name: 'user3', departmentId: FN.id }
  ];

  const [user1, user2,user3] = await create(users, User);

  return {
    users: {
      user1,
      user2,
      user3
    },
    departments: {
      HR,
      IT,
      FN
    }
  }

};

module.exports = {
  syncAndSeed,
  conn,
  models: {
    User,
    Department
  }
}
