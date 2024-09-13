import { describe, it, expect } from "vitest";
import { TodoItem } from "./TodoItem";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Todo Item", () => {
  it("render", () => {
    render(<TodoItem item={{ title: "Hello" }} handleDeleteCurry={vi.fn()} />);
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("call the callback", async () => {
    let user = userEvent.setup();
    let inner = vi.fn();
    let func = () => inner;
    render(<TodoItem item={{ title: "Hello" }} handleDeleteCurry={func} />);
    let btn = screen.getByRole("button", { name: "Delete" });
    await user.click(btn);
    expect(inner).toHaveBeenCalledTimes(1);
  });
});
