import { useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { Squircle } from '@/components/Squircle'

type ToggleOption = 'address' | 'locker'

type AddressItem = {
  id: string
  title: string
  selected?: boolean
  distance: string
  address: string
  contactName: string
  contactPhone: string
  verified: boolean
}

const initialAddresses: AddressItem[] = [
  {
    id: 'work',
    title: 'Work',
    selected: true,
    distance: '24 m',
    address: 'Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
    contactName: 'Ahmed Ali,',
    contactPhone: '+971-50 789 3456',
    verified: true,
  },
  {
    id: 'ayush-home',
    title: "Ayush’s Home",
    distance: '24 km',
    address: 'Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
    contactName: 'Ahmed Ali,',
    contactPhone: '+971-50 789 3456',
    verified: true,
  },
  {
    id: 'ayush-home-2',
    title: "Ayush’s Home 02",
    distance: '24 m',
    address: 'Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
    contactName: 'Ahmed Ali,',
    contactPhone: '+971-50 789 3456',
    verified: true,
  },
]

type AddressBottomSheetProps = {
  open: boolean
  onClose: () => void
}

const sheetEaseOpen = 'cubic-bezier(0.22, 1.22, 0.42, 1)'
const sheetEaseClose = 'cubic-bezier(0.32, 0.72, 0, 1)'

export function AddressBottomSheet({ open, onClose }: AddressBottomSheetProps) {
  const [tab, setTab] = useState<ToggleOption>('address')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string>('work')
  const [actionMenuFor, setActionMenuFor] = useState<string | null>(null)
  const [deleteConfirmFor, setDeleteConfirmFor] = useState<string | null>(null)
  const [tabSqueezing, setTabSqueezing] = useState(false)
  const [addressList, setAddressList] = useState<AddressItem[]>(initialAddresses)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const deleteTarget = addressList.find((a) => a.id === deleteConfirmFor) ?? null

  const confirmDelete = () => {
    const target = deleteConfirmFor
    if (!target) return
    setDeleteConfirmFor(null)
    setDeletingId(target)
    window.setTimeout(() => {
      setAddressList((prev) => prev.filter((a) => a.id !== target))
      setDeletingId(null)
    }, 320)
  }

  const changeTab = (next: ToggleOption) => {
    if (next === tab) {
      // Same tab tapped again — squeeze for feedback, don't switch
      setTabSqueezing(true)
      window.setTimeout(() => setTabSqueezing(false), 160)
      return
    }
    // Different tab — slide only, no squeeze
    setTab(next)
  }

  const anyOpen = open

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          'absolute inset-0 z-40 bg-black/70 transition-opacity duration-[420ms]',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* iOS home indicator — pinned to viewport bottom, on top of all sheets */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 z-[80] flex h-[34px] items-end justify-center pb-2 transition-opacity duration-[420ms]',
          anyOpen ? 'opacity-100' : 'opacity-0',
        )}
      >
        <span className="block h-[5px] w-[134px] rounded-full bg-neutral-white" />
      </div>

      <SheetShell open={open} onDragClose={onClose}>
        <div className="flex flex-col gap-3 p-3">
          <div
            role="tablist"
            className="relative flex h-[42px] w-full items-center rounded-[999px] bg-blue-gray-200 p-1"
            style={{ boxShadow: 'inset 0 0 4px 0 rgba(14,14,14,0.06)' }}
          >
            <span
              aria-hidden="true"
              className="absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] transition-transform duration-[280ms]"
              style={{
                transform: tab === 'address' ? 'translateX(0%)' : 'translateX(100%)',
                transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
              }}
            >
              <span
                className="block h-full w-full rounded-[32px] border-[0.5px] border-blue-gray-100 bg-neutral-white shadow-[0_1px_3px_rgba(34,34,34,0.06)] transition-transform duration-[160ms] ease-out"
                style={{ transform: tabSqueezing ? 'scaleX(0.94)' : 'scaleX(1)' }}
              />
            </span>
            <SegmentButton label="Address" selected={tab === 'address'} onClick={() => changeTab('address')} />
            <SegmentButton label="Locker/ Pickup" selected={tab === 'locker'} onClick={() => changeTab('locker')} />
          </div>

          <Squircle
            cornerRadius={16}
            cornerSmoothing={0.6}
            borderColor="#F2F3F7"
            className="bg-neutral-white"
          >
            <div className="flex h-12 items-center gap-3 px-3">
              <img src="/icons/search.svg" alt="" className="h-4 w-4" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for your building, area..."
                className="flex-1 bg-transparent text-[13px] font-medium tracking-[-0.26px] text-blue-gray-1000 placeholder:font-medium placeholder:text-blue-gray-600 focus:outline-none"
              />
            </div>
          </Squircle>

          <Squircle
            cornerRadius={16}
            cornerSmoothing={0.6}
            borderColor="#F2F3F7"
            className="bg-neutral-white"
            onClick={() => undefined}
          >
            <div className="flex w-full items-center gap-3 px-3.5 py-3.5">
              <span className="flex size-5 items-center justify-center">
                <img
                  src="/icons/plus.svg"
                  alt=""
                  className="h-3 w-3"
                  style={{ filter: 'brightness(0) saturate(100%) invert(28%) sepia(98%) saturate(2300%) hue-rotate(202deg)' }}
                />
              </span>
              <span className="flex-1 text-left text-[14px] font-semibold tracking-[-0.14px] text-neutral-black">
                Add new Address
              </span>
              <span className="flex size-5 items-center justify-center">
                <img
                  src="/icons/chevron-left.svg"
                  alt=""
                  className="h-[10px] w-[6px] rotate-180"
                  style={{ filter: 'brightness(0) saturate(100%) invert(28%) sepia(98%) saturate(2300%) hue-rotate(202deg)' }}
                />
              </span>
            </div>
          </Squircle>

          <div className="flex flex-col gap-3">
            {addressList.map((a) => (
              <AddressCard
                key={a.id}
                item={a}
                isSelected={selectedId === a.id}
                isDeleting={deletingId === a.id}
                onSelect={() => setSelectedId(a.id)}
                onMore={() => setActionMenuFor(a.id)}
              />
            ))}
          </div>
        </div>
      </SheetShell>

      <ActionMenuSheet
        open={actionMenuFor !== null}
        onClose={() => setActionMenuFor(null)}
        onDelete={() => {
          const target = actionMenuFor
          setActionMenuFor(null)
          setDeleteConfirmFor(target)
        }}
      />

      <DeleteConfirmSheet
        open={deleteConfirmFor !== null}
        target={deleteTarget}
        onCancel={() => setDeleteConfirmFor(null)}
        onConfirm={confirmDelete}
      />
    </>
  )
}

