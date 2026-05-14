import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";
import { marked } from "marked";

import {
  Brain,
  Sparkles,
  Wand2,
  GraduationCap,
  PenTool,
  Loader2,
} from "lucide-react";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { auth, db } from "../firebase";
import { generateEducationalContent } from "../puterAI";

const templates = [
  "Generate 25 Biology MCQs with answers and explanations for Cell Division",
  "Create Combined Maths revision summary for Vectors",
  "Write educational Instagram caption for Physics revision class",
  "Generate Physics paper discussion notes for Mechanics",
  "Create AI study planner for 30 days before A/L exam",
];

const generationTypes = [
  "Revision Notes",
  "MCQ Generator",
  "Essay Questions",
  "Study Planner",
  "Social Caption",
  "Class Announcement",
];

function AIToolsPage() {
  const [prompt, setPrompt] = useState(
    "Cell Division for Advanced Level Biology"
  );

  const [selectedType, setSelectedType] = useState("Revision Notes");

  const [generating, setGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    const q = query(
      collection(db, "ai_generations"),
      where("teacherId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const historyData = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));

      setHistory(historyData);
    });

    return () => unsubscribe();
  }, []);

  function buildStructuredPrompt() {
    switch (selectedType) {
      case "Revision Notes":
        return `
Create detailed Advanced Level revision notes about:
${prompt}

Requirements:
- structured explanations
- key concepts
- exam-focused notes
- bullet points
- student-friendly style
- include important theories and summaries
`;

      case "MCQ Generator":
        return `
Generate 20 Advanced Level MCQs about:
${prompt}

Requirements:
- include 4 options
- clearly indicate answers
- include short explanations
- exam-focused difficulty
`;

      case "Essay Questions":
        return `
Generate Advanced Level essay questions and model answers about:
${prompt}

Requirements:
- structured answers
- exam-focused
- marking-friendly format
`;

      case "Study Planner":
        return `
Create a 30-day study planner for:
${prompt}

Requirements:
- daily study tasks
- revision strategy
- exam preparation tips
- realistic student schedule
`;

      case "Social Caption":
        return `
Write engaging educational social media captions for:
${prompt}

Requirements:
- modern style
- student engagement
- hashtags
- motivational tone
`;

      case "Class Announcement":
        return `
Generate a professional class announcement about:
${prompt}

Requirements:
- teacher-friendly tone
- short and clear
- suitable for WhatsApp or LMS
`;

      default:
        return prompt;
    }
  }

  async function handleGenerate() {
  if (!prompt.trim()) {
    alert("Please enter a topic first.");
    return;
  }

  setGenerating(true);
  setAiOutput("");

  try {
    const structuredPrompt = buildStructuredPrompt();

    const output = await generateEducationalContent(
      structuredPrompt
    );

    setAiOutput(output);

    if (auth.currentUser) {
      await addDoc(collection(db, "ai_generations"), {
        teacherId: auth.currentUser.uid,
        type: selectedType,
        prompt,
        output,
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("AI generation error:", error);

    setAiOutput(`
# AI Generation Failed

## Error Details
${error.message || "Unknown AI error occurred."}

## Possible Reasons
- Puter AI service unavailable
- Invalid AI model
- Internet connection issue
- API limit reached
- Puter.js not loaded properly

## Recommended Fix
- Refresh the page
- Check internet connection
- Verify Puter.js script
- Try again in a few seconds
`);
  } finally {
    setGenerating(false);
  }
}

function handleExportPDF() {
  if (!aiOutput) {
    alert("No AI output available.");
    return;
  }

  const htmlContent = marked(aiOutput);

  const element = document.createElement("div");

  element.innerHTML = `
    <div style="
      font-family: Arial, sans-serif;
      padding: 42px;
      color: #111827;
      background: #ffffff;
      line-height: 1.7;
    ">
      <div style="
        border-bottom: 4px solid #06b6d4;
        padding-bottom: 18px;
        margin-bottom: 34px;
      ">
        <h1 style="
          margin: 0;
          color: #0f172a;
          font-size: 30px;
          font-weight: 800;
        ">
          NexNena AI
        </h1>

        <p style="
          margin: 6px 0 0;
          color: #475569;
          font-size: 14px;
        ">
          The Intelligent Operating System for Modern Education
        </p>

        <p style="
          margin: 12px 0 0;
          color: #2563eb;
          font-size: 13px;
          font-weight: 700;
        ">
          AI Workflow: ${selectedType}
        </p>
      </div>

      <h2 style="
        color: #0f172a;
        font-size: 24px;
        margin-bottom: 22px;
      ">
        ${selectedType}
      </h2>

      <div class="pdfContent">
        ${htmlContent}
      </div>

      <div style="
        margin-top: 40px;
        padding-top: 16px;
        border-top: 1px solid #e5e7eb;
        color: #64748b;
        font-size: 12px;
      ">
        Generated by NexNena AI • ${new Date().toLocaleDateString()}
      </div>
    </div>
  `;

  const style = document.createElement("style");

  style.innerHTML = `
    .pdfContent h1 {
      font-size: 26px;
      color: #0f172a;
      margin: 24px 0 12px;
    }

    .pdfContent h2 {
      font-size: 21px;
      color: #1e40af;
      margin: 22px 0 10px;
    }

    .pdfContent h3 {
      font-size: 17px;
      color: #0f172a;
      margin: 18px 0 8px;
    }

    .pdfContent p {
      font-size: 14px;
      color: #1f2937;
      margin: 8px 0;
    }

    .pdfContent ul,
    .pdfContent ol {
      margin: 10px 0 14px 24px;
      padding: 0;
    }

    .pdfContent li {
      font-size: 14px;
      color: #1f2937;
      margin-bottom: 6px;
    }

    .pdfContent strong {
      color: #0f172a;
      font-weight: 800;
    }

    .pdfContent hr {
      border: none;
      border-top: 1px solid #e5e7eb;
      margin: 22px 0;
    }
  `;

  element.prepend(style);

  const options = {
    margin: 0.45,
    filename: `nexnena-ai-${selectedType
      .toLowerCase()
      .replace(/\s/g, "-")}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
    },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: {
      mode: ["css", "legacy"],
    },
  };

  html2pdf().set(options).from(element).save();
}

  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>AI WORKSPACE</span>
          <h1>NexNena AI Command Center</h1>
          <p>
            Generate structured educational content using intelligent AI
            workflows.
          </p>
        </div>

        <button>AI Engine Online</button>
      </div>

      <div className="aiWorkspaceGrid">
        <div className="aiWorkspaceMain">
          <div className="workspaceTop">
            <div>
              <h3>AI Prompt Workspace</h3>
              <p>Generate educational content instantly.</p>
            </div>

            <div className="workspaceBadge">
              <Sparkles size={16} />
              Smart AI
            </div>
          </div>

          <div className="generationTypeGrid">
            {generationTypes.map((type) => (
              <button
                key={type}
                className={`typeCard ${
                  selectedType === type ? "activeTypeCard" : ""
                }`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <textarea
            className="realPromptInput"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter educational topic..."
          />

          <div className="generateActions">
            <button className="generateBtn" onClick={handleGenerate}>
              {generating ? (
                <Loader2 className="spinIcon" size={18} />
              ) : (
                <Wand2 size={18} />
              )}
              {generating ? "Generating..." : `Generate ${selectedType}`}
            </button>

            <button
              className="secondaryGenerateBtn"
              onClick={handleExportPDF}
            >
              Export PDF
            </button>

            <button
              className="secondaryGenerateBtn"
              onClick={() => {
                setPrompt("");
                setAiOutput("");
              }}
            >
              Clear
            </button>
          </div>

          {generating ? (
            <div className="processingBox">
              <Brain size={30} />
              <h3>AI is generating your content...</h3>
              <p>
                Analyzing educational workflows and generating optimized output.
              </p>
              <div className="loadingLine"></div>
            </div>
          ) : aiOutput ? (
            <div className="aiResultBox">
              <h3>Generated AI Output</h3>

              <div className="aiMarkdownOutput">
                <ReactMarkdown>{aiOutput}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="processingBox">
              <Brain size={30} />
              <h3>Ready to generate.</h3>
              <p>
                Select a workflow type and enter a topic to generate structured
                educational content.
              </p>
            </div>
          )}

          <div className="aiHistoryPanel">
            <div className="historyTop">
              <h3>Recent AI Generations</h3>
              <span>{history.length} Saved</span>
            </div>

            <div className="historyList">
              {history.length === 0 ? (
                <p className="historyEmpty">No AI generations yet.</p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="historyCard"
                    onClick={() => {
                      setPrompt(item.prompt);
                      setAiOutput(item.output);
                      setSelectedType(item.type || "Revision Notes");
                    }}
                  >
                    <div className="historyTypeBadge">
                      {item.type || "AI"}
                    </div>

                    <h4>
                      {item.prompt?.length > 70
                        ? `${item.prompt.slice(0, 70)}...`
                        : item.prompt}
                    </h4>

                    <p>
                      {item.output?.length > 120
                        ? `${item.output.slice(0, 120)}...`
                        : item.output}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="aiSidebarPanel">
          <h3>Smart Templates</h3>

          <div className="templateList">
            {templates.map((template) => (
              <button key={template} onClick={() => setPrompt(template)}>
                <Brain size={16} />
                {template}
              </button>
            ))}
          </div>

          <div className="aiAssistantPanel">
            <div className="assistantTop">
              <GraduationCap size={20} />
              <h4>AI Teaching Assistant</h4>
            </div>

            <p>
              Generate revision notes, MCQs, study plans, captions, and
              educational resources using structured AI workflows.
            </p>

            <div className="assistantStats">
              <div>
                <h5>{history.length}</h5>
                <span>Saved Outputs</span>
              </div>

              <div>
                <h5>AI</h5>
                <span>Enhanced</span>
              </div>
            </div>

            <button className="assistantBtn" onClick={handleGenerate}>
              <PenTool size={18} />
              Generate Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIToolsPage;