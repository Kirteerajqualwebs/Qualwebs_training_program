"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("Demo@123", 10);

    await queryInterface.bulkInsert("Users", [
      {
        name: "Admin User",
        email: "admin@medicare.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Receptionist User",
        email: "receptionist@medicare.com",
        password: hashedPassword,
        role: "receptionist",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", {
      email: ["admin@medicare.com", "receptionist@medicare.com"],
    });
  },
};
