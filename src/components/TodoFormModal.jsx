import { useForm } from "react-hook-form";
import { Button } from "./Button";

function TodoForm({ submit, defaultVal = {}, closeModal }) {
  const { register, handleSubmit } = useForm({
    defaultValues: defaultVal,
  });
  function onSubmit(data) {
    submit(data);
    closeModal();
  }
  return (
    <form className="border-black border" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <label htmlFor="title">Title </label>
        <input
          {...register("title")}
          className="border-black border rounded"
          type="text"
          id="title"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="due-date">Due Date </label>
        <input
          {...register("dueDate")}
          className="border-black border rounded"
          type="date"
          id="due-date"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="priority">Priority </label>
        <select {...register("priority")} id="priority">
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="group">Group </label>
        <select {...register("group")} id="group">
          <option value="Programming">Programming</option>
          <option value="Life">Life</option>
        </select>
      </div>
      <Button type="submit">Confirm</Button>
    </form>
  );
}

export { TodoForm };
