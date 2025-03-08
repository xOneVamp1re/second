'use client'

import { LoadingOutlined } from '@ant-design/icons'
import { Flex, Spin } from 'antd'
const Loader = () => {
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        height: '100vh',
        maxWidth: '1010px',
        margin: '0 auto',
      }}>
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 48,
            }}
            spin
          />
        }
      />
    </Flex>
  )
}

export default Loader
