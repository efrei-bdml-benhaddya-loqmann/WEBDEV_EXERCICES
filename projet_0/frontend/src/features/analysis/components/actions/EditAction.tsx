import { EditPencil } from "@openai/apps-sdk-ui/components/Icon";
import { ActionButton } from "./ActionButton";

interface EditActionProps {
  onEdit: () => void;
  isEditing?: boolean;
}

export function EditAction({ onEdit, isEditing }: EditActionProps) {
  return (
    <ActionButton
      onAction={onEdit}
      icon={<EditPencil className={isEditing ? "text-primary" : ""} />}
      tooltip={isEditing ? "Cancel edit" : "Edit text"}
    />
  );
}
