import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaintbrushIcon } from "lucide-react";

// Move interface definition outside component
interface PaintSplatter {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
}

interface PaintBrushCursorProps {
  color?: string;
  size?: number;
  enableSplatter?: boolean;
}

function PaintBrushCursor({
  color = "primary",
  size = 8,
  enableSplatter = true,
}: PaintBrushCursorProps) {
  // Use refs for values that don't need to trigger re-renders
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const prevPositionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const isClickingRef = useRef(false);
  const isHoveringInteractiveRef = useRef(false);
  const requestRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);
  const splatterIdCounter = useRef(0);

  // Use state only for values that need to trigger re-renders
  const [isVisible, setIsVisible] = useState(false);
  const [splatters, setSplatters] = useState<PaintSplatter[]>([]);
  const [cursorState, setCursorState] = useState({
    x: 0,
    y: 0,
    tiltX: 0,
    tiltY: 0,
    velocityMagnitude: 0,
    isClicking: false,
    isHoveringInteractive: false,
  });

  // Color variations for the paint splatter
  const colorVariations = {
    primary: ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#1d4ed8"],
    red: ["#dc2626", "#ef4444", "#f87171", "#b91c1c", "#991b1b"],
    green: ["#16a34a", "#22c55e", "#4ade80", "#15803d", "#166534"],
    yellow: ["#ca8a04", "#eab308", "#facc15", "#a16207", "#854d0e"],
    purple: ["#7e22ce", "#a855f7", "#d8b4fe", "#6b21a8", "#581c87"],
  };

  const brushColors =
    colorVariations[color as keyof typeof colorVariations] ||
    colorVariations.primary;

  // Smooth animation using requestAnimationFrame
  const animateCursor = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;

      // Calculate velocity using refs
      const dx = mousePositionRef.current.x - prevPositionRef.current.x;
      const dy = mousePositionRef.current.y - prevPositionRef.current.y;

      // Smooth out velocity calculation with refs
      velocityRef.current = {
        x: 0.85 * velocityRef.current.x + (0.15 * dx) / (deltaTime || 16.67),
        y: 0.85 * velocityRef.current.y + (0.15 * dy) / (deltaTime || 16.67),
      };

      prevPositionRef.current = { ...mousePositionRef.current };

      // Calculate derived values
      const velocityMagnitude = Math.sqrt(
        velocityRef.current.x ** 2 + velocityRef.current.y ** 2
      );
      const tiltX = Math.min(Math.max(-velocityRef.current.y * 2, -30), 30);
      const tiltY = Math.min(Math.max(velocityRef.current.x * 2, -30), 30);

      // Update state only when needed (batched)
      setCursorState({
        x: mousePositionRef.current.x,
        y: mousePositionRef.current.y,
        tiltX,
        tiltY,
        velocityMagnitude,
        isClicking: isClickingRef.current,
        isHoveringInteractive: isHoveringInteractiveRef.current,
      });
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateCursor);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateCursor);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animateCursor]);

  // Mouse event handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      isHoveringInteractiveRef.current =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("interactive") ||
        target.closest("nav") !== null || // Add navbar check
        target.closest("header") !== null; // Also check headers
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        // Left click only
        isClickingRef.current = true;

        // Create paint splatters on click if enabled
        if (enableSplatter) {
          const splatterCount = Math.floor(Math.random() * 3) + 2;
          const newSplatters: PaintSplatter[] = [];

          for (let i = 0; i < splatterCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 10;
            const splatterSize = Math.random() * 15 + 5;
            const colorIndex = Math.floor(Math.random() * brushColors.length);

            newSplatters.push({
              id: splatterIdCounter.current++,
              x: mousePositionRef.current.x + Math.cos(angle) * distance,
              y: mousePositionRef.current.y + Math.sin(angle) * distance,
              size: splatterSize,
              rotation: Math.random() * 360,
              color: brushColors[colorIndex],
            });
          }

          setSplatters((prev) => {
            // More efficient cleanup - only keep the last 20
            const merged = [...prev, ...newSplatters];
            return merged.length > 20 ? merged.slice(-20) : merged;
          });
        }
      }
    };

    const handleMouseUp = () => {
      isClickingRef.current = false;
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove);
      document.body.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        document.body.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [enableSplatter, brushColors]);

  // Skip rendering if user prefers reduced motion
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return null;
  }

  return (
    <>
      {/* The paint brush cursor with increased z-index */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: cursorState.x - size * 2,
          y: cursorState.y - size * 2,
          opacity: isVisible ? 1 : 0,
          scale: cursorState.isClicking ? 0.9 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.4,
        }}
      >
        <motion.div
          className="relative"
          animate={{
            rotateX: cursorState.tiltX,
            rotateY: cursorState.tiltY,
            rotate: cursorState.isHoveringInteractive
              ? [0, 10, 0, -10, 0]
              : cursorState.velocityMagnitude > 0.3
              ? [0, 15 * Math.sign(velocityRef.current.x), 0]
              : [0, 5, 0, -5, 0],
          }}
          transition={{
            rotateX: { type: "spring", stiffness: 300, damping: 20 },
            rotateY: { type: "spring", stiffness: 300, damping: 20 },
            rotate: {
              duration: cursorState.isHoveringInteractive ? 1.5 : 5,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Brush handle */}
          <PaintbrushIcon
            style={{
              width: `${size * 4}px`,
              height: `${size * 4}px`,
              color: cursorState.isHoveringInteractive
                ? "#f59e0b"
                : brushColors[0],
            }}
            strokeWidth={2}
          />

          {/* Paint drip */}
          <motion.div
            style={{
              position: "absolute",
              bottom: "-4px",
              right: "-4px",
              width: `${Math.max(8, size)}px`,
              height: `${Math.max(8, size)}px`,
              borderRadius: "50%",
              backgroundColor: cursorState.isHoveringInteractive
                ? "#f59e0b"
                : brushColors[0],
            }}
            animate={{
              scale: cursorState.isClicking ? [1, 2, 1] : [1, 1.5, 1],
              y: cursorState.isClicking ? [0, 8, 0] : [0, 3, 0],
            }}
            transition={{
              duration: cursorState.isClicking ? 0.8 : 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Paint trail */}
          {cursorState.velocityMagnitude > 0.5 && (
            <motion.div
              style={{
                position: "absolute",
                top: `${size * 2}px`,
                left: `${size * 2}px`,
                width: "3px",
                height: `${Math.min(
                  15,
                  Math.max(3, Math.floor(cursorState.velocityMagnitude * 3))
                )}px`,
                borderRadius: "full",
                opacity: 0.3,
                backgroundColor: cursorState.isHoveringInteractive
                  ? "#f59e0b"
                  : brushColors[0],
                transformOrigin: "top center",
                transform: `rotate(${
                  Math.atan2(velocityRef.current.y, velocityRef.current.x) *
                    (180 / Math.PI) +
                  90
                }deg)`,
              }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Paint splatters with increased z-index and performance optimizations */}
      <AnimatePresence>
        {splatters.map((splatter) => (
          <motion.div
            key={splatter.id}
            className="fixed pointer-events-none z-[9990]"
            style={{
              left: 0,
              top: 0,
              x: splatter.x,
              y: splatter.y,
              backgroundColor: splatter.color,
              borderRadius: "50%",
              rotate: splatter.rotation,
              width: splatter.size,
              height: splatter.size,
            }}
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}

export default PaintBrushCursor;
