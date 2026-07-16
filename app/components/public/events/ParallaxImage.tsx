import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import Picture from '../../elements/Picture'

export function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-x-0 top-[-8%] w-full h-[116%]">
        <Picture priority fill src={src} alt={alt} className="object-cover object-center" aria-hidden="true" />
      </motion.div>
    </div>
  )
}
