module.exports = (sequelize, Sequelize) => {
  const Freelancer = sequelize.define('freelancer', {
    firstName: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },

    //check format
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    //check format
    phoneNumber: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
        isNumeric: true,
      },
    },
    address: {
      type: Sequelize.STRING,
    },
    website: {
      type: Sequelize.STRING,
    },
  });

  return Freelancer;
};
