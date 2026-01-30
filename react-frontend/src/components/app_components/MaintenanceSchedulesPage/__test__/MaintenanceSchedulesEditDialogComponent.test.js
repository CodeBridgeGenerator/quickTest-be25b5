import React from "react";
import { render, screen } from "@testing-library/react";

import MaintenanceSchedulesEditDialogComponent from "../MaintenanceSchedulesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders maintenanceSchedules edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MaintenanceSchedulesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("maintenanceSchedules-edit-dialog-component")).toBeInTheDocument();
});
