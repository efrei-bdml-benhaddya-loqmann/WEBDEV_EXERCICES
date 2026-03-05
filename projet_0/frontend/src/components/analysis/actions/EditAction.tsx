import { Button } from "@openai/apps-sdk-ui/components/Button";
import { EditPencil } from "@openai/apps-sdk-ui/components/Icon";

interface EditActionProps {
  onEdit: () => void;
  isEditing?: boolean;
}

export function EditAction({ onEdit, isEditing }: EditActionProps) {
  return (
    <Button
      onClick={onEdit}
      color="secondary"
      size="md"
      gutterSize="md"
      uniform
      pill={false}
      variant="ghost"
      title={isEditing ? "Cancel edit" : "Edit text"}
    >
      <EditPencil className={isEditing ? "text-primary" : ""} />
    </Button>
  );
}
