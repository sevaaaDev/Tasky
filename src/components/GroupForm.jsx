import { func } from "prop-types";
import { useForm } from "react-hook-form";

function GroupForm({ submit, closeModal, defaultVal = {} }) {
  const { register, handleSubmit } = useForm({
    defaultValues: defaultVal,
  });
  function onSubmit({ group }) {
    submit(group);
    closeModal();
  }
  return (
    <form className="border-black border" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <label htmlFor="group">Group Name </label>
        <input
          {...register("group")}
          className="border-black border rounded"
          type="text"
          id="group"
        />
      </div>
    </form>
  );
}

export { GroupForm };
