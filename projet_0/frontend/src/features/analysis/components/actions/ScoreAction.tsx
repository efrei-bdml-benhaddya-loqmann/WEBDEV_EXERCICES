import { ThumbUp, ThumbDown, ThumbUpFilled, ThumbDownFilled } from "@openai/apps-sdk-ui/components/Icon";
import { ActionButton } from "./ActionButton";

interface ScoreActionProps {
  feedback: 'positive' | 'negative' | 'none';
  onScore: (feedback: 'positive' | 'negative' | 'none') => void;
}

export function ScoreAction({ feedback, onScore }: ScoreActionProps) {
  const isLiked = feedback === 'positive';
  const isDisliked = feedback === 'negative';

  const handleThumbUp = () => {
    onScore(isLiked ? 'none' : 'positive');
  };

  const handleThumbDown = () => {
    onScore(isDisliked ? 'none' : 'negative');
  };

  return (
    <div className="flex flex-row gap-0.5">
      {!isDisliked && (
        <ActionButton
          onAction={handleThumbUp}
          icon={isLiked ? <ThumbUpFilled className="text-primary" /> : <ThumbUp />}
          tooltip="Helpful"
        />
      )}

      {!isLiked && (
        <ActionButton
          onAction={handleThumbDown}
          icon={isDisliked ? <ThumbDownFilled className="text-primary" /> : <ThumbDown />}
          tooltip="Not helpful"
        />
      )}
    </div>
  );
}
