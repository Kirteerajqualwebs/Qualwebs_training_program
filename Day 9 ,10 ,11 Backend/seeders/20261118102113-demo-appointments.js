"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Appointments", [
      {
        patientId: 1,
        doctorId: 1,
        date: new Date("2026-11-20T10:00:00"),
        status: "scheduled",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {PostgreSQL setup




        patientId: 2,
        doctorId: 2,
        date: new Date("2026-11-21T11:00:00"),
        status: "scheduled",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Appointments", {
      patientId: [1, 2],
      doctorId: [1, 2],
    });
  },
};