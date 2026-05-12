import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Activity,
} from "lucide-react";

const performanceData = [
  { month: "Jan", score: 52 },
  { month: "Feb", score: 58 },
  { month: "Mar", score: 63 },
  { month: "Apr", score: 71 },
  { month: "May", score: 78 },
  { month: "Jun", score: 86 },
];

const subjectData = [
  { subject: "Physics", value: 82 },
  { subject: "Chemistry", value: 68 },
  { subject: "Biology", value: 91 },
  { subject: "Combined Maths", value: 73 },
];

const engagementData = [
  { name: "Highly Active", value: 42 },
  { name: "Moderate", value: 35 },
  { name: "Low", value: 23 },
];

const COLORS = ["#3B82F6", "#06B6D4", "#7C3AED"];

function AnalyticsPage() {
  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>ADVANCED ANALYTICS</span>

          <h1>Educational Intelligence Center</h1>

          <p>
            AI-powered insights, predictive learning analytics, and performance
            intelligence for modern education systems.
          </p>
        </div>

        <button>AI Insights Active</button>
      </div>

      <div className="analyticsTopCards">
        <div className="analyticsMiniCard">
          <TrendingUp size={20} />
          <div>
            <h3>+18.2%</h3>
            <p>Performance Growth</p>
          </div>
        </div>

        <div className="analyticsMiniCard">
          <Activity size={20} />
          <div>
            <h3>86%</h3>
            <p>Engagement Score</p>
          </div>
        </div>

        <div className="analyticsMiniCard">
          <Brain size={20} />
          <div>
            <h3>91%</h3>
            <p>AI Accuracy</p>
          </div>
        </div>

        <div className="analyticsMiniCard">
          <AlertTriangle size={20} />
          <div>
            <h3>12</h3>
            <p>Risk Alerts</p>
          </div>
        </div>
      </div>

      <div className="analyticsDashboardGrid">
        <div className="analyticsDashCard large">
          <div className="analyticsCardTop">
            <div>
              <h3>Performance Prediction</h3>
              <p>AI-tracked learning progression trends</p>
            </div>

            <span className="analyticsTag">Predictive Model</span>
          </div>

          <ResponsiveContainer width="100%" height={340}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="month"
                stroke="#94A3B8"
                tickLine={false}
                axisLine={false}
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#growthFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="analyticsDashCard">
          <div className="analyticsCardTop">
            <div>
              <h3>Engagement Distribution</h3>
              <p>Student activity segmentation</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={engagementData}
                innerRadius={70}
                outerRadius={100}
                dataKey="value"
                paddingAngle={5}
              >
                {engagementData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="engagementLegend">
            <div><span className="blueDot"></span> Highly Active</div>
            <div><span className="cyanDot"></span> Moderate</div>
            <div><span className="purpleDot"></span> Low Activity</div>
          </div>
        </div>

        <div className="analyticsDashCard">
          <div className="analyticsCardTop">
            <div>
              <h3>Subject Intelligence</h3>
              <p>Average performance by subject</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={subjectData}>
              <XAxis
                dataKey="subject"
                stroke="#94A3B8"
                tickLine={false}
                axisLine={false}
              />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#06B6D4"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="analyticsDashCard">
          <h3>AI Intelligence Insights</h3>

          <div className="analyticsInsight">
            <Brain size={18} />

            <div>
              <h4>Exam readiness improving</h4>
              <p>
                AI predicts a 14% increase in Biology exam readiness this month.
              </p>
            </div>
          </div>

          <div className="analyticsInsight">
            <AlertTriangle size={18} />

            <div>
              <h4>Combined Maths risk detected</h4>
              <p>
                Students with low attendance show declining engagement patterns.
              </p>
            </div>
          </div>

          <div className="analyticsInsight">
            <TrendingUp size={18} />

            <div>
              <h4>Optimal revision timing identified</h4>
              <p>
                Evening revision sessions generate 18% higher retention rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsPage;