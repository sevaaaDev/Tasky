import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GroupItem } from "./GroupItem";

describe("GroupItem working", () => {
  let groupName = "Programming";
  it("render works", () => {
    render(
      <GroupItem
        groupName={groupName}
        handleDeleteCurry={vi.fn()}
        handleEditCurry={vi.fn()}
        setGroupCurry={vi.fn()}
      />,
    );
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });
  it("delete btn", async () => {
    let user = userEvent.setup();
    let inner;
    let func = (name) => (inner = vi.fn(() => name));
    render(
      <GroupItem
        groupName={groupName}
        handleDeleteCurry={func}
        handleEditCurry={vi.fn()}
        setGroupCurry={vi.fn()}
      />,
    );
    let btn = screen.getByRole("button", { name: "Delete" });
    await user.click(btn);
    expect(inner).toHaveBeenCalledOnce();
    expect(inner).toHaveReturnedWith(groupName);
  });
  it("edit btn send group name", async () => {
    let user = userEvent.setup();
    let inner;
    let func = (name) => (inner = vi.fn(() => name));
    render(
      <GroupItem
        groupName={groupName}
        handleDeleteCurry={vi.fn()}
        handleEditCurry={func}
        setGroupCurry={vi.fn()}
      />,
    );
    let btn = screen.getByRole("button", { name: "Edit" });
    await user.click(btn);
    expect(inner).toHaveBeenCalledOnce();
    expect(inner).toHaveReturnedWith(groupName);
  });
  it("clicking on group set current group", async () => {
    let user = userEvent.setup();
    let inner = vi.fn();
    let func = () => inner;
    render(
      <GroupItem
        groupName={groupName}
        handleDeleteCurry={vi.fn()}
        handleEditCurry={vi.fn()}
        setGroupCurry={func}
      />,
    );
    let groupItem = screen.getByRole("listitem");
    await user.click(groupItem);
    expect(inner).toHaveBeenCalledOnce();
  });
});
