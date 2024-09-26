import { twMerge } from "tailwind-merge";

function Button({ children, className, ...props }) {
  let defaultClass = "bg-black text-white rounded";
  return (
    <button className={twMerge(defaultClass, className)} {...props}>
      {children}
    </button>
  );
}

export { Button };
