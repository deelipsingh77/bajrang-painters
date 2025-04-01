import { motion, useScroll, useTransform } from "framer-motion";

// Parallax Background for Stats Section
function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <>
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.03), transparent 800px)",
        }}
      />
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/5"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute top-40 right-10 w-80 h-80 rounded-full bg-blue-500/5"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-yellow-500/5"
        style={{ y: y3 }}
      />
    </>
  );
}

export default ParallaxBackground;
