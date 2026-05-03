import { useState } from 'react'
import { AddressBottomSheet } from './AddressBottomSheet'

export function EntryScreen() {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={sheetOpen ? '/images/entry-screen-no-bar.png' : '/images/entry-screen.png'}
        alt="Home"
        className="absolute inset-0 h-full w-full select-none object-cover"
        draggable={false}
      />

      {/* Tap target over the address bar in the design */}
      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        aria-label="Open address selector"
        className="absolute left-3 right-3 z-10 rounded-12 outline-none focus-visible:ring-2 focus-visible:ring-blue-700/60"
        style={{ top: 116, height: 56 }}
      />

      <AddressBottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </div>
  )
}
