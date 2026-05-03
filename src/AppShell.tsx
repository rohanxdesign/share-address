import type { ReactNode } from 'react'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-full items-center justify-center bg-blue-gray-200 p-6">
      <div
        className="relative overflow-hidden rounded-[40px] bg-neutral-white shadow-[0_24px_60px_rgba(0,0,0,0.2)]"
        style={{ width: 375, height: 812 }}
      >
        {children}
      </div>
    </div>
  )
}
