import { useRef, useState } from "react";
import html2canvas from "html2canvas";

import {
  CalendarDays,
  Download,
  Hash,
  Image,
  MessageSquareText,
  PlaySquare,
  Sparkles,
  TrendingUp,
  Wand2,
} from "lucide-react";

function SocialStudioPage() {
  const posterRef = useRef(null);

  const [posterData, setPosterData] = useState({
    title: "2026 A/L Physics Revision",
    topic: "Master Wave Mechanics",
    teacher: "Sanjula Bandara",
    date: "Sunday • 7.00 PM",
    location: "Online / Physical Class",
    cta: "Register Now",
  });

  const [caption, setCaption] = useState(
    "Level up your A/L Physics revision with a focused Wave Mechanics session. Join the next generation of smart learning with NexNena AI."
  );

  function handleChange(e) {
    setPosterData({
      ...posterData,
      [e.target.name]: e.target.value,
    });
  }

  function generateCaption() {
    setCaption(
      `🚀 ${posterData.title}\n\n${posterData.topic} is one of the most important areas for exam success. Join ${posterData.teacher}'s focused revision session and strengthen your confidence before the exam.\n\n📅 ${posterData.date}\n📍 ${posterData.location}\n\n${posterData.cta}\n\n#NexNenaAI #ALEducation #SriLankaEducation #RevisionClass #AIForEducation`
    );
  }

  async function downloadPoster() {
    if (!posterRef.current) return;

    const canvas = await html2canvas(posterRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
    });

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "nexnena-ai-poster.png";
    link.click();
  }

  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>SOCIAL STUDIO AI</span>
          <h1>AI Poster & Campaign Studio</h1>
          <p>
            Create modern educational posters, captions, and campaign content
            for teachers and institutes.
          </p>
        </div>

        <button>Poster Engine Active</button>
      </div>

      <div className="posterStudioGrid">
        <div className="posterControlsPanel">
          <div className="workspaceTop">
            <div>
              <h3>Poster Details</h3>
              <p>Customize your educational campaign.</p>
            </div>

            <div className="workspaceBadge">
              <Sparkles size={16} />
              AI Studio
            </div>
          </div>

          <div className="posterForm">
            <input
              name="title"
              value={posterData.title}
              onChange={handleChange}
              placeholder="Class title"
            />

            <input
              name="topic"
              value={posterData.topic}
              onChange={handleChange}
              placeholder="Topic"
            />

            <input
              name="teacher"
              value={posterData.teacher}
              onChange={handleChange}
              placeholder="Teacher name"
            />

            <input
              name="date"
              value={posterData.date}
              onChange={handleChange}
              placeholder="Date and time"
            />

            <input
              name="location"
              value={posterData.location}
              onChange={handleChange}
              placeholder="Location"
            />

            <input
              name="cta"
              value={posterData.cta}
              onChange={handleChange}
              placeholder="Call to action"
            />
          </div>

          <div className="generateActions">
            <button className="generateBtn" onClick={generateCaption}>
              <Wand2 size={18} />
              Generate Caption
            </button>

            <button className="secondaryGenerateBtn" onClick={downloadPoster}>
              <Download size={18} />
              Download Poster
            </button>
          </div>

          <div className="captionBox">
            <div className="captionTop">
              <MessageSquareText size={18} />
              <h3>Generated Caption</h3>
            </div>

            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
        </div>

        <div className="posterPreviewPanel">
          <div className="posterCanvas" ref={posterRef}>
            <div className="posterGlowOne"></div>
            <div className="posterGlowTwo"></div>

            <div className="posterBrandRow">
              <div className="posterMiniLogo">
                <Sparkles size={22} />
              </div>
              <div>
                <h4>NexNena AI</h4>
                <p>AI-Powered Education</p>
              </div>
            </div>

            <div className="posterMainContent">
              <span className="posterBadge">ADVANCED LEVEL 2026</span>

              <h2>{posterData.title}</h2>

              <h1>{posterData.topic}</h1>

              <p>
                Smart revision experience powered by modern educational
                intelligence.
              </p>
            </div>

            <div className="posterInfoGrid">
              <div>
                <CalendarDays size={18} />
                <span>{posterData.date}</span>
              </div>

              <div>
                <Image size={18} />
                <span>{posterData.location}</span>
              </div>

              <div>
                <Hash size={18} />
                <span>{posterData.teacher}</span>
              </div>
            </div>

            <div className="posterFooterCTA">
              <strong>{posterData.cta}</strong>
              <span>Powered by NexNena AI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="socialWorkspaceGrid socialStudioBottom">
        <div className="socialSidebarPanel">
          <h3>Content Tools</h3>

          <div className="socialToolList">
            <button>
              <Image size={18} />
              Poster Generator
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
              Reel Ideas
            </button>
          </div>
        </div>

        <div className="socialSidebarPanel">
          <h3>Campaign Insights</h3>

          <div className="ideaList">
            <div>
              <TrendingUp size={16} />
              Physics revision posters perform best with exam-focused headlines.
            </div>

            <div>
              <TrendingUp size={16} />
              Captions with direct student benefits improve engagement.
            </div>

            <div>
              <TrendingUp size={16} />
              Sunday evening class campaigns usually need early reminders.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialStudioPage;