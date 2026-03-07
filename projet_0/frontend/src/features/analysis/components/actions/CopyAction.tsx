import { useState } from 'react';
import { Copy, Check } from "@openai/apps-sdk-ui/components/Icon";
import { ActionButton } from './ActionButton';

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
    <ActionButton
      onAction={handleClick}
      icon={copied ? <Check className="text-success" /> : <Copy />}
      tooltip="Copy to clipboard"
    />
  );
}
