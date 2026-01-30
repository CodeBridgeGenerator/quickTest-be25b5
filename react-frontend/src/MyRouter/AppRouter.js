import React from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

import SingleProductsPage from "../components/app_components/ProductsPage/SingleProductsPage";
import ProductProjectLayoutPage from "../components/app_components/ProductsPage/ProductProjectLayoutPage";
import SingleOrdersPage from "../components/app_components/OrdersPage/SingleOrdersPage";
import OrderProjectLayoutPage from "../components/app_components/OrdersPage/OrderProjectLayoutPage";
import SingleCustomersPage from "../components/app_components/CustomersPage/SingleCustomersPage";
import CustomerProjectLayoutPage from "../components/app_components/CustomersPage/CustomerProjectLayoutPage";
import SingleVehiclesPage from "../components/app_components/VehiclesPage/SingleVehiclesPage";
import VehicleProjectLayoutPage from "../components/app_components/VehiclesPage/VehicleProjectLayoutPage";
import SingleLoyaltyProgramsPage from "../components/app_components/LoyaltyProgramsPage/SingleLoyaltyProgramsPage";
import LoyaltyProgramProjectLayoutPage from "../components/app_components/LoyaltyProgramsPage/LoyaltyProgramProjectLayoutPage";
import SingleInvoicesPage from "../components/app_components/InvoicesPage/SingleInvoicesPage";
import InvoiceProjectLayoutPage from "../components/app_components/InvoicesPage/InvoiceProjectLayoutPage";
import SingleServicesPage from "../components/app_components/ServicesPage/SingleServicesPage";
import ServiceProjectLayoutPage from "../components/app_components/ServicesPage/ServiceProjectLayoutPage";
import SingleServiceRecordsPage from "../components/app_components/ServiceRecordsPage/SingleServiceRecordsPage";
import ServiceRecordProjectLayoutPage from "../components/app_components/ServiceRecordsPage/ServiceRecordProjectLayoutPage";
import SingleMaintenanceSchedulesPage from "../components/app_components/MaintenanceSchedulesPage/SingleMaintenanceSchedulesPage";
import MaintenanceScheduleProjectLayoutPage from "../components/app_components/MaintenanceSchedulesPage/MaintenanceScheduleProjectLayoutPage";
import SingleOilChangeRecordsPage from "../components/app_components/OilChangeRecordsPage/SingleOilChangeRecordsPage";
import OilChangeRecordProjectLayoutPage from "../components/app_components/OilChangeRecordsPage/OilChangeRecordProjectLayoutPage";
import SingleTechniciansPage from "../components/app_components/TechniciansPage/SingleTechniciansPage";
import TechnicianProjectLayoutPage from "../components/app_components/TechniciansPage/TechnicianProjectLayoutPage";
import SinglePartsInventoryPage from "../components/app_components/PartsInventoryPage/SinglePartsInventoryPage";
import PartsInventoryProjectLayoutPage from "../components/app_components/PartsInventoryPage/PartsInventoryProjectLayoutPage";
import SingleSuppliersPage from "../components/app_components/SuppliersPage/SingleSuppliersPage";
import SupplierProjectLayoutPage from "../components/app_components/SuppliersPage/SupplierProjectLayoutPage";
import SinglePaymentMethodsPage from "../components/app_components/PaymentMethodsPage/SinglePaymentMethodsPage";
import PaymentMethodProjectLayoutPage from "../components/app_components/PaymentMethodsPage/PaymentMethodProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
  return (
    <Routes>
      {/* ~cb-add-unprotected-route~ */}
      <Route element={<ProtectedRoute redirectPath={"/login"} />}>
        
<Route path="/products/:singleProductsId" exact element={<SingleProductsPage />} />
<Route path="/products" exact element={<ProductProjectLayoutPage />} />
<Route path="/orders/:singleOrdersId" exact element={<SingleOrdersPage />} />
<Route path="/orders" exact element={<OrderProjectLayoutPage />} />
<Route path="/customers/:singleCustomersId" exact element={<SingleCustomersPage />} />
<Route path="/customers" exact element={<CustomerProjectLayoutPage />} />
<Route path="/vehicles/:singleVehiclesId" exact element={<SingleVehiclesPage />} />
<Route path="/vehicles" exact element={<VehicleProjectLayoutPage />} />
<Route path="/loyaltyPrograms/:singleLoyaltyProgramsId" exact element={<SingleLoyaltyProgramsPage />} />
<Route path="/loyaltyPrograms" exact element={<LoyaltyProgramProjectLayoutPage />} />
<Route path="/invoices/:singleInvoicesId" exact element={<SingleInvoicesPage />} />
<Route path="/invoices" exact element={<InvoiceProjectLayoutPage />} />
<Route path="/services/:singleServicesId" exact element={<SingleServicesPage />} />
<Route path="/services" exact element={<ServiceProjectLayoutPage />} />
<Route path="/serviceRecords/:singleServiceRecordsId" exact element={<SingleServiceRecordsPage />} />
<Route path="/serviceRecords" exact element={<ServiceRecordProjectLayoutPage />} />
<Route path="/maintenanceSchedules/:singleMaintenanceSchedulesId" exact element={<SingleMaintenanceSchedulesPage />} />
<Route path="/maintenanceSchedules" exact element={<MaintenanceScheduleProjectLayoutPage />} />
<Route path="/oilChangeRecords/:singleOilChangeRecordsId" exact element={<SingleOilChangeRecordsPage />} />
<Route path="/oilChangeRecords" exact element={<OilChangeRecordProjectLayoutPage />} />
<Route path="/technicians/:singleTechniciansId" exact element={<SingleTechniciansPage />} />
<Route path="/technicians" exact element={<TechnicianProjectLayoutPage />} />
<Route path="/partsInventory/:singlePartsInventoryId" exact element={<SinglePartsInventoryPage />} />
<Route path="/partsInventory" exact element={<PartsInventoryProjectLayoutPage />} />
<Route path="/suppliers/:singleSuppliersId" exact element={<SingleSuppliersPage />} />
<Route path="/suppliers" exact element={<SupplierProjectLayoutPage />} />
<Route path="/paymentMethods/:singlePaymentMethodsId" exact element={<SinglePaymentMethodsPage />} />
<Route path="/paymentMethods" exact element={<PaymentMethodProjectLayoutPage />} />
        {/* ~cb-add-protected-route~ */}
      </Route>
    </Routes>
  );
};

const mapState = (state) => {
  const { isLoggedIn } = state.auth;
  return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(AppRouter);
