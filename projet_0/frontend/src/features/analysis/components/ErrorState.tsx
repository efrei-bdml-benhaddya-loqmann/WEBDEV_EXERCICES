import { Badge } from "@openai/apps-sdk-ui/components/Badge";

export function ErrorState({
  userText,
  error
}: {
  userText: string | null;
  error: string;
}) {
  return (
    <div className="flex items-start gap-4 text-danger animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex flex-col gap-1 mt-1 text-sm">
        {userText && <Badge variant="outline" color="danger" size="lg">{userText}</Badge>}
        <span className="font-semibold text-base">Error</span>
        <span className="opacity-90">{error}</span>
      </div>
    </div>
  )
}
