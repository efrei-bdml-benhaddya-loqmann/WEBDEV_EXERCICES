import { Button } from "@openai/apps-sdk-ui/components/Button";
import { ThumbUp, ThumbDown, ThumbUpFilled, ThumbDownFilled } from "@openai/apps-sdk-ui/components/Icon";

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
        <Button
          onClick={handleThumbUp}
          color="secondary"
          size="md"
          gutterSize="md"
          uniform
          pill={false}
          variant="ghost"
          title="Helpful"
        >
          {isLiked ? <ThumbUpFilled className="text-primary" /> : <ThumbUp />}
        </Button>
      )}

      {!isLiked && (
        <Button
          onClick={handleThumbDown}
          color="secondary"
          size="md"
          gutterSize="md"
          uniform
          pill={false}
          variant="ghost"
          title="Not helpful"
        >
          {isDisliked ? <ThumbDownFilled className="text-primary" /> : <ThumbDown />}
        </Button>
      )}
    </div>
  );
}
