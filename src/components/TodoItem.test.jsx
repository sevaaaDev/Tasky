import { describe, it, expect, vi } from "vitest";
import { TodoItem } from "./TodoItem";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Todo Item Working", () => {
  const item = {
    id: "haha",
    title: "Todo",
    summary: "Todoing",
  };
  it("render", () => {
    render(
      <TodoItem
        item={item}
        handleDeleteCurry={vi.fn()}
        handleEditCurry={vi.fn()}
      />,
    );
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("delete btn", async () => {
    let user = userEvent.setup();
    let inner;
    let func = (id) => (inner = vi.fn(() => id));
    render(
      <TodoItem
        item={item}
        handleDeleteCurry={func}
        handleEditCurry={vi.fn()}
      />,
    );
    let btn = screen.getByRole("button", { name: "Delete" });
    await user.click(btn);
    expect(inner).toHaveBeenCalledOnce();
    expect(inner).toHaveReturnedWith(item.id);
  });

  it("edit btn send todo info", async () => {
    let user = userEvent.setup();
    let inner;
    let func = (item) => (inner = vi.fn(() => item));
    render(
      <TodoItem
        item={item}
        handleDeleteCurry={vi.fn()}
        handleEditCurry={func}
      />,
    );
    let btn = screen.getByRole("button", { name: "Edit" });
    await user.click(btn);
    expect(inner).toHaveBeenCalledOnce();
    expect(inner).toHaveReturnedWith(item);
  });

  it.todo("detail btn show summary");
});
