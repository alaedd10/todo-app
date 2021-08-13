import {
  ButtonGroup,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import FilterButton from './FilterButton'

const ALL_BUTTON_VALUE = 'All'
const ACTIVE_BUTTON_VALUE = 'Active'
const COMPLETED_BUTTON_VALUE = 'Completed'

const Filter = ({
  itemsLeft,
  onAllClick,
  onActiveClick,
  onCompletedClick,
  onClearClick,
}) => {
  const [activeButton, setActiveButton] = useState(ALL_BUTTON_VALUE)

  const isMobileSize = useBreakpointValue({
    base: true,
    md: false,
  })
  const containerColor = useColorModeValue('lightContainer', 'darkContainer')
  const inactiveColor = useColorModeValue(
    'lightInactiveFilter',
    'darkCompletedTodo'
  )
  const hoverColor = useColorModeValue('lightTodoText', 'darkTodoText')

  const handleAllClick = (e) => {
    setActiveButton(e.target.value)
    onAllClick()
  }

  const handleActiveClick = (e) => {
    setActiveButton(e.target.value)
    onActiveClick()
  }

  const handleCompletedClick = (e) => {
    setActiveButton(e.target.value)
    onCompletedClick()
  }
  return (
    <>
      <Flex
        bg={containerColor}
        w="100%"
        h="48px"
        align="center"
        px={{ base: 4, md: 6 }}
        justify="space-between"
        borderBottomRadius={6}
      >
        <Text
          minW="76px"
          color={inactiveColor}
          fontSize={{ base: 'xs', md: 'sm' }}
        >
          {itemsLeft} {itemsLeft > 1 ? 'items' : 'item'} left
        </Text>
        {!isMobileSize && (
          <ButtonGroup spacing={4}>
            <FilterButton
              isActive={activeButton === ALL_BUTTON_VALUE}
              value={ALL_BUTTON_VALUE}
              onClick={handleAllClick}
            />
            <FilterButton
              isActive={activeButton === ACTIVE_BUTTON_VALUE}
              value={ACTIVE_BUTTON_VALUE}
              onClick={handleActiveClick}
            />
            <FilterButton
              isActive={activeButton === COMPLETED_BUTTON_VALUE}
              value={COMPLETED_BUTTON_VALUE}
              onClick={handleCompletedClick}
            />
          </ButtonGroup>
        )}
        <Text
          color={inactiveColor}
          _hover={{
            color: hoverColor,
          }}
          cursor="pointer"
          fontSize={{ base: 'xs', md: 'sm' }}
          onClick={() => onClearClick()}
        >
          Clear Completed
        </Text>
      </Flex>

      {isMobileSize && (
        <Flex
          bg={containerColor}
          w="100%"
          h="48px"
          align="center"
          px={{ base: 4, md: 6 }}
          mt="20px"
          justify="center"
          rounded={6}
        >
          <ButtonGroup spacing={4}>
            <FilterButton
              isActive={activeButton === ALL_BUTTON_VALUE}
              value={ALL_BUTTON_VALUE}
              onClick={handleAllClick}
            />
            <FilterButton
              isActive={activeButton === ACTIVE_BUTTON_VALUE}
              value={ACTIVE_BUTTON_VALUE}
              onClick={handleActiveClick}
            />
            <FilterButton
              isActive={activeButton === COMPLETED_BUTTON_VALUE}
              value={COMPLETED_BUTTON_VALUE}
              onClick={handleCompletedClick}
            />
          </ButtonGroup>
        </Flex>
      )}
    </>
  )
}

export default Filter
