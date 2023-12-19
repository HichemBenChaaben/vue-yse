import { ref, onMounted, onUnmounted, watch } from 'vue'
const isBrowser = typeof window !== 'undefined'

interface Breakpoints {
  [key: string]: number
}

export default function createBreakpoints(
  breakpoints: Breakpoints = { laptopL: 1440, laptop: 1024, tablet: 768 }
) {
  const screen = ref(isBrowser ? window.innerWidth : 0)

  const setScreenSize = (): void => {
    updateBreakpoints()
    screen.value = window.innerWidth
  }

  const updateBreakpoints = (): void => {
    result.value = sortedBreakpoints.reduce((acc, [name, width]) => {
      return screen.value >= width ? name : acc
    }, sortedBreakpoints[0][0])
  }
  const sortedBreakpoints = Object.entries(breakpoints).sort((a, b) => (a[1] >= b[1] ? 1 : -1))
  const result = ref(sortedBreakpoints[0][0])

  onMounted(() => {
    setScreenSize()
    window.addEventListener('resize', setScreenSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', setScreenSize)
  })

  watch([() => sortedBreakpoints, () => screen.value], () => {
    setScreenSize()
    updateBreakpoints()
  })

  return result
}
