const products = require("./products/products.service.js");
const orders = require("./orders/orders.service.js");
const customers = require("./customers/customers.service.js");
const vehicles = require("./vehicles/vehicles.service.js");
const loyaltyPrograms = require("./loyaltyPrograms/loyaltyPrograms.service.js");
const invoices = require("./invoices/invoices.service.js");
const services = require("./services/services.service.js");
const serviceRecords = require("./serviceRecords/serviceRecords.service.js");
const maintenanceSchedules = require("./maintenanceSchedules/maintenanceSchedules.service.js");
const oilChangeRecords = require("./oilChangeRecords/oilChangeRecords.service.js");
const technicians = require("./technicians/technicians.service.js");
const partsInventory = require("./partsInventory/partsInventory.service.js");
const suppliers = require("./suppliers/suppliers.service.js");
const paymentMethods = require("./paymentMethods/paymentMethods.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(products);
  app.configure(orders);
  app.configure(customers);
  app.configure(vehicles);
  app.configure(loyaltyPrograms);
  app.configure(invoices);
  app.configure(services);
  app.configure(serviceRecords);
  app.configure(maintenanceSchedules);
  app.configure(oilChangeRecords);
  app.configure(technicians);
  app.configure(partsInventory);
  app.configure(suppliers);
  app.configure(paymentMethods);
    // ~cb-add-configure-service-name~
};
