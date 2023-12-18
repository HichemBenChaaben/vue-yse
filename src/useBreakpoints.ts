import { ref, onMounted, onUnmounted, watch } from 'vue'
const isBrowser = typeof window !== 'undefined'

interface Breakpoints {
  [key: string]: number
}

export default function createBreakpoint(
  breakpoints: Breakpoints = { laptopL: 1440, laptop: 1024, tablet: 768 }
) {
  const screen = ref(isBrowser ? window.innerWidth : 0)

  const setScreenSize = (): void => {
    screen.value = window.innerWidth
  }

  onMounted(() => {
    setScreenSize()
    window.addEventListener('resize', setScreenSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', setScreenSize)
  })

  const sortedBreakpoints = Object.entries(breakpoints).sort((a, b) => (a[1] >= b[1] ? 1 : -1))

  watch(
    () => sortedBreakpoints,
    () => {
      setScreenSize()
    }
  )

  const result = ref(sortedBreakpoints[0][0])

  watch(
    () => screen.value,
    () => {
      result.value = sortedBreakpoints.reduce((acc, [name, width]) => {
        return screen.value >= width ? name : acc
      }, sortedBreakpoints[0][0])
    }
  )

  return result
}
