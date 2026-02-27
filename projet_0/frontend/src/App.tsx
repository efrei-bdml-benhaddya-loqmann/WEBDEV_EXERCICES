import { useState } from 'react'
import { Badge } from '@openai/apps-sdk-ui/components/Badge'
import { Button } from '@openai/apps-sdk-ui/components/Button'
import { Input } from '@openai/apps-sdk-ui/components/Input'
import { Textarea } from '@openai/apps-sdk-ui/components/Textarea'
import { SegmentedControl } from '@openai/apps-sdk-ui/components/SegmentedControl'

function App() {
  const [segmentData, setSegmentData] = useState('first')

  return (
    <div className="flex flex-col gap-8 p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">@openai/apps-sdk-ui Components</h1>

      {/* Badge Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Badges (variant: soft)</h2>
        <div className="flex gap-4">
          <Badge color="success" variant="soft" size='lg'>Positive</Badge>
          <Badge color="danger" variant="soft" size='lg'>Negative</Badge>
          <Badge color="secondary" variant="soft" size='lg'>Neutral</Badge>
        </div>
      </div>

      {/* Button Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Buttons</h2>
        <div className="flex gap-4">
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="danger" variant="soft">Danger Soft</Button>
        </div>
      </div>

      {/* Input / Textarea Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Inputs</h2>
        <div className="flex flex-col gap-4">
          <Input placeholder="Enter some text here..." />
          <Textarea placeholder="Type a longer message..." rows={3} />
        </div>
      </div>

      {/* Segmented Control Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Segmented Control</h2>
        <div>
          <SegmentedControl value={segmentData} onChange={setSegmentData} aria-label="Example segmented control">
            <SegmentedControl.Option value="first">First Option</SegmentedControl.Option>
            <SegmentedControl.Option value="second">Second Option</SegmentedControl.Option>
            <SegmentedControl.Option value="third">Third Option</SegmentedControl.Option>
          </SegmentedControl>
        </div>
        <p className="mt-2 text-sm text-gray-500">Selected value: <span className="font-bold">{segmentData}</span></p>
      </div>

    </div>
  )
}

export default App
