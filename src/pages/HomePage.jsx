import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-black to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_80%)] blur-[100px]" />
      
      {/* Dynamic Lighting Effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/6 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Creative Top Curved Panels */}
      <div className="absolute top-0 left-0 w-full h-[250px] bg-gradient-to-b from-blue-900/20 to-transparent" style={{clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)'}} />
      <div className="absolute top-0 right-0 w-[60%] h-[180px] bg-gradient-to-bl from-blue-800/15 to-transparent" style={{clipPath: 'ellipse(80% 100% at 100% 0%)'}} />
      <div className="absolute top-[160px] left-1/2 transform -translate-x-1/2 w-[700px] h-[120px] bg-gradient-to-b from-blue-800/10 to-transparent" style={{clipPath: 'ellipse(70% 100% at 50% 0%)'}} />
      
      {/* Creative Bottom Curved Panels */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-blue-900/20 to-transparent" style={{clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)'}} />
      <div className="absolute bottom-0 left-0 w-[60%] h-[200px] bg-gradient-to-tr from-blue-800/15 to-transparent" style={{clipPath: 'ellipse(80% 100% at 0% 100%)'}} />
      
      {/* Floating Accent Shapes */}
      <motion.div
        className="absolute top-[30%] right-[10%] w-32 h-32 bg-blue-600/8 rounded-full blur-xl"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[10%] w-24 h-24 bg-blue-500/6 rounded-full blur-lg"
        animate={{
          y: [10, -10, 10],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      
      {/* Spotlight Effects */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-400/5 to-transparent"
        style={{ clipPath: 'ellipse(40% 100% at 50% 0%)' }}
        animate={{
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-gradient-to-t from-purple-400/4 to-transparent"
        style={{ clipPath: 'ellipse(50% 100% at 50% 100%)' }}
        animate={{
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        {/* Creative Studio Tag */}
        <motion.span
          className="inline-block mb-6 px-4 py-1 rounded-full border border-blue-500/15 bg-blue-950/40 backdrop-blur-md text-sm text-blue-200 uppercase tracking-widest"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Creative Studio
        </motion.span>

        {/* Main Heading */}
        <div className="relative flex flex-col items-center">
          <motion.h1
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.2)] premium-font text-center"
            animate={{
              textShadow: [
                "0 0 15px rgba(59,130,246,0.3)",
                "0 0 30px rgba(59,130,246,0.2)", 
                "0 0 15px rgba(59,130,246,0.3)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
          >
            GillaX
          </motion.h1>
          {/* Creative Decorative Line under GillaX */}
          <div className="mt-4 relative">
            <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_8px_rgba(59,130,246,0.4)] opacity-60 mx-auto" />
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full blur-sm" />
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          className="mt-4 text-lg md:text-2xl text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          We make visuals move
        </motion.p>

        {/* Service Buttons */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          {["Video Editing", "Motion Graphics", "3D Animation", "Design"].map(
            (btn, index) => (
              <motion.button
                key={index}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(59,130,246,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-full text-base font-medium
                           border border-blue-500/15 bg-blue-950/30 backdrop-blur-md
                           hover:bg-blue-900/40 hover:border-blue-400/25 transition-all"
              >
                {btn}
              </motion.button>
            )
          )}
        </motion.div>
      </motion.div>
      
      {/* Bottom Light Beam */}
      <motion.div
        className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-blue-900/10 to-transparent blur-[100px]"
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Ambient Light Rays */}
      <motion.div
        className="absolute top-1/2 left-0 w-[200px] h-[2px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
        animate={{
          scaleX: [0.5, 1.5, 0.5],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-0 w-[150px] h-[1px] bg-gradient-to-l from-transparent via-purple-400/25 to-transparent"
        animate={{
          scaleX: [1, 2, 1],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </section>
  );
}