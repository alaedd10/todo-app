import { Flex, Image, Spacer, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import moonIcon from '../assets/images/icon-moon.svg'
import sunIcon from '../assets/images/icon-sun.svg'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex w="100%" align="center" color="lightContainer">
      <Text
        fontSize={{ base: '2xl', md: '4xl' }}
        fontWeight="bold"
        letterSpacing="16px"
        textShadow="2xl"
      >
        TODO
      </Text>
      <Spacer />
      <Image
        boxSize={{ base: '20px', md: '28px' }}
        src={colorMode === 'light' ? moonIcon : sunIcon}
        cursor="pointer"
        onClick={toggleColorMode}
        alt=""
      />
    </Flex>
  )
}

export default Header
