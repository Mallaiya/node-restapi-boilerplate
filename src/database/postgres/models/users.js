const { BCRYPT_HASH } = require('../../../services/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      dob: DataTypes.DATEONLY,
      phoneNumber: DataTypes.BIGINT,
      password: DataTypes.STRING
    }
    // {
    //   hooks: {
    //     async beforeValidate(user) {
    //       // eslint-disable-next-line no-param-reassign
    //       user.password = await BCRYPT_HASH.generateHash(user.password);
    //     }
    //   }
    // }
  );
  return User;
};
