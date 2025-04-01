import particleColors from "@/constants/particle-colors"
import { motion } from "framer-motion";

function PaintDrops() {
  const drops = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {drops.map((_, i) => {
        const size = Math.random() * 30 + 10
        const color = particleColors[Math.floor(Math.random() * particleColors.length)]
        const left = Math.random() * 100
        const delay = Math.random() * 20
        const duration = Math.random() * 20 + 10

        return (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              left: `${left}%`,
              top: -100,
            }}
            animate={{
              top: ["0%", "100%"],
              scale: [1, 0.8, 1.2, 0.7, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )
      })}
    </div>
  )
}

export default PaintDrops;