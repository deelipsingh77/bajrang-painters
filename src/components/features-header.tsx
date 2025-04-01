import { motion } from "framer-motion";

// Features Header with Animation
function FeaturesHeader() {
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
      <motion.span
        className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Our Advantages
      </motion.span>
      <motion.h2
        className="text-4xl font-bold mb-4"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
          },
        }}
      >
        Why Choose Us
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
        Committed to Excellence in Every Brushstroke
      </motion.p>
      <motion.div
        className="w-20 h-1 bg-primary mx-auto mt-4"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 80, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
}

export default FeaturesHeader;
