import {
  Box,
  Flex,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import lightDesktopImg from './assets/images/bg-desktop-light.jpg'
import darkDesktopImg from './assets/images/bg-desktop-dark.jpg'
import darkMobileImg from './assets/images/bg-mobile-dark.jpg'
import lightMobileImg from './assets/images/bg-mobile-light.jpg'
import TodoItem from './components/TodoItem'
import TodoInput from './components/TodoInput'
import Header from './components/Header'
import Filter from './components/Filter'
import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [todoList, setTodoList] = useState([])
  const [itemsLeft, setItemsLeft] = useState(0)
  const [showAll, setShowAll] = useState(true)
  const [showActive, setShowActive] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [showCompleted, setShowCompleted] = useState(false)

  const addTodo = () => {
    if (inputValue) {
      const updatedTodoList = [...todoList]
      updatedTodoList.push({
        id: todoList.length + 1,
        value: inputValue,
        isCompleted: false,
      })
      setTodoList(updatedTodoList)
      setInputValue('')
      setItemsLeft((prev) => prev + 1)
    }
  }

  const clearCompletedTodo = () => {
    const updatedTodoList = todoList.filter((todo) => !todo.isCompleted)
    setTodoList(updatedTodoList)
  }

  const deleteTodo = (id) => {
    const toDelete = todoList.find((todo) => todo.id === id)
    if (!toDelete.isCompleted) {
      setItemsLeft((prev) => prev - 1)
    }

    const updatedTodoList = todoList.filter((todo) => todo.id !== id)
    setTodoList(updatedTodoList)
  }

  const setCompletedTodo = (id, isCompleted) => {
    isCompleted
      ? setItemsLeft((prev) => prev - 1)
      : setItemsLeft((prev) => prev + 1)

    const updatedTodoList = [...todoList]
    updatedTodoList.forEach((todo) => {
      if (todo.id === id) {
        return (todo.isCompleted = isCompleted)
      }
    })
    setTodoList(updatedTodoList)
  }

  const handleAllClick = () => {
    setShowAll(true)
    setShowActive(false)
    setShowCompleted(false)
  }

  const handleActiveClick = () => {
    setShowAll(false)
    setShowActive(true)
    setShowCompleted(false)
  }

  const handleCompletedClick = () => {
    setShowAll(false)
    setShowActive(false)
    setShowCompleted(true)
  }

  const bgColor = useColorModeValue('lightBg', 'darkBg')
  const containerColor = useColorModeValue('lightContainer', 'darkContainer')
  const desktopImageBg = useColorModeValue(lightDesktopImg, darkDesktopImg)
  const mobileImageBg = useColorModeValue(lightMobileImg, darkMobileImg)
  const bgSource = useBreakpointValue({
    base: mobileImageBg,
    md: desktopImageBg,
  })

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
    userSelect: 'none',
    width: '540px',
  })

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }
    const items = reorder(
      todoList,
      result.source.index,
      result.destination.index
    )
    setTodoList(items)
  }

  return (
    <Box
      bg={bgColor}
      bgImage={bgSource}
      bgRepeat="no-repeat"
      bgSize="contain"
      display="flex"
      justifyContent="center"
      minHeight="100vh"
    >
      <Flex
        direction="column"
        w="90%"
        maxW="540px"
        mt={{ base: '40px', md: '80px' }}
        mb="60px"
      >
        <Header />
        <TodoInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onButtonClick={addTodo}
          onEnterPress={addTodo}
        />
        {todoList.length > 0 && (
          <Box>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <VStack
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    borderTopRadius={6}
                    bg={containerColor}
                    alignItems="flex-start"
                    spacing={0}
                    overflow="hidden"
                  >
                    {showAll
                      ? todoList.map((todo, index) => (
                          <Draggable
                            key={todo.id}
                            draggableId={todo.id + ''}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <TodoItem
                                  bg={containerColor}
                                  key={todo.id}
                                  id={todo.id}
                                  value={todo.value}
                                  completed={todo.isCompleted}
                                  onCrossClick={deleteTodo}
                                  onButtonClick={setCompletedTodo}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))
                      : showActive
                      ? todoList
                          .filter((todo) => !todo.isCompleted)
                          .map((todo) => (
                            <TodoItem
                              key={todo.id}
                              id={todo.id}
                              value={todo.value}
                              completed={todo.isCompleted}
                              onCrossClick={deleteTodo}
                              onButtonClick={setCompletedTodo}
                            />
                          ))
                      : todoList
                          .filter((todo) => todo.isCompleted)
                          .map((todo) => (
                            <TodoItem
                              key={todo.id}
                              id={todo.id}
                              value={todo.value}
                              completed={todo.isCompleted}
                              onCrossClick={deleteTodo}
                              onButtonClick={setCompletedTodo}
                            />
                          ))}
                    {provided.placeholder}
                  </VStack>
                )}
              </Droppable>
            </DragDropContext>
            <Filter
              onAllClick={handleAllClick}
              onActiveClick={handleActiveClick}
              onCompletedClick={handleCompletedClick}
              onClearClick={clearCompletedTodo}
              itemsLeft={itemsLeft}
            />
          </Box>
        )}
      </Flex>
    </Box>
  )
}

export default App
