import React from "react";
import { render, screen } from "@testing-library/react";

import TableaPage from "../TableaPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders tablea page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TableaPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("tablea-datatable")).toBeInTheDocument();
    expect(screen.getByRole("tablea-add-button")).toBeInTheDocument();
});
