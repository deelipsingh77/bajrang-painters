import { motion } from "framer-motion";

function TextReveal({ text }: { text: string }) {
  // Split text into words
  const words = text.split(" ");

  // Animation variants for container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  // Animation variants for each word
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight flex flex-wrap text-white drop-shadow-lg"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span key={index} className="mr-2 inline-block" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default TextReveal;
