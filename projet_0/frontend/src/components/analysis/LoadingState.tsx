import { Spin } from '@openai/apps-sdk-ui/components/Icon'

export function LoadingState() {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-full border border-default bg-surface flex items-center justify-center flex-shrink-0">
        <Spin className="size-4 animate-spin text-tertiary" />
      </div>
      <div className="w-full pt-2">
        <div className="animate-pulse bg-surface-tertiary h-3 w-32 rounded mb-3"></div>
        <div className="animate-pulse bg-surface-tertiary h-3 w-64 rounded"></div>
      </div>
    </div>
  )
}
