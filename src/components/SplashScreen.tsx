import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 1000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary via-purple-900 to-background overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Animated Planets */}
      <motion.div
        className="absolute top-20 left-20 w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-600"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          rotate: 360,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-yellow-200 to-orange-400 opacity-60" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-32 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-800"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          rotate: -360,
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute inset-3 rounded-full border-2 border-blue-300 opacity-40" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-700"
        animate={{
          x: [0, -60, 0],
          y: [0, 80, 0],
          rotate: 360,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-700"
        animate={{
          x: [0, 70, 0],
          y: [0, -70, 0],
          rotate: -360,
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/4 w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-pink-600"
        animate={{
          x: [0, 90, 0],
          y: [0, -50, 0],
          rotate: 360,
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Saturn-like planet with rings */}
      <motion.div
        className="absolute top-1/4 left-1/2 w-24 h-24"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          rotate: 360,
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 to-amber-600" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-8 border-4 border-amber-400 rounded-full opacity-60" 
               style={{ transform: 'translate(-50%, -50%) rotateX(75deg)' }} />
        </div>
      </motion.div>

      {/* Center Text */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.5,
        }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-white mb-4"
          animate={{
            textShadow: [
              "0 0 20px rgba(255,255,255,0.5)",
              "0 0 40px rgba(255,255,255,0.8)",
              "0 0 20px rgba(255,255,255,0.5)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          Built By
        </motion.h1>
        <motion.h2
          className="text-7xl md:text-9xl font-bold text-gradient-cosmic"
          animate={{
            textShadow: [
              "0 0 30px rgba(139,92,246,0.5)",
              "0 0 60px rgba(139,92,246,0.8)",
              "0 0 30px rgba(139,92,246,0.5)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.3,
          }}
        >
          Prothon
        </motion.h2>
      </motion.div>

      {/* Orbiting particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            top: "50%",
            left: "50%",
          }}
          animate={{
            x: [
              0,
              Math.cos((i / 8) * Math.PI * 2) * 200,
              Math.cos((i / 8) * Math.PI * 2 + Math.PI) * 200,
              0,
            ],
            y: [
              0,
              Math.sin((i / 8) * Math.PI * 2) * 200,
              Math.sin((i / 8) * Math.PI * 2 + Math.PI) * 200,
              0,
            ],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: (i / 8) * 0.5,
          }}
        />
      ))}
    </motion.div>
  );
};
