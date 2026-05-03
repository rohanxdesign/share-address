import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Retune } from 'retune'
import './index.css'
import { EntryScreen } from './screens/EntryScreen'
import { AppShell } from './AppShell'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppShell>
        <EntryScreen />
      </AppShell>
    ),
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Retune force position="top-right" hotkey="alt+e" />
  </StrictMode>,
)
