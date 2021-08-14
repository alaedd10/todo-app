import {
  Box,
  Flex,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import lightDesktopImg from './assets/images/bg-desktop-light.jpg'
import darkDesktopImg from './assets/images/bg-desktop-dark.jpg'
import darkMobileImg from './assets/images/bg-mobile-dark.jpg'
import lightMobileImg from './assets/images/bg-mobile-light.jpg'
import Header from './components/Header'
import TodoList from './components/TodoList'
import Footer from './components/Footer'

function App() {
  const bgColor = useColorModeValue('lightBg', 'darkBg')
  const desktopImageBg = useColorModeValue(lightDesktopImg, darkDesktopImg)
  const mobileImageBg = useColorModeValue(lightMobileImg, darkMobileImg)
  const bgSource = useBreakpointValue({
    base: mobileImageBg,
    md: desktopImageBg,
  })

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
        <TodoList />
        <Footer />
      </Flex>
    </Box>
  )
}

export default App
