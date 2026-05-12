import {
  CalendarDays,
  Hash,
  Image,
  MessageSquareText,
  PlaySquare,
  TrendingUp,
} from "lucide-react";

const contentIdeas = [
  "Top 5 Physics exam mistakes students make",
  "Fast revision tips for Organic Chemistry",
  "Combined Maths last-minute strategy reel",
  "AI-powered learning motivation campaign",
];

const campaigns = [
  {
    title: "2026 Physics Revision",
    engagement: "+18%",
    reach: "42K",
  },
  {
    title: "Biology Crash Course",
    engagement: "+24%",
    reach: "61K",
  },
  {
    title: "Chemistry Paper Class",
    engagement: "+15%",
    reach: "37K",
  },
];

function SocialStudioPage() {
  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>SOCIAL STUDIO AI</span>

          <h1>Educational Growth Workspace</h1>

          <p>
            AI-powered social media systems for teachers, institutes, and
            educational brands to scale engagement and visibility.
          </p>
        </div>

        <button>Growth Engine Active</button>
      </div>

      <div className="socialWorkspaceGrid">
        <div className="socialWorkspaceMain">
          <div className="socialWorkspaceTop">
            <div>
              <h3>AI Campaign Generator</h3>
              <p>Create educational marketing content instantly.</p>
            </div>

            <div className="workspaceBadge">
              <TrendingUp size={16} />
              AI Optimized
            </div>
          </div>

          <div className="campaignPreviewCard">
            <div className="campaignGlow"></div>

            <span>2026 Advanced Level Campaign</span>

            <h2>
              Build Smarter Learning
              <strong> with AI.</strong>
            </h2>

            <p>
              Join Sri Lanka’s next generation AI-powered educational ecosystem
              designed for teachers and students.
            </p>

            <div className="campaignButtons">
              <button>Generate Poster</button>
              <button className="secondaryCampaignBtn">
                Create Caption
              </button>
            </div>
          </div>

          <div className="campaignMetrics">
            {campaigns.map((campaign) => (
              <div key={campaign.title}>
                <h4>{campaign.reach}</h4>
                <span>{campaign.title}</span>

                <p>{campaign.engagement} engagement growth</p>
              </div>
            ))}
          </div>
        </div>

        <div className="socialSidebarPanel">
          <h3>Content Operations</h3>

          <div className="socialToolList">
            <button>
              <Image size={18} />
              AI Poster Generator
            </button>

            <button>
              <MessageSquareText size={18} />
              Caption Generator
            </button>

            <button>
              <Hash size={18} />
              Hashtag Optimizer
            </button>

            <button>
              <PlaySquare size={18} />
              Reel & TikTok Ideas
            </button>

            <button>
              <CalendarDays size={18} />
              Content Planner
            </button>
          </div>

          <div className="ideaPanel">
            <h4>Trending Educational Ideas</h4>

            <div className="ideaList">
              {contentIdeas.map((idea) => (
                <div key={idea}>
                  <TrendingUp size={16} />
                  {idea}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialStudioPage;