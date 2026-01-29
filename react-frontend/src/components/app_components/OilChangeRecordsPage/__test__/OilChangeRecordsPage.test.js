import React from "react";
import { render, screen } from "@testing-library/react";

import OilChangeRecordsPage from "../OilChangeRecordsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders oilChangeRecords page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <OilChangeRecordsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("oilChangeRecords-datatable")).toBeInTheDocument();
    expect(screen.getByRole("oilChangeRecords-add-button")).toBeInTheDocument();
});
