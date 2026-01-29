import React from "react";
import { render, screen } from "@testing-library/react";

import ServiceRecordsEditDialogComponent from "../ServiceRecordsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders serviceRecords edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ServiceRecordsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("serviceRecords-edit-dialog-component")).toBeInTheDocument();
});
