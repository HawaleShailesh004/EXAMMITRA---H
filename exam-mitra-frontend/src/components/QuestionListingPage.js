import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdSwapVert } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import jsPDF from "jspdf";
import "jspdf-autotable";
import removeMarkdown from "remove-markdown";
import debounce from "lodash.debounce";

import Header from "./Header";
import Footer from "./Footer";
import "../CSS/Home.css";
import "../CSS/QuestionListingPage.css";

import { databases } from "../Database/appwriteConfig";
import { useUser } from "../context/userContext";
import { Query } from "appwrite";

const QuestionListingPage = () => {
  // ------------------ States ------------------
  const [sortOrder, setSortOrder] = useState(true); // true = ascending
  const [sortField, setSortField] = useState("marks");
  const [filter, setFilter] = useState("all");
  const [currentSubject, setCurrentSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user, userLoading } = useUser();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paperId = queryParams.get("paperId");

  // ------------------ Debounced DB Update ------------------
  const debouncedUpdate = useRef(
    debounce(async (id, field, newValue) => {
      try {
        await databases.updateDocument(
          process.env.REACT_APP_APPWRITE_DATABASE_ID,
          process.env.REACT_APP_APPWRITE_QUESTIONS_COLLECTION_ID,
          id,
          {
            [field === "status" ? "isDone" : "isReviosn"]: newValue,
          }
        );
      } catch (err) {
        console.error("❌ Update failed:", err);
      }
    }, 500)
  ).current;

  // ------------------ Fetch Paper + Questions ------------------
  useEffect(() => {
    if (userLoading) return;

    const fetchData = async () => {
      try {
        if (!user) {
          setError("🔐 Please login to view questions.");
          setLoading(false);
          return;
        }

        if (!paperId) {
          setError("❗ No paper selected. Please select a subject.");
          setLoading(false);
          return;
        }

        // Fetch paper details
        const paper = await databases.getDocument(
          process.env.REACT_APP_APPWRITE_DATABASE_ID,
          process.env.REACT_APP_APPWRITE_PAPERS_COLLECTION_ID,
          paperId
        );

        setCurrentSubject({
          subject: paper.title,
          paperCode: "",
          paperId: paper.$id,
        });

        // Fetch related questions
        const qRes = await databases.listDocuments(
          process.env.REACT_APP_APPWRITE_DATABASE_ID,
          process.env.REACT_APP_APPWRITE_QUESTIONS_COLLECTION_ID,
          [Query.equal("paperId", paperId)]
        );

        // Format question data
        const transformed = qRes.documents.map((q, index) => ({
          id: q.$id,
          text: q.questionText,
          marks: q.marks,
          frequency: q.frequency,
          status: q.isDone,
          revision: q.isReviosn,
          answer: q.answers || "",
        }));

        setQuestions(transformed);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error:", err);
        setError("❌ Failed to fetch paper or questions.");
        setLoading(false);
      }
    };

    fetchData();
  }, [user, userLoading, paperId]);

  // ------------------ Filtering Function ------------------
  const applyFilter = (questions, filter) => {
    switch (filter) {
      case "revision":
        return questions.filter((q) => q.revision);
      case "done":
        return questions.filter((q) => q.status);
      case "below10":
        return questions.filter((q) => q.marks < 10);
      case "above10":
        return questions.filter((q) => q.marks >= 10);
      default:
        return questions;
    }
  };

  // ------------------ Sorting Function ------------------
  const toggleSort = () => {
    const newSortOrder = !sortOrder;
    setSortOrder(newSortOrder);
    sortQuestions(sortField, newSortOrder);
  };

  const sortQuestions = (field, order) => {
    const sorted = [...questions].sort((a, b) =>
      order ? a[field] - b[field] : b[field] - a[field]
    );
    setQuestions(sorted);
  };

  const updateList = (e) => {
    const field = e.target.value;
    setSortField(field);
    sortQuestions(field, sortOrder);
  };

  // ------------------ Checkbox State Update ------------------
  const updateQuestionCheckbox = (id, field) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, [field]: !q[field] } : q
    );
    setQuestions(updatedQuestions);

    const newValue = !questions.find((q) => q.id === id)[field];
    debouncedUpdate(id, field, newValue);
  };

  // ------------------ PDF Export ------------------
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const lineHeight = 10;
    let y = 20;

    doc.setFontSize(16);
    doc.text(`${currentSubject.subject}`, 14, y);
    y += lineHeight + 4;
    doc.setFontSize(12);

    const sortedQuestions = [...applyFilter(questions, filter)].sort(
      (a, b) => b.frequency - a.frequency
    );

    sortedQuestions.forEach((q, index) => {
      const questionText = `Q${index + 1}. ${q.text}`;
      const answerText = `Answer: ${removeMarkdown(q.answer) || "N/A"}`;
      const detailsText = `Marks: ${q.marks} | Frequency: ${q.frequency}`;

      const splitQuestion = doc.splitTextToSize(questionText, 180);
      const splitAnswer = doc.splitTextToSize(answerText, 180);
      const splitDetails = doc.splitTextToSize(detailsText, 180);

      if (y + splitQuestion.length * lineHeight > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(splitQuestion, 14, y);
      y += splitQuestion.length * lineHeight;

      doc.text(splitAnswer, 14, y);
      y += splitAnswer.length * lineHeight;

      doc.text(splitDetails, 14, y);
      y += splitDetails.length * lineHeight + 6;
    });

    doc.save(`${currentSubject.subject}_Questions.pdf`);
  };

  const filteredQuestions = applyFilter(questions, filter);

  // ------------------ Loading and Error UI ------------------
  if (loading || userLoading)
    return (
      <>
        <Header />
        <div className="loading-spinner">
          <div className="loader"></div>
          <p>Loading Questions...</p>
        </div>
        <Footer />
      </>
    );

  if (error)
    return (
      <>
        <Header />
        <div style={{ color: "red", padding: "2rem" }}>{error}</div>
        <Footer />
      </>
    );

  // ------------------ Main Render ------------------
  return (
    <div>
      <Header />
      <div className="main-qs-container">
        {/* Subject Title */}
        <div className="subject-details-qs">
          <h1 className="title">{currentSubject.subject}</h1>
        </div>

        {/* Filter & Sort Controls */}
        <div className="filter-container">
          <span>Questions List</span>

          <div className="selectContainer">
            <select name="sort" id="sort" onChange={updateList}>
              <option value="marks">Marks</option>
              <option value="frequency">Frequency</option>
            </select>
          </div>

          <button onClick={toggleSort} className="sortButton">
            <MdSwapVert />
          </button>

          <button onClick={handleExportPDF} className="sortButton" id="exportBtn">
            <FaFilePdf />
          </button>

          <div className="selectContainer">
            <select
              name="filter"
              id="filter"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="revision">Revision Only</option>
              <option value="done">Done Only</option>
              <option value="below10">Marks &lt; 10</option>
              <option value="above10">Marks ≥ 10</option>
            </select>
            <FiFilter className="filterIcon" />
          </div>
        </div>

        {/* Questions Table */}
        {/* Table view (for tablets and desktops) */}
        <div className="question-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Answer</th>
                <th>Marks</th>
                <th>Frequency</th>
                <th>Revision</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map((que, i) => (
                <tr key={que.id}>
                  <td>{i + 1}</td>
                  <td className="que-text">{que.text}</td>
                  <td>
                    <Link id="ansbtn" to={`/answer/${que.id}`}>
                      Answer
                    </Link>
                  </td>
                  <td>{que.marks}</td>
                  <td>{que.frequency}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={que.revision}
                      onChange={() =>
                        updateQuestionCheckbox(que.id, "revision")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={que.status}
                      onChange={() => updateQuestionCheckbox(que.id, "status")}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card view (for mobile) */}
        <div className="question-cards-wrapper">
          {filteredQuestions.map((que, i) => (
            <div className="question-card" key={que.id}>
              <div id="card-que-text">
                <strong>{`${i + 1}.`}</strong> {que.text}
              </div>

              <div id="card-checkbox-container">
                <span>
                  <strong>Revision:</strong>{" "}
                  <input
                    id="card-checkbox"
                    type="checkbox"
                    checked={que.revision}
                    onChange={() => updateQuestionCheckbox(que.id, "revision")}
                  />
                </span>
                <span>
                  <strong>Status:</strong>{" "}
                  <input
                    type="checkbox"
                    checked={que.status}
                    onChange={() => updateQuestionCheckbox(que.id, "status")}
                  />
                </span>
              </div>

              <div id="card-checkbox-container">
                <span>
                  <strong>Marks:</strong> {que.marks}
                </span>
                <span>
                  <strong>Frequency:</strong> {que.frequency}
                </span>
              </div>
              <div id="card-ans-text">
                <Link id="ansbtn" to={`/answer/${que.id}`}>
                  Answer
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuestionListingPage;
