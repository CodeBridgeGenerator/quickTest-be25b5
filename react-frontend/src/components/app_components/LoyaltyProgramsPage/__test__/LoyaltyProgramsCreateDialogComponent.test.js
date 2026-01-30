import React from "react";
import { render, screen } from "@testing-library/react";

import LoyaltyProgramsCreateDialogComponent from "../LoyaltyProgramsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders loyaltyPrograms create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LoyaltyProgramsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("loyaltyPrograms-create-dialog-component")).toBeInTheDocument();
});
