import { Box, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Filter from './Filter'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import {
  ALL_BUTTON_VALUE,
  ACTIVE_BUTTON_VALUE,
  getItemStyle,
  reorder,
} from '../helper'

const TodoList = () => {
  const [inputValue, setInputValue] = useState('')
  const [todoList, setTodoList] = useState([])
  const [itemsLeft, setItemsLeft] = useState(0)
  const [showAll, setShowAll] = useState(true)
  const [showActive, setShowActive] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [showCompleted, setShowCompleted] = useState(false)

  const containerColor = useColorModeValue('lightContainer', 'darkContainer')
  const inactiveColor = useColorModeValue(
    'lightInactiveFilter',
    'darkCompletedTodo'
  )

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

  const handleFilterClick = (e) => {
    switch (e.target.value) {
      case ALL_BUTTON_VALUE:
        setShowAll(true)
        setShowActive(false)
        setShowCompleted(false)
        break
      case ACTIVE_BUTTON_VALUE:
        setShowAll(false)
        setShowActive(true)
        setShowCompleted(false)
        break
      default:
        setShowAll(false)
        setShowActive(false)
        setShowCompleted(true)
    }
  }

  const onDragEnd = (result) => {
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
    <>
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
            onAllClick={handleFilterClick}
            onActiveClick={handleFilterClick}
            onCompletedClick={handleFilterClick}
            onClearClick={clearCompletedTodo}
            itemsLeft={itemsLeft}
          />
          {showAll && (
            <Text
              color={inactiveColor}
              fontSize="14px"
              mt="60px"
              textAlign="center"
            >
              Drag and drop to reorder list
            </Text>
          )}
        </Box>
      )}
    </>
  )
}

export default TodoList
