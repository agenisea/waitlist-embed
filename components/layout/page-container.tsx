import { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  className?: string
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <main className={`min-h-screen h-screen overflow-y-auto ${className}`.trim()}>
      {children}
    </main>
  )
}
