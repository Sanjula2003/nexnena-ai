import { Bell, Brain, CalendarCheck, PlayCircle } from "lucide-react";

function MobileShowcase() {
  return (
    <section className="mobileShowcaseSection">
      <div className="mobileShowcaseContent">
        <span>MOBILE-FIRST LEARNING</span>
        <h2>Built for teachers and students on the move.</h2>
        <p>
          NexNena AI is designed for Sri Lanka’s mobile-first education culture,
          giving teachers and students fast access to lessons, insights,
          reminders, and AI tools from any device.
        </p>

        <div className="mobileFeatureList">
          <div><Brain size={18} /> AI study guidance</div>
          <div><PlayCircle size={18} /> Smart lesson access</div>
          <div><CalendarCheck size={18} /> Revision planning</div>
          <div><Bell size={18} /> Class reminders</div>
        </div>
      </div>

      <div className="phoneMockup">
        <div className="phoneScreen">
          <div className="phoneTop"></div>

          <h3>Student Hub</h3>
          <p className="phoneSub">Today’s learning focus</p>

          <div className="phoneCard gradientPhone">
            <span>AI Recommendation</span>
            <h4>Revise Organic Chemistry</h4>
            <p>Priority level: High</p>
          </div>

          <div className="phoneMiniGrid">
            <div>
              <h4>86%</h4>
              <span>Progress</span>
            </div>
            <div>
              <h4>12</h4>
              <span>Lessons</span>
            </div>
          </div>

          <div className="phoneTask">
            <span></span>
            Physics Paper Class · 6.00 PM
          </div>

          <div className="phoneTask">
            <span></span>
            Complete Biology MCQ Set
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileShowcase;