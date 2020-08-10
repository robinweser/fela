import * as React from 'react'

declare module 'jest-react-fela' {
  export function createSnapshot(component: React.ReactElement): string
}
