import { Warning } from '@openai/apps-sdk-ui/components/Icon'

export function ErrorState({
  error
}: {
  error: string;
}) {
  return (
    <div className="flex items-start gap-4 text-danger animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="w-8 h-8 rounded-full bg-danger-surface flex items-center justify-center flex-shrink-0">
        <Warning className="size-4" />
      </div>
      <div className="flex flex-col gap-1 mt-1 text-sm">
        <span className="font-semibold text-base">Error analyzing sentiment</span>
        <span className="opacity-90">{error}</span>
      </div>
    </div>
  )
}
