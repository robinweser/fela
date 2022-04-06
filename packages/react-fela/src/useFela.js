import { useContext } from 'react'
import { useFelaFactory } from 'fela-bindings'

import { ThemeContext, RendererContext } from './context'

export default useFelaFactory(RendererContext, ThemeContext, useContext)
