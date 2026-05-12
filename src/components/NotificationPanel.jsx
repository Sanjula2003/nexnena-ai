import {
  AlertTriangle,
  Brain,
  CreditCard,
  Users,
} from "lucide-react";

const notifications = [
  {
    icon: <Brain size={16} />,
    title: "AI generated Chemistry revision summary",
    time: "Just now",
  },

  {
    icon: <Users size={16} />,
    title: "3 new students registered",
    time: "12 mins ago",
  },

  {
    icon: <CreditCard size={16} />,
    title: "Monthly payment received",
    time: "28 mins ago",
  },

  {
    icon: <AlertTriangle size={16} />,
    title: "Low engagement alert detected",
    time: "1 hour ago",
  },
];

function NotificationPanel() {
  return (
    <div className="notificationPanel">
      <div className="notificationHeader">
        <h3>Notifications</h3>

        <span>4 New</span>
      </div>

      <div className="notificationList">
        {notifications.map((item) => (
          <div className="notificationItem" key={item.title}>
            <div className="notificationIcon">
              {item.icon}
            </div>

            <div>
              <h4>{item.title}</h4>
              <p>{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationPanel;