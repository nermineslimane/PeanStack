module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define('project', {
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    startDate: {
      type: Sequelize.DATE,
      validate: {
        notEmpty: true,
        isDate: true,
      },
    },
    endDate: {
      type: Sequelize.DATE,
      validate: {
        notEmpty: true,
        isDate: true,
      },
    },
    duration: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      type: Sequelize.STRING,

      validate: {
        isIn: [['mobile', 'web', 'both']],
        notEmpty: true,
      },
    },
  });

  return Project;
};
