import React from "react";
import { render, screen } from "@testing-library/react";

import PartsInventoryPage from "../PartsInventoryPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders partsInventory page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PartsInventoryPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("partsInventory-datatable")).toBeInTheDocument();
    expect(screen.getByRole("partsInventory-add-button")).toBeInTheDocument();
});
