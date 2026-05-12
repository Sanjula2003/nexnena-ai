import {
  Brain,
  CreditCard,
  FileText,
  UserPlus,
} from "lucide-react";

const activities = [
  {
    icon: <Brain size={16} />,
    title: "AI generated Biology revision summary",
    time: "2 mins ago",
  },

  {
    icon: <UserPlus size={16} />,
    title: "New student joined Physics batch",
    time: "12 mins ago",
  },

  {
    icon: <CreditCard size={16} />,
    title: "Payment received from 8 students",
    time: "28 mins ago",
  },

  {
    icon: <FileText size={16} />,
    title: "AI created Chemistry MCQ package",
    time: "1 hour ago",
  },
];

function ActivityFeed() {
  return (
    <div className="activityFeed">
      <div className="activityTop">
        <h3>Live Activity</h3>

        <span>AI Monitoring</span>
      </div>

      <div className="activityList">
        {activities.map((activity) => (
          <div className="activityItem" key={activity.title}>
            <div className="activityIcon">
              {activity.icon}
            </div>

            <div>
              <h4>{activity.title}</h4>
              <p>{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;