type SheetShellProps = {
  open: boolean
  children: React.ReactNode
  zClass?: string
  bgClass?: string
  borderColor?: string
  showNotch?: boolean
  insetClass?: string
  bottomSpacerClass?: string
  onDragClose?: () => void
}

function SheetShell({
  open,
  children,
  zClass = 'z-50',
  bgClass = 'bg-blue-gray-100',
  borderColor,
  showNotch = true,
  insetClass = 'left-3 right-3',
  bottomSpacerClass = 'h-[34px]',
  onDragClose,
}: SheetShellProps) {
  const dragStartY = useRef<number | null>(null)
  const draggingRef = useRef(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [stretchPx, setStretchPx] = useState(0)
  const [, forceRender] = useState(0)

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!onDragClose) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragStartY.current = e.clientY
    draggingRef.current = true
    forceRender((n) => n + 1)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartY.current === null) return
    const delta = e.clientY - dragStartY.current
    if (delta < 0) {
      // Drag upward: rubber-band stretch (sheet grows taller, bottom anchored)
      setStretchPx(Math.min(60, -delta * 0.3))
      setDragOffset(0)
    } else {
      // Drag downward: translate down (sheet moves toward closed)
      setDragOffset(delta)
      setStretchPx(0)
    }
  }

  const endDrag = () => {
    if (dragStartY.current === null) return
    const offset = dragOffset
    dragStartY.current = null
    draggingRef.current = false
    if (offset > 80 && onDragClose) {
      onDragClose()
    }
    setDragOffset(0)
    setStretchPx(0)
  }

  const transform = !open
    ? 'translateY(110%)'
    : `translateY(${dragOffset}px)`

  return (
    <div
      className={cn('absolute bottom-0', insetClass, zClass)}
      style={{
        transform,
        transition: draggingRef.current
          ? 'none'
          : `transform 420ms ${open ? sheetEaseOpen : sheetEaseClose}`,
      }}
    >
      {showNotch ? (
        <div
          className="flex touch-none justify-center py-1.5"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <img src="/icons/notch.svg" alt="" className="h-1 w-9" draggable={false} />
        </div>
      ) : null}
      <div
        className={cn('rounded-[24px]', bgClass)}
        style={borderColor ? { boxShadow: `0 0 0 1px ${borderColor}` } : undefined}
      >
        {children}
        {/* Stretch spacer at bottom — grows on upward drag so content visibly moves up */}
        <div
          style={{
            height: stretchPx,
            transition: draggingRef.current ? 'none' : `height 420ms ${sheetEaseOpen}`,
          }}
        />
      </div>
      {/* Spacer so the sheet floats above the system home indicator at the bottom */}
      <div className={cn('w-full', bottomSpacerClass)} />
    </div>
  )
}

