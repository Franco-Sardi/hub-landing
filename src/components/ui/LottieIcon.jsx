import { Player } from '@lottiefiles/react-lottie-player'

// trigger: 'hover' | 'loop' | 'autoplay'
export default function LottieIcon({ src, size = 32, trigger = 'hover', className = '' }) {
  const isHover = trigger === 'hover'
  return (
    <Player
      hover={isHover}
      autoplay={!isHover}
      loop={!isHover}
      src={src}
      style={{ width: size, height: size }}
      className={className}
    />
  )
}
