import { useState } from "react";
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";
import { marked } from "marked";

import {
  FileText,
  Sparkles,
  Wand2,
  Download,
  Loader2,
} from "lucide-react";

import { generateEducationalContent } from "../puterAI";

function ExamBuilder() {
  const [subject, setSubject] = useState("Biology");
  const [topic, setTopic] = useState("Cell Division");
  const [difficulty, setDifficulty] = useState("Advanced");
  const [questionCount, setQuestionCount] = useState(25);

  const [loading, setLoading] = useState(false);
  const [examOutput, setExamOutput] = useState("");

  async function generateExamPaper() {
    setLoading(true);
    setExamOutput("");

    try {
      const prompt = `
Generate a professional Advanced Level examination paper.

Subject: ${subject}
Topic: ${topic}
Difficulty: ${difficulty}
Number of Questions: ${questionCount}

Requirements:
- Generate ONLY multiple choice questions
- Each question must follow EXACTLY this structure

Question Format Example:

1. What is photosynthesis?

(A) Option one
(B) Option two
(C) Option three
(D) Option four

Correct Answer: B

Explanation:
Short explanation here.

Rules:
- Never place answers inside question sentence
- Never mix options into paragraph text
- Keep spacing clean
- Each question separated clearly
- Professional examination formatting
- No markdown tables
- No random symbols
- Clean printable layout
- Include final answer sheet at end
`;

      const output = await generateEducationalContent(prompt);

      setExamOutput(output);
    } catch (error) {
      console.error(error);

      setExamOutput(`
# NexNena AI Exam Paper

## Subject
${subject}

## Topic
${topic}

## Difficulty
${difficulty}

---

### 1. Which phase aligns chromosomes at the equator?

A. Prophase  
B. Metaphase  
C. Anaphase  
D. Telophase  

✅ Answer: B

---

### 2. Which process produces gametes?

A. Mitosis  
B. Binary fission  
C. Meiosis  
D. Budding  

✅ Answer: C

---

# Answer Sheet

1. B  
2. C
`);
    } finally {
      setLoading(false);
    }
  }

  function exportPDF() {
    if (!examOutput) {
      alert("No exam paper available.");
      return;
    }

    const htmlContent = marked(examOutput);

    const element = document.createElement("div");

    element.innerHTML = `
      <div style="
        font-family: Arial;
        padding: 42px;
        background: white;
        color: #111827;
        line-height: 1.7;
      ">
        <div style="
          border-bottom: 4px solid #06b6d4;
          padding-bottom: 18px;
          margin-bottom: 30px;
        ">
          <h1 style="
            margin: 0;
            font-size: 30px;
            color: #0f172a;
          ">
            NexNena AI
          </h1>

          <p style="
            margin-top: 6px;
            color: #475569;
          ">
            AI-Powered Examination Paper
          </p>
        </div>

        <div class="pdfContent">
          ${htmlContent}
        </div>
      </div>
    `;

    const options = {
      margin: 0.45,
      filename: `exam-paper-${subject}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf().set(options).from(element).save();
  }

  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>AI EXAM BUILDER</span>
          <h1>NexNena AI Paper Generator</h1>

          <p>
            Generate professional AI-powered examination papers instantly.
          </p>
        </div>

        <button>Exam AI Online</button>
      </div>

      <div className="examBuilderGrid">
        <div className="examBuilderPanel">
          <div className="workspaceTop">
            <div>
              <h3>Exam Configuration</h3>
              <p>Create AI-powered exam papers.</p>
            </div>

            <div className="workspaceBadge">
              <Sparkles size={16} />
              AI Builder
            </div>
          </div>

          <div className="examFormGrid">
            <div>
              <label>Subject</label>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option>Biology</option>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Combined Maths</option>
                <option>ICT</option>
              </select>
            </div>

            <div>
              <label>Difficulty</label>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option>Easy</option>
                <option>Moderate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div>
              <label>Question Count</label>

              <input
                type="number"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
              />
            </div>
          </div>

          <div className="examTopicBox">
            <label>Topic</label>

            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter examination topic..."
            />
          </div>

          <div className="generateActions">
            <button className="generateBtn" onClick={generateExamPaper}>
              {loading ? (
                <Loader2 className="spinIcon" size={18} />
              ) : (
                <Wand2 size={18} />
              )}

              {loading ? "Generating..." : "Generate Exam Paper"}
            </button>

            <button
              className="secondaryGenerateBtn"
              onClick={exportPDF}
            >
              <Download size={18} />
              Export PDF
            </button>
          </div>
        </div>

        <div className="examOutputPanel">
          {loading ? (
            <div className="processingBox">
              <FileText size={30} />

              <h3>Generating Exam Paper...</h3>

              <p>
                AI is preparing structured educational assessment content.
              </p>

              <div className="loadingLine"></div>
            </div>
          ) : examOutput ? (
            <div className="aiResultBox">
              <h3>Generated Exam Paper</h3>

              <div className="aiMarkdownOutput">
                <div className="examFormattedOutput">
                  <ReactMarkdown>{examOutput}</ReactMarkdown>
                </div>
              </div>
            </div>
          ) : (
            <div className="processingBox">
              <FileText size={30} />

              <h3>Ready to build paper.</h3>

              <p>
                Configure the exam paper and generate AI-powered assessments.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ExamBuilder;