import React from "react";
import { render, screen } from "@testing-library/react";

import PartsInventoryEditDialogComponent from "../PartsInventoryEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders partsInventory edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PartsInventoryEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("partsInventory-edit-dialog-component")).toBeInTheDocument();
});
