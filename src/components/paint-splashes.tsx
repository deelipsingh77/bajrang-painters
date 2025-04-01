import particleColors from "@/constansts/particle-colors";
import { motion } from "framer-motion";

function PaintSplashes() {
  const splashes = Array.from({ length: 5 }, (_, i) => i)

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {splashes.map((_, i) => {
        const size = Math.random() * 200 + 100
        const color = particleColors[Math.floor(Math.random() * particleColors.length)]
        const left = Math.random() * 100
        const top = Math.random() * 100
        const delay = i * 0.5

        return (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              left: `${left}%`,
              top: `${top}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            transition={{
              duration: 1.5,
              delay,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            viewport={{ once: true, margin: "-100px" }}
          />
        )
      })}
    </div>
  )
}

export default PaintSplashes;