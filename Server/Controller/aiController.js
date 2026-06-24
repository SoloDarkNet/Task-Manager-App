const { generateSuggestion } = require("../service/aiService");

const getAISuggestions = async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }
    //Temporary Response
    const suggestions = await generateSuggestion(category);
    console.log(suggestions);

    return res.status(200).json({
      success: true,
      suggestions,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports = { getAISuggestions };
