import React from "react";
import { render, screen } from "@testing-library/react";

import LoyaltyProgramsPage from "../LoyaltyProgramsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders loyaltyPrograms page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LoyaltyProgramsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("loyaltyPrograms-datatable")).toBeInTheDocument();
    expect(screen.getByRole("loyaltyPrograms-add-button")).toBeInTheDocument();
});
