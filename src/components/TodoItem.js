import {
  Center,
  Circle,
  Flex,
  Image,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import crossIcon from '../assets/images/icon-cross.svg'
import checkIcon from '../assets/images/icon-check.svg'

const TodoItem = ({
  bg,
  id,
  value,
  completed,
  onButtonClick,
  onCrossClick,
}) => {
  const [isCompleted, setIsCompleted] = useState(completed)
  const [showCross, setShowCross] = useState(false)
  const [showBorder, setShowBorder] = useState(true)

  const containerColor = useColorModeValue('lightContainer', 'darkContainer')
  const activeTodoColor = useColorModeValue('lightTodoText', 'darkTodoText')
  const completedTodoColor = useColorModeValue(
    'lightCompletedTodo',
    'darkCompletedTodo'
  )
  const dividerColor = useColorModeValue('lightDivider', 'darkDivider')
  const isMobileSize = useBreakpointValue({
    base: true,
    md: false,
  })

  const handleButtonClick = () => {
    setIsCompleted(!isCompleted)

    onButtonClick(id, !isCompleted)
  }

  return (
    <Flex
      w="100%"
      maxW="540px"
      bg={bg}
      h={{ base: '48px', md: '60px' }}
      align="center"
      px={{ base: 4, md: 6 }}
      borderBottomColor={dividerColor}
      borderBottomWidth={1.5}
      onMouseEnter={() => setShowCross(true)}
      onMouseLeave={() => setShowCross(false)}
    >
      <Center
        boxSize="22px"
        rounded="14px"
        _hover={{ bgGradient: 'linear(to-br, #57ddff, #c058f3)' }}
        onMouseEnter={() => setShowBorder(false)}
        onMouseLeave={() => setShowBorder(true)}
      >
        <Circle
          size="20px"
          bg={containerColor}
          borderWidth={showBorder && !isCompleted ? 2 : 0}
          cursor="pointer"
          bgGradient={isCompleted && 'linear(to-br, #57ddff, #c058f3)'}
          onClick={handleButtonClick}
        >
          <Image opacity={isCompleted ? 1 : 0} src={checkIcon} alt="" />
        </Circle>
      </Center>
      <Text
        fontSize={{ base: 'sm', md: 'md' }}
        flex={1}
        ml={{ base: 4, md: 6 }}
        textDecorationLine={isCompleted && 'line-through'}
        textDecorationThickness="from-font"
        color={isCompleted ? completedTodoColor : activeTodoColor}
      >
        {value}
      </Text>
      <Image
        opacity={isMobileSize || showCross ? 1 : 0}
        boxSize={{ base: '14px', md: '16px' }}
        src={crossIcon}
        cursor="pointer"
        onClick={() => onCrossClick(id)}
        alt=""
      />
    </Flex>
  )
}

export default TodoItem
