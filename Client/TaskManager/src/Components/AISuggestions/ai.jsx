import React, { useState } from "react";
import api from "../../Services/app";
import "./ai.css";

const Categories = [
  { name: "Work", icon: "💼" },
  { name: "Personal", icon: "😎" },
  { name: "Health", icon: "❤️" },
  { name: "Finance", icon: "💰" },
  { name: "learning", icon: "📚" },
  { name: "Home", icon: "🏡" },
];

const AISuggestions = ({ addTask }) => {
  const [hide, setHide] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // API Call (For future use)
  const getSuggestions = async (category) => {
    const response = await api.post("/ai/suggestions", { category });
    return response.data;
  };

  // onClickCategory
  const onClickCategory = async (category) => {
    try {
      setSelectedCategory(category.name);
      setLoading(true);
      const data = await getSuggestions(category);
      setSuggestions(data.suggestions);
      setLoading(false);
      console.log(suggestions);
    } catch (e) {
      console.log(e);
    }
  };

  const onAddAiTask = (suggestion) => {
    addTask({
      title: suggestion.title,
      description: suggestion.description || "",
      priority: suggestion.priority || "Medium",
      status: suggestion.status || "Pending",
    });
    const updateSuggestions = suggestions.filter(
      (task) => task.title != suggestion.title,
    );

    setSuggestions(updateSuggestions);
  };

  const onRemoveSuggestions = (suggestion) => {
    const removeSuggestions = suggestions.filter(
      (task) => task.title != suggestion.title,
    );
    setSuggestions(removeSuggestions);
  };

  //Loading added

  const Loader = () => (
    <div className="d-flex justify-content-center align-items-center py-4 flex-column">
      <div className="spinner-border text-primary mb-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted">Generating AI suggestions...</p>
    </div>
  );

  return (
    <>
      <nav className="d-flex align-items-center justify-content-between p-2 mb-4">
        <div className="d-flex align-items-center gap-2">
          <h4 className="heading mb-0">💡AI Task Suggestions</h4>
          <span className="badge bg-primary">Gemini AI</span>
        </div>
        <div>
          <button className="hide-modern" onClick={() => setHide(!hide)}>
            {hide ? "⬆️ Hide" : "🔻 Open"}
          </button>
        </div>
      </nav>

      {/* Categories Buttons */}
      {hide && (
        <div className="mt-3 categories-container">
          {Categories.map((category, index) => (
            <button
              key={index}
              className={`category-btn mb-2 ${selectedCategory === category.name ? "active-category" : ""}`}
              onClick={() => onClickCategory(category.name)}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      )}

      {hide && (
        <div className="ai-suggestion-card mt-4 mb-5">
          {loading ? (
            Loader()
          ) : (
            <ul className="ai-card-content">
              {suggestions.map((t, i) => (
                <li key={i} className="suggestion-item">
                  <span className="suggestion-title">{t.title}</span>
                  <span
                    className={`suggestion-priority priority-${t.priority.toLowerCase()}`}
                  >
                    {t.priority}
                  </span>
                  <div className="action-buttons">
                    <button
                      onClick={() => onAddAiTask(t)}
                      className="icon-btn add-btn"
                      title="Add Task"
                    >
                      ➕
                    </button>
                    <button
                      onClick={() => onRemoveSuggestions(t)}
                      className="icon-btn remove-btn"
                      title="Remove Suggestion"
                    >
                      ❌
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default AISuggestions;
