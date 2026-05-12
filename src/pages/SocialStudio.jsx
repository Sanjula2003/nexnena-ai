import {
  Image,
  Sparkles,
  Hash,
  CalendarDays,
  BarChart3,
  PlaySquare,
} from "lucide-react";

const tools = [
  {
    icon: <Image size={20} />,
    title: "Poster Generator",
    desc: "Generate premium educational poster concepts instantly.",
  },
  {
    icon: <Hash size={20} />,
    title: "Caption & Hashtags",
    desc: "AI-generated captions and hashtags optimized for reach.",
  },
  {
    icon: <PlaySquare size={20} />,
    title: "Reel & TikTok Ideas",
    desc: "Short-form content ideas tailored for student engagement.",
  },
  {
    icon: <CalendarDays size={20} />,
    title: "Content Planner",
    desc: "Smart educational content scheduling and planning.",
  },
  {
    icon: <BarChart3 size={20} />,
    title: "Engagement Analytics",
    desc: "Track post performance and social media growth insights.",
  },
  {
    icon: <Sparkles size={20} />,
    title: "AI Branding Assistant",
    desc: "Create consistent educational branding across platforms.",
  },
];

function SocialStudio() {
  return (
    <section className="socialSection">
      <div className="sectionHeader">
        <span>SOCIAL STUDIO AI</span>

        <h2>AI-Powered Content & Growth Systems.</h2>

        <p>
          Built for modern educators who want to scale their educational brand,
          content, and student engagement through intelligent automation.
        </p>
      </div>

      <div className="socialLayout">
        <div className="posterPreview">
          <div className="posterTop">
            <div>
              <h3>AI Poster Studio</h3>
              <p>Generate educational campaign content instantly.</p>
            </div>

            <div className="socialBadge">Live AI Generation</div>
          </div>

          <div className="posterCard">
            <div className="posterGlow"></div>

            <span className="posterTag">2026 Advanced Level Physics</span>

            <h2>
              Master Physics with
              <span> AI-Powered Learning.</span>
            </h2>

            <p>
              Join the next generation of intelligent revision systems and smart
              educational experiences.
            </p>

            <button>Register Now</button>
          </div>

          <div className="socialMetrics">
            <div>
              <h4>48K+</h4>
              <span>Monthly Reach</span>
            </div>

            <div>
              <h4>18.6%</h4>
              <span>Engagement Growth</span>
            </div>

            <div>
              <h4>120+</h4>
              <span>Generated Campaigns</span>
            </div>
          </div>
        </div>

        <div className="socialTools">
          {tools.map((tool) => (
            <div className="socialToolCard" key={tool.title}>
              <div className="socialToolIcon">{tool.icon}</div>

              <div>
                <h3>{tool.title}</h3>
                <p>{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialStudio;