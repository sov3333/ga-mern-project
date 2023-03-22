import React from 'react'
import { ImageSwipe, ImageLike } from '../components'
import { setup1 } from '../assets/setups'
import { Container } from '@chakra-ui/react'

const Swipe = () => {
  return (
    <Container p="10px">
        Swipe the image (on mobile)!
        <ImageSwipe src={setup1} />
        Like the image
        <ImageLike src={setup1} />
    </Container>
  )
}

export default Swipe