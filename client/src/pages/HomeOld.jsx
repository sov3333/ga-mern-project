import { Flex } from '@chakra-ui/react'

import { Hero, Showcase } from '../components'

const HomeOld = () => {
  return (
    <div>
      <Hero />
      <Showcase />
      <Flex flexDirection='column' alignItems='center' justifyContent='center'>
        <div>TODO:</div>
        <div>...  </div>
        <div>add footer </div>
      </Flex>
    </div>
  )
}

export default HomeOld