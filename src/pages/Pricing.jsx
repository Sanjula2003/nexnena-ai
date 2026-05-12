import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "LKR 25K+",
    desc: "For new or growing individual teachers.",
    features: ["Landing page", "Basic LMS setup", "Student registration", "Class announcements"],
  },
  {
    name: "Professional",
    price: "LKR 75K+",
    desc: "For teachers who want a premium digital class system.",
    features: ["Teacher OS dashboard", "AI tools preview", "Student analytics", "Social Studio", "Payment tracking"],
    popular: true,
  },
  {
    name: "Institute",
    price: "Custom",
    desc: "For larger classes, institutes, and learning teams.",
    features: ["Full LMS ecosystem", "Admin panel", "Advanced analytics", "Custom branding", "Automation workflows"],
  },
];

function Pricing() {
  return (
    <section className="pricingSection">
      <div className="sectionHeader">
        <span>STARTUP PACKAGES</span>
        <h2>Simple packages for modern educators.</h2>
        <p>
          Start with a premium digital presence and scale toward AI-powered
          learning infrastructure.
        </p>
      </div>

      <div className="pricingGrid">
        {plans.map((plan) => (
          <div className={`pricingCard ${plan.popular ? "popularPlan" : ""}`} key={plan.name}>
            {plan.popular && <div className="popularBadge">Most Strategic</div>}

            <h3>{plan.name}</h3>
            <h2>{plan.price}</h2>
            <p>{plan.desc}</p>

            <div className="planFeatures">
              {plan.features.map((feature) => (
                <div key={feature}>
                  <CheckCircle size={18} />
                  {feature}
                </div>
              ))}
            </div>

            <button>{plan.popular ? "Request Demo" : "Get Started"}</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;