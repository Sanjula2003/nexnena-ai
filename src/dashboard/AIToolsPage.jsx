import { useState } from "react";
import {
  Brain,
  FileText,
  Sparkles,
  Wand2,
  GraduationCap,
  PenTool,
  Loader2,
} from "lucide-react";

const templates = [
  "Generate 25 Biology MCQs with explanations",
  "Create Combined Maths revision summary",
  "Write educational Instagram caption",
  "Generate Physics paper discussion notes",
  "Create AI study planner for 30 days",
];

const outputs = [
  {
    title: "Biology MCQ Set",
    desc: "25 Advanced Level MCQs generated with explanations and difficulty levels.",
  },
  {
    title: "Revision Summary",
    desc: "AI-generated summary for Organic Chemistry chapter revision.",
  },
  {
    title: "Social Caption",
    desc: "Educational promotional caption optimized for Facebook engagement.",
  },
];

function AIToolsPage() {
  const [generating, setGenerating] = useState(false);

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 1800);
  }

  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>AI WORKSPACE</span>
          <h1>NexNena AI Command Center</h1>
          <p>Generate educational content, automate workflows, and accelerate teaching operations using AI-powered systems.</p>
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
              GPT Powered
            </div>
          </div>

          <div className="promptInputBox">
            Generate a complete Advanced Level Biology revision package for Cell Division including MCQs, structured notes, and predicted exam questions.
          </div>

          <div className="generateActions">
            <button className="generateBtn" onClick={handleGenerate}>
              {generating ? <Loader2 className="spinIcon" size={18} /> : <Wand2 size={18} />}
              {generating ? "Generating..." : "Generate Content"}
            </button>
            <button className="secondaryGenerateBtn">Save Prompt</button>
          </div>

          {generating ? (
            <div className="processingBox">
              <div className="processingGlow"></div>
              <Brain size={30} />
              <h3>AI is generating your revision package...</h3>
              <p>Analyzing syllabus patterns, question structures, and student-friendly explanations.</p>
              <div className="loadingLine"></div>
            </div>
          ) : (
            <div className="generatedOutputs">
              {outputs.map((output) => (
                <div className="generatedOutputCard" key={output.title}>
                  <div className="outputIcon">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h4>{output.title}</h4>
                    <p>{output.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="aiSidebarPanel">
          <h3>Smart Templates</h3>

          <div className="templateList">
            {templates.map((template) => (
              <button key={template}>
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
            <p>AI can analyze student performance and suggest revision strategies automatically.</p>

            <div className="assistantStats">
              <div>
                <h5>248</h5>
                <span>Students</span>
              </div>
              <div>
                <h5>86%</h5>
                <span>Accuracy</span>
              </div>
            </div>

            <button className="assistantBtn">
              <PenTool size={18} />
              Open Assistant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIToolsPage;