import { useState } from 'react';
import { Copy, Check } from "@openai/apps-sdk-ui/components/Icon";
import { ActionButton } from './ActionButton';
import { Animate } from "@openai/apps-sdk-ui/components/Transition"

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
      icon={
        <Animate
          className="w-[var(--button-icon-size)] h-[var(--button-icon-size)]"
          enter={{ scale: 1, delay: 150, duration: 400 }}
          exit={{ scale: 0.6, duration: 150 }}
        >
          {copied ? <Check key="copied" className="text-success" /> : <Copy key="copy" />}
        </Animate>
      }
      tooltip="Copy to clipboard"
    />
  );
}
