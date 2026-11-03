import { motion } from 'framer-motion'
import './IntroLoader.css'

export default function IntroLoader({ onComplete }) {
  return (
    <motion.div className="intro-loader" initial={{opacity:1}} animate={{opacity:1}} exit={{opacity:0, transition:{duration:0.5}}}>
      <div className="intro-inner">
        <motion.img
          className="intro-emblem"
          src="/logo%202.png"
          alt="Safe Sphere India logo"
          initial={{opacity:0, scale:0.9}}
          animate={{opacity:1, scale:1}}
          transition={{duration:0.6, ease:[0.22,1,0.36,1]}}
          onError={(e)=>{ e.currentTarget.style.display='none' }}
        />
        <motion.h1 className="intro-title" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.6}}>Safe Sphere India</motion.h1>
        <motion.p className="intro-sub" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.6,delay:0.9}}>A little space to pause, reflect, and grow.</motion.p>
        <motion.p className="intro-caption" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.6,delay:1.1}}>WORKPLACE & CHILDREN'S WELLBEING</motion.p>
        <motion.div className="intro-progress" initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:1.2,delay:0.3,ease:'easeInOut'}} />
      </div>
    </motion.div>
  )
}
