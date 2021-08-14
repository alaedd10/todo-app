import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: 'Josefin Sans, sans-serif',
    body: 'Josefin Sans, sans-serif',
  },
  colors: {
    lightBg: '#e4e5f1',
    darkBg: '#161722',
    lightContainer: '#fafafa',
    darkContainer: '#25273c',
    lightTodoText: '#484b6a',
    darkTodoText: '#cacde8',
    lightCompletedTodo: '#d2d3db',
    darkCompletedTodo: '#777a92',
    lightDivider: '#d2d3db',
    darkDivider: '#393a4c',
    blueFilter: '#3a7bfd',
    lightInactiveFilter: '#9394a5',
  },
})

export const ALL_BUTTON_VALUE = 'All'
export const ACTIVE_BUTTON_VALUE = 'Active'
export const COMPLETED_BUTTON_VALUE = 'Completed'

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
  userSelect: 'none',
  width: '540px',
})
