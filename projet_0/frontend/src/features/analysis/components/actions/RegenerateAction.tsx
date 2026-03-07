import { ArrowRotateCcw } from "@openai/apps-sdk-ui/components/Icon";
import { ActionButton } from "./ActionButton";

interface RegenerateActionProps {
  onRegenerate: () => void;
}

export function RegenerateAction({ onRegenerate }: RegenerateActionProps) {
  return (
    <ActionButton
      onAction={onRegenerate}
      icon={<ArrowRotateCcw />}
      tooltip="Regenerate analysis"
    />
  );
}
