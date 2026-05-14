import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  BookOpen,
  Lock,
  PlayCircle,
  FileText,
  CheckCircle2,
  Trophy,
  PauseCircle,
  RotateCcw,
  RotateCw,
  Maximize,
} from "lucide-react";

import { auth, db } from "../firebase";

import YouTube from "react-youtube";

function StudentPortal() {
  const [accessRecords, setAccessRecords] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [lessonProgress, setLessonProgress] = useState([]);

  const [players, setPlayers] = useState({});
  const [playingLessonId, setPlayingLessonId] = useState(null);
  const [videoTimes, setVideoTimes] = useState({});
  const [videoDurations, setVideoDurations] = useState({});

  async function fetchStudentPortalData() {
    try {
      const currentEmail = auth.currentUser?.email?.toLowerCase().trim();

      if (!currentEmail) return;

      const accessSnapshot = await getDocs(collection(db, "student_access"));

      const matchedAccess = accessSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (item) =>
            item.email?.toLowerCase().trim() === currentEmail
        );

      setAccessRecords(matchedAccess);

      const allowedTeacherIds = [
        ...new Set(
          matchedAccess
            .map((item) => item.teacherId)
            .filter(Boolean)
        ),
      ];

      const purchasedTopicNames = matchedAccess.map((item) => item.topic);

      const topicsSnapshot = await getDocs(collection(db, "topics"));

      const topicsData = topicsSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((topic) => topic.status === "active")
        .filter((topic) => {
          if (allowedTeacherIds.length > 0) {
            return allowedTeacherIds.includes(topic.teacherId);
          }

          return purchasedTopicNames.includes(topic.title);
        });

      setTopics(topicsData);

      const progressSnapshot = await getDocs(collection(db, "lesson_progress"));

      const progressData = progressSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (item) =>
            item.studentEmail?.toLowerCase().trim() === currentEmail
        );

      setLessonProgress(progressData);
    } catch (error) {
      console.error("Failed to load student portal data:", error);
    }
  }

  useEffect(() => {
    fetchStudentPortalData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!playingLessonId) return;

      const player = players[playingLessonId];

      if (!player) return;

      try {
        setVideoTimes((prev) => ({
          ...prev,
          [playingLessonId]: player.getCurrentTime(),
        }));

        setVideoDurations((prev) => ({
          ...prev,
          [playingLessonId]: player.getDuration(),
        }));
      } catch (error) {
        console.error(error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playingLessonId, players]);

  function hasPaidAccess(topic) {
    return accessRecords.some(
      (access) =>
        access.topic === topic.title &&
        access.paymentStatus === "paid" &&
        (!topic.teacherId ||
          !access.teacherId ||
          access.teacherId === topic.teacherId)
    );
  }

  async function openTopic(topic) {
    if (!hasPaidAccess(topic)) return;

    setSelectedTopic(topic);
    setPlayingLessonId(null);

    try {
      const lessonsRef = collection(db, "topics", topic.id, "lessons");

      const q = query(lessonsRef, orderBy("order", "asc"));

      const lessonsSnapshot = await getDocs(q);

      const lessonsData = lessonsSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((lesson) => lesson.status === "active");

      setLessons(lessonsData);
    } catch (error) {
      console.error("Failed to load lessons:", error);
    }
  }

  function getYoutubeId(url) {
    if (!url) return null;

    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }

  function isLessonCompleted(lessonId) {
    return lessonProgress.some(
      (progress) =>
        progress.lessonId === lessonId &&
        progress.completed === true
    );
  }

  async function markLessonCompleted(lesson) {
    const alreadyCompleted = isLessonCompleted(lesson.id);

    if (alreadyCompleted) return;

    try {
      await addDoc(collection(db, "lesson_progress"), {
        studentEmail: auth.currentUser.email,
        teacherId: selectedTopic.teacherId || null,
        topicId: selectedTopic.id,
        topic: selectedTopic.title,
        lessonId: lesson.id,
        completed: true,
        watchedAt: serverTimestamp(),
      });

      fetchStudentPortalData();
    } catch (error) {
      console.error(error);
      alert("Failed to save lesson progress");
    }
  }

  function getTopicProgress() {
    if (lessons.length === 0) return 0;

    const completedLessons = lessons.filter((lesson) =>
      isLessonCompleted(lesson.id)
    ).length;

    return Math.round((completedLessons / lessons.length) * 100);
  }

  function handlePlayerReady(lessonId, event) {
    const player = event.target;

    setPlayers((prev) => ({
      ...prev,
      [lessonId]: player,
    }));

    setTimeout(() => {
      try {
        setVideoDurations((prev) => ({
          ...prev,
          [lessonId]: player.getDuration(),
        }));
      } catch (error) {
        console.error(error);
      }
    }, 800);
  }

  function stopOtherVideos(currentLessonId) {
    Object.entries(players).forEach(([lessonId, player]) => {
      if (lessonId !== currentLessonId && player?.pauseVideo) {
        player.pauseVideo();
      }
    });
  }

  function playLesson(lessonId) {
    const player = players[lessonId];

    if (!player) return;

    stopOtherVideos(lessonId);
    player.playVideo();
    setPlayingLessonId(lessonId);
  }

  function pauseLesson(lessonId) {
    const player = players[lessonId];

    if (!player) return;

    player.pauseVideo();
    setPlayingLessonId(null);
  }

  function forwardLesson(lessonId) {
    const player = players[lessonId];

    if (!player) return;

    const currentTime = player.getCurrentTime();
    player.seekTo(currentTime + 10, true);
  }

  function backwardLesson(lessonId) {
    const player = players[lessonId];

    if (!player) return;

    const currentTime = player.getCurrentTime();
    player.seekTo(Math.max(currentTime - 10, 0), true);
  }

  function seekLesson(lessonId, value) {
    const player = players[lessonId];

    if (!player) return;

    const seekTime = Number(value);

    player.seekTo(seekTime, true);

    setVideoTimes((prev) => ({
      ...prev,
      [lessonId]: seekTime,
    }));
  }

  function toggleFullscreen(lessonId) {
    const videoBox = document.getElementById(`video-box-${lessonId}`);

    if (!videoBox) return;

    if (!document.fullscreenElement) {
      videoBox.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  function formatVideoTime(seconds = 0) {
    const safeSeconds = Number.isFinite(seconds) ? seconds : 0;
    const mins = Math.floor(safeSeconds / 60);
    const secs = Math.floor(safeSeconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>STUDENT PORTAL</span>

          <h1>Welcome to NexNena Learning Portal</h1>

          <p>
            Continue your learning journey with protected video lessons,
            educational materials, and tracked progress.
          </p>
        </div>
      </div>

      <div className="studentStatsGrid">
        <div className="studentStatCard">
          <BookOpen size={28} />

          <div>
            <h3>
              {
                accessRecords.filter(
                  (a) => a.paymentStatus === "paid"
                ).length
              }
            </h3>

            <p>Purchased Subjects</p>
          </div>
        </div>

        <div className="studentStatCard">
          <PlayCircle size={28} />

          <div>
            <h3>{lessons.length}</h3>
            <p>Available Lessons</p>
          </div>
        </div>

        <div className="studentStatCard">
          <CheckCircle2 size={28} />

          <div>
            <h3>
              {
                lessonProgress.filter(
                  (lesson) => lesson.completed === true
                ).length
              }
            </h3>

            <p>Completed Lessons</p>
          </div>
        </div>

        <div className="studentStatCard">
          <Trophy size={28} />

          <div>
            <h3>{getTopicProgress()}%</h3>
            <p>Current Subject Progress</p>
          </div>
        </div>
      </div>

      <div className="dashPanel">
        <div className="sectionTitle">
          <BookOpen size={20} />
          <h3>Your Teacher's Subjects</h3>
        </div>

        <div className="topicGrid">
          {topics.map((topic) => {
            const access = hasPaidAccess(topic);

            return (
              <div
                key={topic.id}
                className={`topicCard ${!access ? "lockedTopic" : ""}`}
              >
                <div
                  className="topicBanner"
                  style={{
                    background: topic.imageUrl
                      ? `url(${topic.imageUrl}) center/cover`
                      : "#111827",
                  }}
                >
                  {!access && (
                    <div className="lockedOverlay">
                      <Lock size={42} />
                    </div>
                  )}
                </div>

                <div className="topicContent">
                  <h3>{topic.title}</h3>

                  <p>{topic.description}</p>

                  {access ? (
                    <button
                      type="button"
                      className="topicLessonBtn"
                      onClick={() => openTopic(topic)}
                    >
                      <PlayCircle size={18} />
                      Continue Learning
                    </button>
                  ) : (
                    <button type="button" className="lockedBtn">
                      <Lock size={18} />
                      Payment Required
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {topics.length === 0 && (
            <div className="emptyTopicState">
              No active subjects are available from your teacher yet.
            </div>
          )}
        </div>
      </div>

      {selectedTopic && (
        <div className="dashPanel lessonPanel">
          <div className="sectionTitle">
            <PlayCircle size={20} />

            <div style={{ width: "100%" }}>
              <h3>{selectedTopic.title}</h3>

              <div className="progressWrapper">
                <div
                  className="progressBar"
                  style={{
                    width: `${getTopicProgress()}%`,
                  }}
                />

                <span>{getTopicProgress()}% Completed</span>
              </div>
            </div>
          </div>

          <div className="lessonGrid">
            {lessons.map((lesson) => {
              const completed = isLessonCompleted(lesson.id);
              const youtubeId = getYoutubeId(lesson.youtubeUrl);

              return (
                <div
                  key={lesson.id}
                  className={`lessonCard ${
                    completed ? "completedLesson" : ""
                  }`}
                >
                  {youtubeId ? (
                    <div
                      id={`video-box-${lesson.id}`}
                      className="protectedVideoWrapper"
                    >
                      <YouTube
                        videoId={youtubeId}
                        opts={{
                          width: "100%",
                          height: "220",
                          playerVars: {
                            controls: 0,
                            disablekb: 1,
                            modestbranding: 1,
                            rel: 0,
                            fs: 0,
                            iv_load_policy: 3,
                            playsinline: 1,
                          },
                        }}
                        onReady={(event) =>
                          handlePlayerReady(lesson.id, event)
                        }
                        onEnd={() => setPlayingLessonId(null)}
                        onPause={() => setPlayingLessonId(null)}
                        onPlay={() => setPlayingLessonId(lesson.id)}
                      />

                      <div className="fullVideoBlocker" />

                      <div className="customPlayerControls">
                        <div className="videoTimelineRow">
                          <span>
                            {formatVideoTime(videoTimes[lesson.id] || 0)}
                          </span>

                          <input
                            type="range"
                            min="0"
                            max={videoDurations[lesson.id] || 0}
                            value={videoTimes[lesson.id] || 0}
                            onChange={(e) =>
                              seekLesson(lesson.id, e.target.value)
                            }
                          />

                          <span>
                            {formatVideoTime(videoDurations[lesson.id] || 0)}
                          </span>
                        </div>

                        <div className="videoButtonRow">
                          <button
                            type="button"
                            onClick={() => backwardLesson(lesson.id)}
                          >
                            <RotateCcw size={17} />
                            10s
                          </button>

                          {playingLessonId === lesson.id ? (
                            <button
                              type="button"
                              onClick={() => pauseLesson(lesson.id)}
                            >
                              <PauseCircle size={18} />
                              Pause
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => playLesson(lesson.id)}
                            >
                              <PlayCircle size={18} />
                              Play
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => forwardLesson(lesson.id)}
                          >
                            <RotateCw size={17} />
                            10s
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleFullscreen(lesson.id)}
                          >
                            <Maximize size={17} />
                            Full
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="invalidVideoBox">
                      Invalid Video
                    </div>
                  )}

                  <div className="lessonContent">
                    <div className="lessonTopRow">
                      <h3>{lesson.title}</h3>

                      {completed && (
                        <div className="completedBadge">
                          <CheckCircle2 size={16} />
                          Completed
                        </div>
                      )}
                    </div>

                    <p>{lesson.description}</p>

                    <div className="lessonButtonRow">
                      {!completed && (
                        <button
                          type="button"
                          className="completeLessonBtn"
                          onClick={() =>
                            markLessonCompleted(lesson)
                          }
                        >
                          <CheckCircle2 size={16} />
                          Mark Complete
                        </button>
                      )}

                      {lesson.materialUrl && (
                        <a
                          href={lesson.materialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="lessonMaterialBtn"
                        >
                          <FileText size={16} />
                          Open Materials
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {lessons.length === 0 && (
              <div className="emptyTopicState">
                No active lessons available for this subject.
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default StudentPortal;
