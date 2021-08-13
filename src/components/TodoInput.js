import { Circle, Flex, Input, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const TodoInput = ({ value = '', onChange, onButtonClick, onEnterPress }) => {
  const containerColor = useColorModeValue('lightContainer', 'darkContainer')
  const textInputColor = useColorModeValue('lightTodoText', 'darkTodoText')
  return (
    <Flex
      bg={containerColor}
      h={{ base: '48px', md: '60px' }}
      mt="30px"
      mb="20px"
      align="center"
      px={{ base: 4, md: 6 }}
      rounded={6}
    >
      <Circle
        size="20px"
        borderWidth={2}
        cursor="pointer"
        _active={{ bgGradient: 'linear(to-br, #57ddff, #c058f3)' }}
        onClick={() => onButtonClick()}
      />
      <Input
        fontSize={{ base: 'sm', md: 'md' }}
        textAlign="left"
        placeholder="Create a new todo..."
        border="none"
        px={0}
        ml={{ base: 4, md: 6 }}
        transition="none"
        color={textInputColor}
        value={value}
        onChange={(e) => onChange(e)}
        onKeyPress={(e) => e.key === 'Enter' && onEnterPress()}
        _focus={{ outline: 0 }}
      />
    </Flex>
  )
}

export default TodoInput
