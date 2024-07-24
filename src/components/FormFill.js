import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchFormById, submitResponse } from "../redux/Forms/action";
import { useParams } from "react-router-dom";
import Snackbar from "./Snackbar.js";

const FormFill = ({ currentForm, fetchFormById, submitResponse }) => {
  const { formId } = useParams();
  const [responses, setResponses] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchFormById(formId);
  }, [fetchFormById, formId]);

  const handleChange = (questionId, optionIndex) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitResponse(formId, responses)
      .then(() => {
        setSnackbarMessage("Response submitted successfully!");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        setSnackbarMessage(`Error: ${error.message}`);
        setSnackbarOpen(true);
      });
  };

  if (!currentForm) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{currentForm.title}</h1>
      <form onSubmit={handleSubmit}>
        {currentForm.questions.map((question, qIndex) => (
          <div key={question._id} className="mb-4">
            <label className="block text-lg font-medium mb-2">
              {qIndex + 1}. {question.text}
            </label>
            <div>
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center mb-2">
                  <input
                    type={question.type === "single" ? "radio" : "checkbox"}
                    name={`question-${question._id}`}
                    value={oIndex}
                    onChange={() => handleChange(question._id, oIndex)}
                    checked={responses[question._id] === oIndex}
                    className="mr-2"
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentForm: state.forms.currentForm,
});

const mapDispatchToProps = {
  fetchFormById,
  submitResponse,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFill);
