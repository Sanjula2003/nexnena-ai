import {
  ArrowRight,
  Shield,
  BarChart3,
  Brain,
  Smartphone,
} from "lucide-react";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../utils/motion";

function Hero() {
  return (
    <section className="hero">
      <div className="heroGlow heroGlowOne"></div>
      <div className="heroGlow heroGlowTwo"></div>

      <motion.div
        className="heroContent"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="badge">
          <Brain size={16} />
          AI-Powered Education OS
        </motion.div>

        <motion.h1 variants={fadeUp}>
          The Intelligent Operating System for{" "}
          <span>Modern Educators</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="heroText">
          NexNena AI empowers Sri Lankan teachers and institutes with AI tools,
          analytics, automation, and smart learning systems to build the future
          of education.
        </motion.p>

        <motion.div variants={fadeUp} className="heroButtons">
          <a href="/login" className="primaryBtn">
            Book a Demo <ArrowRight size={18} />
          </a>

          <button className="secondaryBtn">
            Explore Features
          </button>
        </motion.div>

        <motion.div variants={fadeUp} className="heroPills">
          <div><Brain size={16} /> AI-Powered</div>
          <div><BarChart3 size={16} /> Data-Driven</div>
          <div><Shield size={16} /> Secure</div>
          <div><Smartphone size={16} /> Mobile First</div>
        </motion.div>
      </motion.div>

      <motion.div
        className="dashboardCard"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9 }}
      >
        <div className="dashboardTop">
          <div>
            <h3>NexNena Teacher OS</h3>
            <p>Good evening, Sanjula 👋</p>
          </div>

          <span>May 2026</span>
        </div>

        <div className="kpiGrid">
          <div className="kpiCard purple">
            <p>Total Students</p>
            <h2>248</h2>
            <span>↑ 12 this month</span>
          </div>

          <div className="kpiCard blue">
            <p>Revenue</p>
            <h2>LKR 128,450</h2>
            <span>↑ 18.6%</span>
          </div>

          <div className="kpiCard green">
            <p>Attendance</p>
            <h2>86.7%</h2>
            <span>↑ 6.4%</span>
          </div>

          <div className="kpiCard orange">
            <p>Engagement</p>
            <h2>78/100</h2>
            <span>↑ 9 pts</span>
          </div>
        </div>

        <div className="insightsBox">
          <h4>AI Insights</h4>

          <div className="insightItem">
            <span className="dot purpleDot"></span>
            12 students are at revision risk
          </div>

          <div className="insightItem">
            <span className="dot blueDot"></span>
            Biology class engagement increased
          </div>

          <div className="insightItem">
            <span className="dot greenDot"></span>
            5 payments are pending
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;