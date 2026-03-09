// src/features/settings/services/exportHistory.ts
import type { SentimentResult } from "../../../types";

export function exportHistoryToJSON(history: SentimentResult[]) {
    // Create a blob and trigger download process
    const blob = new Blob([JSON.stringify(history)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const fn = `history-${new Date().toISOString()}.json`;
    a.download = fn; // name with timestamp
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log(`History exported to ${fn}`);
    return fn; // to retrieve the file name outside
}