type SegmentButtonProps = {
  label: string
  selected: boolean
  onClick: () => void
}

function SegmentButton({ label, selected, onClick }: SegmentButtonProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className="relative z-10 flex h-[34px] flex-1 items-center justify-center px-3 outline-none"
      style={{ transform: 'translateZ(0)' }}
    >
      <span
        className={cn(
          'whitespace-nowrap text-[14px] tracking-[-0.26px]',
          selected ? 'font-semibold text-ink' : 'font-medium text-ink-secondary',
        )}
      >
        {label}
      </span>
    </button>
  )
}

type AddressCardProps = {
  item: AddressItem
  isSelected: boolean
  isDeleting?: boolean
  onSelect: () => void
  onMore: () => void
}

function AddressCard({ item, isSelected, isDeleting = false, onSelect, onMore }: AddressCardProps) {
  return (
    <div
      className="overflow-hidden"
      style={{
        // Card keeps its space during slide; collapse happens via DOM removal
        // after the animation completes, avoiding the sheet's bottom area
        // appearing to shift while the card is sliding.
      }}
    >
      <div
        className="transition-all duration-[320ms] ease-out"
        style={{
          transform: isDeleting ? 'translateX(-110%)' : 'translateX(0)',
          opacity: isDeleting ? 0 : 1,
        }}
      >
    <Squircle
      cornerRadius={16}
      cornerSmoothing={0.6}
      borderColor={isSelected ? '#D0E3FF' : '#EAECF0'}
      className="bg-neutral-white"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onSelect()
          }
        }}
        className={cn(
          'flex w-full cursor-pointer items-center gap-2 py-2 pl-2 pr-1 outline-none',
          isSelected ? 'bg-[#EFF7FF]' : 'bg-blue-gray-100',
        )}
      >
        <Squircle
          cornerRadius={8}
          cornerSmoothing={0.6}
          borderColor={isSelected ? '#D0E3FF' : '#EAECF0'}
          className="size-7 bg-neutral-white"
        >
          <div className="flex h-full w-full items-center justify-center">
            <img
              src={isSelected ? '/icons/briefcase-blue.svg' : '/icons/briefcase-gray.svg'}
              alt=""
              className="h-4 w-4"
            />
          </div>
        </Squircle>
        <span
          className={cn(
            'font-primary text-[14px] tracking-[-0.14px] text-neutral-black',
            isSelected ? 'font-semibold' : 'font-medium',
          )}
        >
          {item.title}
        </span>
        <Squircle cornerRadius={6} cornerSmoothing={0.6} className="bg-neutral-white">
          <div
            className={cn(
              'flex min-w-[37px] items-center justify-center whitespace-nowrap pb-[4px] pl-[7px] pr-[6px] pt-[3px] font-primary text-[10px] font-bold leading-[12px]',
              isSelected ? 'text-[#0076FF]' : 'text-blue-gray-700',
            )}
          >
            {item.distance}
          </div>
        </Squircle>
        <div className="ml-auto flex items-center gap-2 text-blue-gray-700">
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="flex size-6 items-center justify-center"
            aria-label="Share"
          >
            <img src="/icons/upload.svg" alt="" className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onMore()
            }}
            className="flex size-6 items-center justify-center"
            aria-label="More"
          >
            <img src="/icons/more-vertical.svg" alt="" className="h-4 w-[3px]" />
          </button>
        </div>
      </div>

      <div className="px-3 pt-2 pb-2">
        <p className="text-[13px] font-medium leading-[18px] tracking-[-0.26px] text-blue-gray-700">
          {item.address}
        </p>
      </div>

      <div className="mx-3 border-t border-dashed border-blue-gray-300" />

      <div className="flex items-center gap-1.5 px-3 py-2.5">
        <span className="text-[13px] font-medium tracking-[-0.26px] text-blue-gray-700">
          {item.contactName}
        </span>
        <span className="text-[13px] font-medium tracking-[-0.26px] text-blue-gray-700">
          {item.contactPhone}
        </span>
        <img
          src={item.verified ? '/icons/verified.svg' : '/icons/unverified.svg'}
          alt=""
          className="h-3.5 w-3.5"
        />
      </div>
    </Squircle>
      </div>
    </div>
  )
}

