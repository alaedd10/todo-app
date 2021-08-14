import { Box, Link } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Box
      position="absolute"
      alignSelf="center"
      bottom="3"
      fontSize="11px"
      mt={2}
    >
      Challenge by{' '}
      <Link
        color="hsl(228, 45%, 44%)"
        href="https://www.frontendmentor.io?ref=challenge"
        isExternal
      >
        Frontend Mentor
      </Link>
      . Coded by{' '}
      <Link
        color="hsl(228, 45%, 44%)"
        href="https://github.com/alaedd-hammami"
        isExternal
      >
        Ala Eddine
      </Link>
      .
    </Box>
  )
}

export default Footer
