import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Individual Stat Item with Counter Animation
function StatItem({
  number,
  label,
  delay,
  color,
}: {
  number: number;
  label: string;
  delay: number;
  color: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      let animationFrame: number;
      const duration = 2000; // 2 seconds

      const animate = (timestamp: number): void => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * number));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, number]);

  return (
    <motion.div
      ref={ref}
      className="text-center relative"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay,
          },
        },
      }}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${color} opacity-5 rounded-xl`}
        initial={{ scale: 0, borderRadius: "100%" }}
        whileInView={{ scale: 1, borderRadius: "0.75rem" }}
        transition={{ duration: 0.8, delay }}
        viewport={{ once: true }}
      />
      <motion.div
        className="relative z-10 p-8"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.h3
          className={`text-5xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: delay + 0.2,
          }}
          viewport={{ once: true }}
        >
          {count}+
        </motion.h3>
        <motion.div
          className="w-12 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto my-3"
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          transition={{ duration: 0.8, delay: delay + 0.4 }}
          viewport={{ once: true }}
        />
        <motion.p
          className="text-gray-600 mt-2 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.6 }}
          viewport={{ once: true }}
        >
          {label}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// Stats Counter with Animation
function StatsCounter() {
  return (
    <motion.div
      className="grid md:grid-cols-3 gap-8"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <StatItem
        number={3690}
        label="Successful Projects"
        delay={0.2}
        color="from-pink-500 to-purple-500"
      />
      <StatItem
        number={10}
        label="Years Experience"
        delay={0.4}
        color="from-blue-500 to-cyan-500"
      />
      <StatItem
        number={8800}
        label="Happy Clients"
        delay={0.6}
        color="from-green-500 to-emerald-500"
      />
    </motion.div>
  );
}

export default StatsCounter;
