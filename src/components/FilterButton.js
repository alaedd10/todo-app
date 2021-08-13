import { Button, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const FilterButton = ({ value, isActive, onClick }) => {
  const inactiveColor = useColorModeValue(
    'lightInactiveFilter',
    'darkCompletedTodo'
  )
  const hoverColor = useColorModeValue('lightTodoText', 'darkTodoText')
  return (
    <Button
      h="auto"
      w="auto"
      minW="unset"
      p={0}
      bg="transparent"
      fontSize="sm"
      transition={0}
      color={inactiveColor}
      value={value}
      isActive={isActive}
      _focus={{ outline: 0 }}
      _hover={{ color: hoverColor }}
      _active={{ bg: 'transparent', color: 'blueFilter' }}
      onClick={(e) => onClick(e)}
    >
      {value}
    </Button>
  )
}

export default FilterButton
