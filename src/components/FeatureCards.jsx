import {
  Brain,
  GraduationCap,
  LayoutDashboard,
  PenTool,
  CreditCard,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: <Brain size={28} />,
    title: "AI Content Engine",
    desc: "Generate MCQs, notes, revision summaries, quizzes, and educational content instantly.",
  },
  {
    icon: <GraduationCap size={28} />,
    title: "Student Intelligence",
    desc: "Track weak chapters, engagement, attendance risks, and learning performance.",
  },
  {
    icon: <LayoutDashboard size={28} />,
    title: "Smart LMS",
    desc: "Modern lesson management, assignments, quizzes, analytics, and student progress.",
  },
  {
    icon: <PenTool size={28} />,
    title: "Social Studio AI",
    desc: "Generate posters, captions, hashtags, thumbnails, and educational content ideas.",
  },
  {
    icon: <Sparkles size={28} />,
    title: "AI Study Planner",
    desc: "Create personalized revision schedules and smart study roadmaps for students.",
  },
  {
    icon: <CreditCard size={28} />,
    title: "Payments & Automation",
    desc: "Track payments, reminders, attendance, and automate educational workflows.",
  },
];

function FeatureCards() {
  return (
    <section className="featuresSection">
      <div className="sectionHeader">
        <span>POWERFUL AI FEATURES</span>

        <h2>Everything You Need. Powered by AI.</h2>

        <p>
          NexNena Teacher OS combines Artificial Intelligence, analytics,
          automation, and modern educational systems into one premium platform.
        </p>
      </div>

      <div className="featureGrid">
        {features.map((feature, index) => (
          <div className="featureCard" key={index}>
            <div className="featureIcon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.desc}</p>

            <button>Explore →</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureCards;