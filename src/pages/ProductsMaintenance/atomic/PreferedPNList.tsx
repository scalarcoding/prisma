import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export function PreferedPNList() {
  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Part Number Register</h4>
        {tags.map((tag, index) => (
          <React.Fragment key={tag}>
            <div 
              className={`cursor-pointer flex justify-between items-center py-2 px-2 text-sm hover:bg-slate-200 hover:rounded-md ${index === 0 ? 'bg-blue-100 rounded-md' : ''}`}
            >
              <div>{tag}</div>
              <h1 className="text-sm">01</h1>
            </div>
            <Separator />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
