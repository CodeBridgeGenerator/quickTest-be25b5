import React from "react";
import { render, screen } from "@testing-library/react";

import MaintenanceSchedulesPage from "../MaintenanceSchedulesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders maintenanceSchedules page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MaintenanceSchedulesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("maintenanceSchedules-datatable")).toBeInTheDocument();
    expect(screen.getByRole("maintenanceSchedules-add-button")).toBeInTheDocument();
});
