"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Patients", [
      {
        name: "Rahul Sharma",
        age: 28,
        gender: "Male",
        phone: "9876543210",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Priya Verma",
        age: 32,
        gender: "Female",
        phone: "9876543211",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Amit Patel",
        age: 45,
        gender: "Male",
        phone: "9876543212",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Patients", {
      phone: ["9876543210", "9876543211", "9876543212"],
    });
  },
};