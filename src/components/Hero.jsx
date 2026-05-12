import { ArrowRight, Shield, BarChart3, Brain, Smartphone } from "lucide-react";

function Hero() {
  return (
    <section className="hero">
      <div className="heroGlow heroGlowOne"></div>
      <div className="heroGlow heroGlowTwo"></div>

      <div className="heroContent">
        <div className="badge">
          <Brain size={16} />
          AI-Powered Education OS
        </div>

        <h1>
          The Intelligent Operating System for{" "}
          <span>Modern Educators</span>
        </h1>

        <p className="heroText">
          NexNena AI empowers Sri Lankan teachers and institutes with AI tools,
          analytics, automation, and smart learning systems to build the future
          of education.
        </p>

        <div className="heroButtons">
          <button className="primaryBtn">
            Book a Demo <ArrowRight size={18} />
          </button>
          <button className="secondaryBtn">Explore Features</button>
        </div>

        <div className="heroPills">
          <div><Brain size={16} /> AI-Powered</div>
          <div><BarChart3 size={16} /> Data-Driven</div>
          <div><Shield size={16} /> Secure</div>
          <div><Smartphone size={16} /> Mobile First</div>
        </div>
      </div>

      <div className="dashboardCard">
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
      </div>
    </section>
  );
}

export default Hero;