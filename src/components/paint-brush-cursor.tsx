import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PaintbrushIcon } from "lucide-react";

// Paint Brush Cursor Effect
function PaintBrushCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-40"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      <motion.div
        className="relative"
        animate={{ rotate: [0, 45, 0, -45, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
      >
        <PaintbrushIcon className="w-8 h-8 text-primary" />
        <motion.div
          className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-primary"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>
    </motion.div>
  );
}

export default PaintBrushCursor;
