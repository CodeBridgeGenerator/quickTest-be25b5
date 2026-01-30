import React from "react";
import { render, screen } from "@testing-library/react";

import ServiceRecordsCreateDialogComponent from "../ServiceRecordsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders serviceRecords create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServiceRecordsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("serviceRecords-create-dialog-component")).toBeInTheDocument();
});