type ActionMenuSheetProps = {
  open: boolean
  onClose: () => void
  onDelete: () => void
}

const actionMenuItems: { id: 'edit' | 'share' | 'verify' | 'delete'; icon: string; label: string }[] = [
  { id: 'edit', icon: '/icons/action-edit-pen.svg', label: 'Edit' },
  { id: 'share', icon: '/icons/action-share.svg', label: 'Share' },
  { id: 'verify', icon: '/icons/action-verify.svg', label: 'Verify' },
  { id: 'delete', icon: '/icons/action-delete.svg', label: 'Delete' },
]

function ActionMenuSheet({ open, onClose, onDelete }: ActionMenuSheetProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          'absolute inset-0 z-[60] bg-black/35 transition-opacity duration-[420ms]',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <SheetShell
        open={open}
        zClass="z-[70]"
        bgClass="bg-neutral-white"
        borderColor="#F2F3F7"
        showNotch={false}
        insetClass="left-[21px] right-[21px]"
        bottomSpacerClass="h-[42px]"
      >
        <div className="flex flex-col p-4">
          {actionMenuItems.map((item, idx) => (
            <div key={item.id} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  if (item.id === 'delete') {
                    onDelete()
                  } else {
                    onClose()
                  }
                }}
                className="flex w-[82px] items-center gap-4 py-2 outline-none"
              >
                <span className="flex size-5 items-center justify-center">
                  <img src={item.icon} alt="" className="h-3.5 w-3.5" />
                </span>
                <span className="font-primary text-[12px] font-semibold tracking-[-0.12px] text-[#262A33]">
                  {item.label}
                </span>
              </button>
              {idx < actionMenuItems.length - 1 ? (
                <div className="my-1 w-full border-t border-dashed border-blue-gray-200" />
              ) : null}
            </div>
          ))}
        </div>
      </SheetShell>
    </>
  )
}

type DeleteConfirmSheetProps = {
  open: boolean
  target: AddressItem | null
  onCancel: () => void
  onConfirm: () => void
}

function DeleteConfirmSheet({ open, target, onCancel, onConfirm }: DeleteConfirmSheetProps) {
  return (
    <>
      <div
        onClick={onCancel}
        className={cn(
          'absolute inset-0 z-[60] bg-black/35 transition-opacity duration-[420ms]',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <SheetShell
        open={open}
        zClass="z-[70]"
        bgClass="bg-neutral-white"
        borderColor="#F2F3F7"
        showNotch={false}
        insetClass="left-[21px] right-[21px]"
        bottomSpacerClass="h-[42px]"
      >
        <div className="flex flex-col gap-4 p-3">
          <div className="flex flex-col gap-2 px-0.5">
            <p className="font-primary text-[17px] font-bold leading-6 tracking-[-0.16px] text-blue-gray-900">
              Delete this address?
            </p>
            <Squircle
              cornerRadius={12}
              cornerSmoothing={0.6}
              borderColor="#F2F3F7"
              className="bg-[#FCFCFD]"
            >
              <div className="flex flex-col gap-1.5 p-3">
                <p className="font-primary text-[14px] font-semibold leading-[18px] tracking-[-0.14px] text-blue-gray-900">
                  {target?.title ?? 'Address'}
                </p>
                <p className="font-primary text-[12px] leading-[14px] tracking-[-0.12px] text-blue-gray-700">
                  {target?.address ?? ''}
                </p>
              </div>
            </Squircle>
          </div>

          <div className="flex items-stretch gap-3">
            <Squircle
              cornerRadius={12}
              cornerSmoothing={0.6}
              borderColor="#EAECF0"
              className="flex-1 bg-blue-gray-100"
              onClick={onCancel}
            >
              <div className="flex h-11 items-center justify-center px-6 text-[15px] font-semibold tracking-[-0.26px] text-ink">
                Cancel
              </div>
            </Squircle>
            <Squircle
              cornerRadius={12}
              cornerSmoothing={0.6}
              className="flex-1 bg-red-700"
              onClick={onConfirm}
            >
              <div className="flex h-11 items-center justify-center px-6 text-[15px] font-semibold tracking-[-0.26px] text-neutral-white">
                Yes
              </div>
            </Squircle>
          </div>
        </div>
      </SheetShell>
    </>
  )
}
