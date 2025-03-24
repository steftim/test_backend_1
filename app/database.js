import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
});

const Messages = sequelize.define(
  'Messages',
  {
    User: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Message: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }
);

try {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const message = {};

message.add = async (user, message) => {
  return Messages.create({
    User: user,
    Message: message
  });
};

message.update = async (message, id) => {
  return Messages.update({
    Message: message
  },
  {
    where: {
      id: id
    }
  });
};

message.delete = async (id) => {
  return Messages.destroy(
  {
    where: {
      id: id
    }
  });
};


message.getAll = async () => {
  return Messages.findAll();
};

message.getByUser = async (user) => {
  return Messages.findAll({
    where: {
      user: user
    }
  });
};



export default message;
