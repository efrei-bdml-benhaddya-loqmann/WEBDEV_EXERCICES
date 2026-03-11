import { DotsHorizontal } from "@openai/apps-sdk-ui/components/Icon";
import { ActionButton } from "./ActionButton";
import { Menu } from "@openai/apps-sdk-ui/components/Menu";

interface MoreActionProps {
  onMore: () => void;
  timestamp: number;
  score: number;
}

export function MoreAction({ onMore, timestamp, score }: MoreActionProps) {
  return (
    <Menu>
      <Menu.Trigger>
        <ActionButton
          onAction={onMore}
          icon={<DotsHorizontal />}
          tooltip={"More"}
        />
      </Menu.Trigger>
      <Menu.Content side="bottom" width={210} minWidth={210}>
        <Menu.Item><p className="text-secondary">{new Date(timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p></Menu.Item>
        <Menu.Item><p className="text-secondary">Confidence: {(score * 100).toFixed(0)}%</p></Menu.Item>
        {/* <Menu.Item onSelect={() => { }}>Whatever</Menu.Item> */}
      </Menu.Content>
    </Menu>
  );
}
