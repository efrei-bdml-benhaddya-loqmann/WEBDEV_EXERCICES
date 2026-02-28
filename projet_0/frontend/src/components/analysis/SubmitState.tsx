export function SubmitState({
  userText,
  isLoading
}: {
  userText: string;
  isLoading: boolean;
}) {
  return (
    <div className={`flex items-start gap-4 animate-in fade-in duration-300 ${isLoading ? 'animate-pulse' : ''}`}>
      <div className="flex flex-col items-start mt-1 w-full gap-3">
        <p className='text-sm font-semibold px-2 break-words'>
          {userText}
        </p>
      </div>
    </div>
  )
}
