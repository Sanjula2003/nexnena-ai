import { Lock, Sparkles } from "lucide-react";

function UpgradePage() {
  return (
    <section className="dashPage">
      <div className="dashPanel">
        <div className="sectionTitle">
          <Lock size={22} />
          <h3>Feature Locked</h3>
        </div>

        <h1 style={{ marginTop: "20px" }}>Upgrade Required</h1>

        <p style={{ color: "#94a3b8", lineHeight: "1.8", marginTop: "14px" }}>
          This feature is not available in your current NexNena plan. Upgrade
          your teacher account to unlock AI tools, exam builder, social studio,
          reports, and advanced LMS features.
        </p>

        <button className="topicCreateBtn" style={{ marginTop: "24px" }}>
          <Sparkles size={18} />
          Contact Admin to Upgrade
        </button>
      </div>
    </section>
  );
}

export default UpgradePage;