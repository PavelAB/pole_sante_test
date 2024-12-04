// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"

// Import react-router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { route } from './routes/route'

// Import react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const router = createBrowserRouter(route)

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  //</StrictMode>,
)
