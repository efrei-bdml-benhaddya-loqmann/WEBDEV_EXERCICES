import { forwardRef } from "react";
import { Button } from "@openai/apps-sdk-ui/components/Button";
import { Tooltip } from "@openai/apps-sdk-ui/components/Tooltip";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onAction: () => void;
    icon: React.ReactNode;
    tooltip: string;
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(({ onAction, icon, tooltip, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        onAction();
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <Tooltip
            content={tooltip}
            compact
            side='bottom'
        >
            <Tooltip.TriggerDecorator>
                <Button
                    {...props}
                    onClick={handleClick}
                    ref={ref}
                    color="secondary"
                    size="md"
                    gutterSize="md"
                    uniform
                    pill={false}
                    variant="ghost"
                >
                    {icon}
                </Button>
            </Tooltip.TriggerDecorator>
        </Tooltip>
    );
});
