import { motion } from "framer-motion";

// Stats Header with Animation
function StatsHeader() {
  return (
    <motion.div
      className="text-center mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
    >
      <motion.h2
        className="text-4xl font-bold mb-4 relative inline-block"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
          },
        }}
      >
        Our Impact
        <motion.span
          className="absolute -bottom-2 left-0 right-0 h-1 bg-primary"
          initial={{ width: 0, left: "50%" }}
          whileInView={{ width: "100%", left: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        />
      </motion.h2>
      <motion.p
        className="text-gray-600 mt-4 max-w-2xl mx-auto"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.2 },
          },
        }}
      >
        Our dedication to excellence has made a significant impact in the
        industry and for our clients
      </motion.p>
    </motion.div>
  );
}

export default StatsHeader;
