import { motion } from "framer-motion";
import {
  BrushIcon,
  DollarSignIcon,
  LeafIcon,
  PaintBucketIcon,
  ShieldIcon,
  StarIcon,
} from "lucide-react";
import { useState } from "react";
import { Card } from "./ui/card";

// Individual Feature Card with 3D Effect
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

function FeatureCard({
  icon,
  title,
  description,
  color,
  delay,
}: FeatureCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((centerX - x) / centerX) * 10;

    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className="h-full perspective-1000"
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
        className="relative h-full rounded-xl overflow-hidden"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
        }}
        whileHover={{ z: 20 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Card className="p-6 h-full border-none shadow-xl relative z-10 bg-white/90 backdrop-blur-sm">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br opacity-5 rounded-xl"
            style={{
              background: `linear-gradient(to bottom right, var(--${color}))`,
            }}
          />
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={`bg-gradient-to-br ${color} p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto`}
          >
            {icon}
          </motion.div>
          <motion.h3
            className="text-xl font-semibold mb-2 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.3 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h3>
          <motion.div
            className="w-10 h-0.5 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-3"
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            transition={{ duration: 0.8, delay: delay + 0.4 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-gray-600 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.5 }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>
        </Card>
      </motion.div>
    </motion.div>
  );
}

// 3D Feature Cards
function FeatureCards() {
  const features = [
    {
      icon: <LeafIcon className="w-8 h-8 text-white" />,
      title: "Eco-Friendly",
      description: "We use environmentally conscious materials and techniques",
      color: "from-green-500 to-emerald-500",
      delay: 0,
    },
    {
      icon: <DollarSignIcon className="w-8 h-8 text-white" />,
      title: "Value for Money",
      description: "Competitive pricing without compromising on quality",
      color: "from-blue-500 to-cyan-500",
      delay: 0.1,
    },
    {
      icon: <BrushIcon className="w-8 h-8 text-white" />,
      title: "Expert Team",
      description: "Skilled professionals with years of experience",
      color: "from-purple-500 to-indigo-500",
      delay: 0.2,
    },
    {
      icon: <ShieldIcon className="w-8 h-8 text-white" />,
      title: "Satisfaction Guaranteed",
      description: "Your satisfaction is our top priority",
      color: "from-red-500 to-pink-500",
      delay: 0.3,
    },
    {
      icon: <PaintBucketIcon className="w-8 h-8 text-white" />,
      title: "Quality Materials",
      description: "We use only the highest quality paints and materials",
      color: "from-yellow-500 to-amber-500",
      delay: 0.4,
    },
    {
      icon: <StarIcon className="w-8 h-8 text-white" />,
      title: "Experienced",
      description: "Over 10 years of industry experience",
      color: "from-orange-500 to-red-500",
      delay: 0.5,
    },
  ];

  return (
    <motion.div
      className="grid md:grid-cols-3 gap-8"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          color={feature.color}
          delay={feature.delay}
        />
      ))}
    </motion.div>
  );
}

export default FeatureCards;
