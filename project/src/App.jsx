import { ThemeProvider } from '@/components/theme-provider'
import HomePage from '@/components/HomePage'

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <HomePage />
    </ThemeProvider>
  )
}

export default App
