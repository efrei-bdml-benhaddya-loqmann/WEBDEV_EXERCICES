import { Button } from "@openai/apps-sdk-ui/components/Button";
import { Tooltip } from "@openai/apps-sdk-ui/components/Tooltip";

interface ActionButtonProps {
    onAction: () => void;
    icon: React.ReactNode;
    tooltip: string;
}

export function ActionButton({ onAction, icon, tooltip }: ActionButtonProps) {
    const handleClick = () => {
        onAction();
    };

    return (
        <Tooltip
            content={tooltip}
            compact
            side='bottom'
        >
            <Tooltip.TriggerDecorator>
                <Button
                    onClick={handleClick}
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
}
