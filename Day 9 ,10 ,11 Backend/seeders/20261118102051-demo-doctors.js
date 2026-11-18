"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Doctors", [
      {
        name: "Dr. Sharma",
        specialization: "Cardiologist",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dr. Verma",
        specialization: "Neurologist",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dr. Patel",
        specialization: "Dermatologist",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Doctors", {
      name: ["Dr. Sharma", "Dr. Verma", "Dr. Patel"],
    });
  },
};