import type { SentimentResult } from "../../types";
import { CopyAction } from "./actions/CopyAction";
import { ScoreAction } from "./actions/ScoreAction";
import { EditAction } from "./actions/EditAction";
import { RegenerateAction } from "./actions/RegenerateAction";

interface ResultActionsProps {
    result: SentimentResult;
    isEditing?: boolean;
    onCopy: () => void;
    onEdit: () => void;
    onScore: (feedback: 'positive' | 'negative' | 'none') => void;
    onRegenerate: () => void;
}

export function ResultActions({ result, isEditing, onCopy, onEdit, onScore, onRegenerate }: ResultActionsProps) {
    return (
        <div className="flex flex-row gap-0.5">
            <CopyAction onCopy={onCopy} />
            <ScoreAction feedback={result.feedback || 'none'} onScore={onScore} />
            <EditAction onEdit={onEdit} isEditing={isEditing} />
            {!isEditing && <RegenerateAction onRegenerate={onRegenerate} />}
        </div>
    )
}
