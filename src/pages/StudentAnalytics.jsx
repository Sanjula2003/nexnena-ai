import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  AlertTriangle,
  Brain,
  TrendingUp,
  Users,
} from "lucide-react";

const performanceData = [
  { month: "Jan", score: 52 },
  { month: "Feb", score: 58 },
  { month: "Mar", score: 66 },
  { month: "Apr", score: 71 },
  { month: "May", score: 79 },
  { month: "Jun", score: 86 },
];

const engagementData = [
  { name: "Highly Active", value: 42 },
  { name: "Moderate", value: 35 },
  { name: "Low", value: 23 },
];

const COLORS = ["#3B82F6", "#06B6D4", "#7C3AED"];

function StudentAnalytics() {
  return (
    <section className="analyticsSection">
      <div className="sectionHeader">
        <span>STUDENT INTELLIGENCE</span>

        <h2>AI-Powered Learning Analytics.</h2>

        <p>
          NexNena AI transforms educational data into actionable intelligence
          through predictive insights, engagement tracking, and performance
          analytics.
        </p>
      </div>

      <div className="analyticsGrid">
        <div className="analyticsCard largeAnalytics">
          <div className="analyticsTop">
            <div>
              <h3>Performance Growth</h3>
              <p>AI-tracked learning progression</p>
            </div>

            <div className="analyticsBadge">
              <TrendingUp size={16} />
              +18.2%
            </div>
          </div>

          <div className="chartWrapper">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
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
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analyticsCard">
          <div className="analyticsTop">
            <div>
              <h3>Engagement Score</h3>
              <p>Student activity distribution</p>
            </div>
          </div>

          <div className="pieWrapper">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={engagementData}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="engagementLegend">
            <div><span className="blueDot"></span> Highly Active</div>
            <div><span className="cyanDot"></span> Moderate</div>
            <div><span className="purpleDot"></span> Low Activity</div>
          </div>
        </div>

        <div className="analyticsCard">
          <h3>AI Intelligence Insights</h3>

          <div className="insightBox">
            <AlertTriangle size={18} />

            <div>
              <h4>Revision Risk Detected</h4>
              <p>
                12 students are showing low revision consistency this week.
              </p>
            </div>
          </div>

          <div className="insightBox">
            <Brain size={18} />

            <div>
              <h4>AI Recommendation</h4>
              <p>
                Schedule an additional Biology revision session before exams.
              </p>
            </div>
          </div>

          <div className="insightBox">
            <Users size={18} />

            <div>
              <h4>Attendance Intelligence</h4>
              <p>
                Combined Maths attendance dropped by 8% compared to last month.
              </p>
            </div>
          </div>
        </div>

        <div className="analyticsCard">
          <h3>Weak Chapter Detection</h3>

          <div className="weaknessList">
            <div>
              <span>Organic Chemistry</span>
              <strong>78%</strong>
            </div>

            <div>
              <span>Vectors</span>
              <strong>65%</strong>
            </div>

            <div>
              <span>Mechanics</span>
              <strong>58%</strong>
            </div>

            <div>
              <span>Electric Fields</span>
              <strong>82%</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudentAnalytics;