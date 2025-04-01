import { motion } from "framer-motion";

// Animated Background Shapes
function AnimatedBackgroundShapes() {
  return (
    <>
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-primary/10"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-32 h-32 rounded-full bg-yellow-500/10"
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -20, 0],
          y: [0, 40, 0],
          rotate: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-48 h-48 rounded-full bg-blue-500/10"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </>
  )
}

export default AnimatedBackgroundShapes;