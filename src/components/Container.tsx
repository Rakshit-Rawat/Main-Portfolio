import React from 'react'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 bg-background dark:bg-background transition-colors duration-200 ">
      {children}
    </div>
  )
}