import React from "react";
import { render, screen } from "@testing-library/react";

import OilChangeRecordsEditDialogComponent from "../OilChangeRecordsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders oilChangeRecords edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <OilChangeRecordsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("oilChangeRecords-edit-dialog-component")).toBeInTheDocument();
});
