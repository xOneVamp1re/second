import { Inter } from 'next/font/google'
import '../style/globals.css'
import PropTypes from 'prop-types'
import { AntdRegistry } from '@ant-design/nextjs-registry'

import { AppContextProvider } from '../context/AppContextProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
export const metadata = {
  title: 'Второй проект',
  description: 'Попытка работы с nextJS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.variable}>
        <AntdRegistry>
          <AppContextProvider>{children}</AppContextProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
