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
        <label htmlFor="title">Title: </label>
        <input
          {...register("title")}
          className="border-black border rounded"
          type="text"
          id="title"
        />
      </div>
      <label htmlFor="group">Group: </label>
      <select {...register("group")} id="group">
        <option value="Programming">Programming</option>
        <option value="Life">Life</option>
      </select>
      <Button type="submit">Confirm</Button>
    </form>
  );
}

export { TodoForm };
