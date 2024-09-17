import { describe, it, expect, vi } from "vitest";
import { Modal } from "./Modal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

HTMLDialogElement.prototype.show = vi.fn(function mock() {
  this.open = true;
});

HTMLDialogElement.prototype.showModal = vi.fn(function mock() {
  this.open = true;
});

HTMLDialogElement.prototype.close = vi.fn(function mock() {
  this.open = false;
});

describe("modal render", () => {
  it("render", () => {
    render(
      <Modal openModal={true} handleModal={vi.fn()}>
        im in modal
      </Modal>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("im in modal")).toBeVisible();
  });
  it("close modal", async () => {
    let user = userEvent.setup();
    let openModal = true;
    let func = vi.fn(() => (openModal = !openModal));
    render(
      <Modal openModal={openModal} handleModal={func}>
        im in modal
      </Modal>,
    );

    let btn = screen.getByRole("button", { name: "Close" });
    await user.click(btn);
    expect(func).toHaveBeenCalledOnce();
    expect(openModal).toBeFalsy();
  });
});
