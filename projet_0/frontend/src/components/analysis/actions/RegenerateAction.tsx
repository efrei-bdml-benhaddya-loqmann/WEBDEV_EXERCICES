import { Button } from "@openai/apps-sdk-ui/components/Button";
import { ArrowRotateCcw } from "@openai/apps-sdk-ui/components/Icon";

interface RegenerateActionProps {
  onRegenerate: () => void;
}

export function RegenerateAction({ onRegenerate }: RegenerateActionProps) {
  return (
    <Button
      onClick={onRegenerate}
      color="secondary"
      size="md"
      gutterSize="md"
      uniform
      pill={false}
      variant="ghost"
      title="Regenerate analysis"
    >
      <ArrowRotateCcw />
    </Button>
  );
}
