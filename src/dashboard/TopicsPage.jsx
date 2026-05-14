import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";

import { auth, db } from "../firebase";

import {
  BookOpen,
  Plus,
  Eye,
  EyeOff,
  Image as ImageIcon,
  PlayCircle,
  FileText,
  Trash2,
  Pencil,
  ArrowUp,
  ArrowDown,
  X,
  Upload,
  Loader2,
} from "lucide-react";

import YouTube from "react-youtube";

const CLOUDINARY_UPLOAD_PRESET = "nexnena_unsigned";
const CLOUDINARY_CLOUD_NAME = "da83me7r9";

function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [lessons, setLessons] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [materialUrl, setMaterialUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingMaterial, setUploadingMaterial] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState(null);

  async function uploadToCloudinary(file, folderName) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", folderName);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Cloudinary upload failed");
    }

    const data = await response.json();

    return data.secure_url;
  }

  async function handleBannerUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file only");
      return;
    }

    try {
      setUploadingBanner(true);

      const uploadedUrl = await uploadToCloudinary(
        file,
        "nexnena/topic-banners"
      );

      setImageUrl(uploadedUrl);

      alert("Banner uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to upload banner");
    } finally {
      setUploadingBanner(false);
    }
  }

  async function handleMaterialUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploadingMaterial(true);

      const uploadedUrl = await uploadToCloudinary(
        file,
        "nexnena/lesson-materials"
      );

      setMaterialUrl(uploadedUrl);

      alert("Material uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to upload material");
    } finally {
      setUploadingMaterial(false);
    }
  }

  async function fetchTopics() {
    try {
      if (!auth.currentUser) return;

      const teacherId = auth.currentUser.uid;

      const topicsQuery = query(
        collection(db, "topics"),
        where("teacherId", "==", teacherId)
        );
      const querySnapshot = await getDocs(topicsQuery);

      const topicsData = querySnapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));

      setTopics(topicsData);

      if (selectedTopic) {
        const stillExists = topicsData.find((item) => item.id === selectedTopic.id);

        if (!stillExists) {
          setSelectedTopic(null);
          setLessons([]);
        }
      }
    } catch (error) {
      console.error(error);

      alert(
        "Failed to load topics. If Firebase asks for an index, create the suggested Firestore index."
      );
    }
  }

  useEffect(() => {
    fetchTopics();
  }, []);

  async function fetchLessons(topicId) {
    try {
      const lessonsRef = collection(db, "topics", topicId, "lessons");

      const lessonsQuery = query(lessonsRef, orderBy("order", "asc"));

      const querySnapshot = await getDocs(lessonsQuery);

      const lessonData = querySnapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));

      setLessons(lessonData);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreateTopic(e) {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Teacher login not found. Please login again.");
      return;
    }

    if (!title || !description) {
      alert("Please fill all topic fields");
      return;
    }

    try {
      setLoading(true);

      const teacherId = auth.currentUser.uid;

      await addDoc(collection(db, "topics"), {
        teacherId,
        title,
        description,
        imageUrl,
        status: "active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setTitle("");
      setDescription("");
      setImageUrl("");

      fetchTopics();

      alert("Topic created successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to create topic");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateLesson(e) {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Teacher login not found. Please login again.");
      return;
    }

    if (!selectedTopic) {
      alert("Please select a topic first");
      return;
    }

    if (!lessonTitle || !youtubeUrl) {
      alert("Please fill lesson title and YouTube URL");
      return;
    }

    try {
      const teacherId = auth.currentUser.uid;

      await addDoc(collection(db, "topics", selectedTopic.id, "lessons"), {
        teacherId,
        topicId: selectedTopic.id,
        title: lessonTitle,
        description: lessonDescription,
        youtubeUrl,
        materialUrl,
        order: lessons.length + 1,
        status: "active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      clearLessonForm();
      fetchLessons(selectedTopic.id);

      alert("Lesson added successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add lesson");
    }
  }

  async function toggleStatus(topicId, currentStatus) {
    try {
      const topicRef = doc(db, "topics", topicId);

      await updateDoc(topicRef, {
        status: currentStatus === "active" ? "inactive" : "active",
        updatedAt: serverTimestamp(),
      });

      fetchTopics();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteLesson(lessonId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lesson?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "topics", selectedTopic.id, "lessons", lessonId));

      fetchLessons(selectedTopic.id);
    } catch (error) {
      console.error(error);
      alert("Failed to delete lesson");
    }
  }

  async function moveLesson(currentIndex, direction) {
    const newLessons = [...lessons];
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= newLessons.length) return;

    [newLessons[currentIndex], newLessons[targetIndex]] = [
      newLessons[targetIndex],
      newLessons[currentIndex],
    ];

    try {
      for (let i = 0; i < newLessons.length; i++) {
        const lessonRef = doc(
          db,
          "topics",
          selectedTopic.id,
          "lessons",
          newLessons[i].id
        );

        await updateDoc(lessonRef, {
          order: i + 1,
          updatedAt: serverTimestamp(),
        });
      }

      fetchLessons(selectedTopic.id);
    } catch (error) {
      console.error(error);
      alert("Failed to reorder lessons");
    }
  }

  async function toggleLessonStatus(lessonId, currentStatus) {
    try {
      const lessonRef = doc(db, "topics", selectedTopic.id, "lessons", lessonId);

      await updateDoc(lessonRef, {
        status: currentStatus === "active" ? "inactive" : "active",
        updatedAt: serverTimestamp(),
      });

      fetchLessons(selectedTopic.id);
    } catch (error) {
      console.error(error);
    }
  }

  function startEditLesson(lesson) {
    setEditingLessonId(lesson.id);
    setLessonTitle(lesson.title || "");
    setLessonDescription(lesson.description || "");
    setYoutubeUrl(lesson.youtubeUrl || "");
    setMaterialUrl(lesson.materialUrl || "");
  }

  async function updateLesson(e) {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Teacher login not found. Please login again.");
      return;
    }

    if (!lessonTitle || !youtubeUrl) {
      alert("Please fill lesson title and YouTube URL");
      return;
    }

    try {
      const teacherId = auth.currentUser.uid;

      const lessonRef = doc(
        db,
        "topics",
        selectedTopic.id,
        "lessons",
        editingLessonId
      );

      await updateDoc(lessonRef, {
        teacherId,
        topicId: selectedTopic.id,
        title: lessonTitle,
        description: lessonDescription,
        youtubeUrl,
        materialUrl,
        updatedAt: serverTimestamp(),
      });

      clearLessonForm();
      fetchLessons(selectedTopic.id);

      alert("Lesson updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update lesson");
    }
  }

  function clearLessonForm() {
    setEditingLessonId(null);
    setLessonTitle("");
    setLessonDescription("");
    setYoutubeUrl("");
    setMaterialUrl("");
  }

  function getYoutubeId(url) {
    if (!url) return null;

    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }

  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <h1>Topic Management</h1>
          <p>Create and manage tuition subjects, videos, and uploaded materials.</p>
        </div>
      </div>

      <div className="dashPanel">
        <div className="sectionTitle">
          <BookOpen size={20} />
          <h3>Create New Topic</h3>
        </div>

        <form onSubmit={handleCreateTopic} className="topicForm">
          <input
            type="text"
            placeholder="Topic Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Topic Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="uploadBox">
            {uploadingBanner ? (
              <>
                <Loader2 className="spinIcon" size={26} />
                <span>Uploading banner...</span>
              </>
            ) : (
              <>
                <Upload size={26} />
                <span>
                  {imageUrl
                    ? "Banner uploaded successfully"
                    : "Upload Topic Banner Image"}
                </span>
              </>
            )}

            <input type="file" accept="image/*" onChange={handleBannerUpload} />
          </label>

          {imageUrl && (
            <div className="uploadPreview">
              <img src={imageUrl} alt="Topic banner preview" />
            </div>
          )}

          <button
            type="submit"
            className="topicCreateBtn"
            disabled={loading || uploadingBanner}
          >
            <Plus size={18} />
            {loading ? "Creating..." : "Create Topic"}
          </button>
        </form>
      </div>

      <div className="topicGrid">
        {topics.map((topic) => (
          <div key={topic.id} className="topicCard">
            <div
              className="topicBanner"
              style={{
                background: topic.imageUrl
                  ? `url(${topic.imageUrl}) center/cover`
                  : "#111827",
              }}
            >
              {!topic.imageUrl && <ImageIcon size={42} />}
            </div>

            <div className="topicContent">
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>

              <div className="topicBottom">
                <span className={`topicStatus ${topic.status}`}>
                  {topic.status}
                </span>

                <button
                  type="button"
                  onClick={() => toggleStatus(topic.id, topic.status)}
                  className="topicActionBtn"
                >
                  {topic.status === "active" ? (
                    <>
                      <EyeOff size={16} />
                      Disable
                    </>
                  ) : (
                    <>
                      <Eye size={16} />
                      Activate
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                className="topicLessonBtn"
                onClick={() => {
                  setSelectedTopic(topic);
                  clearLessonForm();
                  fetchLessons(topic.id);
                }}
              >
                <PlayCircle size={18} />
                Manage Lessons
              </button>
            </div>
          </div>
        ))}

        {topics.length === 0 && (
          <div className="emptyTopicState">
            No topics created yet for this teacher.
          </div>
        )}
      </div>

      {selectedTopic && (
        <div className="dashPanel lessonPanel">
          <div className="sectionTitle">
            <PlayCircle size={20} />
            <h3>{selectedTopic.title} Lessons</h3>
          </div>

          <form
            onSubmit={editingLessonId ? updateLesson : handleCreateLesson}
            className="topicForm"
          >
            <input
              type="text"
              placeholder="Lesson Title"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
            />

            <textarea
              placeholder="Lesson Description"
              value={lessonDescription}
              onChange={(e) => setLessonDescription(e.target.value)}
            />

            <input
              type="text"
              placeholder="YouTube Video URL"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />

            <label className="uploadBox">
              {uploadingMaterial ? (
                <>
                  <Loader2 className="spinIcon" size={26} />
                  <span>Uploading material...</span>
                </>
              ) : (
                <>
                  <Upload size={26} />
                  <span>
                    {materialUrl
                      ? "Material uploaded successfully"
                      : "Upload PDF / Lesson Material"}
                  </span>
                </>
              )}

              <input
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg"
                onChange={handleMaterialUpload}
              />
            </label>

            {materialUrl && (
              <a
                href={materialUrl}
                target="_blank"
                rel="noreferrer"
                className="uploadedFileLink"
              >
                <FileText size={16} />
                View Uploaded Material
              </a>
            )}

            <button
              type="submit"
              className="topicCreateBtn"
              disabled={uploadingMaterial}
            >
              {editingLessonId ? (
                <>
                  <Pencil size={18} />
                  Update Lesson
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Add Lesson
                </>
              )}
            </button>

            {editingLessonId && (
              <button
                type="button"
                className="lessonCancelBtn"
                onClick={clearLessonForm}
              >
                <X size={18} />
                Cancel Edit
              </button>
            )}
          </form>

          <div className="lessonGrid">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="lessonCard">
                {getYoutubeId(lesson.youtubeUrl) ? (
                  <YouTube
                    videoId={getYoutubeId(lesson.youtubeUrl)}
                    opts={{
                      width: "100%",
                      height: "220",
                    }}
                  />
                ) : (
                  <div className="invalidVideoBox">Invalid YouTube URL</div>
                )}

                <div className="lessonContent">
                  <div className="lessonTitleRow">
                    <h3>
                      {lesson.order}. {lesson.title}
                    </h3>

                    <span className={`topicStatus ${lesson.status}`}>
                      {lesson.status || "active"}
                    </span>
                  </div>

                  <p>{lesson.description}</p>

                  <div className="lessonActions">
                    <button
                      type="button"
                      onClick={() => startEditLesson(lesson)}
                      className="lessonActionBtn"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteLesson(lesson.id)}
                      className="lessonActionBtn delete"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                    <button
                      type="button"
                      onClick={() => moveLesson(index, "up")}
                      className="lessonActionBtn"
                      disabled={index === 0}
                    >
                      <ArrowUp size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => moveLesson(index, "down")}
                      className="lessonActionBtn"
                      disabled={index === lessons.length - 1}
                    >
                      <ArrowDown size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        toggleLessonStatus(lesson.id, lesson.status)
                      }
                      className="lessonActionBtn"
                    >
                      {lesson.status === "active" ? "Disable" : "Activate"}
                    </button>
                  </div>

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
            ))}

            {lessons.length === 0 && (
              <div className="emptyTopicState">
                No lessons added yet for this topic.
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default TopicsPage;
