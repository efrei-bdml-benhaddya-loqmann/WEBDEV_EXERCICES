import { useState } from 'react';
import { Button } from "@openai/apps-sdk-ui/components/Button";
import { Copy, Check } from "@openai/apps-sdk-ui/components/Icon";

interface CopyActionProps {
  onCopy: () => void;
}

export function CopyAction({ onCopy }: CopyActionProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      onClick={handleClick}
      color="secondary"
      size="md"
      gutterSize="md"
      uniform
      pill={false}
      variant="ghost"
      title="Copy to clipboard"
    >
      {copied ? <Check className="text-success" /> : <Copy />}
    </Button>
  );
}
