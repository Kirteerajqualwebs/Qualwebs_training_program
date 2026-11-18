
const User = require("./User");
const Patient = require("./Patient");
const Doctor = require("./Doctor");
const Appointment = require("./Appointment");

// Patient - Appointment relationship
Patient.hasMany(Appointment, {
  foreignKey: "patientId",
});

Appointment.belongsTo(Patient, {
  foreignKey: "patientId",
});

// Doctor - Appointment relationship
Doctor.hasMany(Appointment, {
  foreignKey: "doctorId",
});

Appointment.belongsTo(Doctor, {
  foreignKey: "doctorId",
});

module.exports = {
  User,
  Patient,
  Doctor,
  Appointment,
};
