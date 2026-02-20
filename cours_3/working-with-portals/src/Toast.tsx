import { createPortal } from "react-dom";

export default function Toast({ message }: { message: string }) {
  return createPortal(
    <aside className="toast" data-testid="toast">
      <p>{message}</p>
    </aside>,
    document.querySelector('body')!
  );
}
