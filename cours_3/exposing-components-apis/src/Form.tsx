import { forwardRef, useImperativeHandle, useRef } from "react";

export type FormHandle = {
  clear: () => void;
};

const Form = forwardRef<FormHandle>(function Form(_, ref) {
  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    clear() {
      formRef.current?.reset();
    },
  }));

  return (
    <form ref={formRef}>
      <p>
        <label>Name</label>
        <input type="text" />
      </p>

      <p>
        <label>Email</label>
        <input type="email" />
      </p>
      <p id="actions">
        <button>Save</button>
      </p>
    </form>
  );
});

export default Form;
