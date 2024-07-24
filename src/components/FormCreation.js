import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createForm, fetchForm, editForm } from "../redux/Forms/action";
import { useNavigate, useParams } from "react-router-dom";

const FormCreation = ({ formToEdit, createForm, fetchForm, editForm }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    questions: [],
  });
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchForm(id);
    }
  }, [fetchForm, id]);

  useEffect(() => {
    if (id && formToEdit) {
      setForm(formToEdit);
    }
  }, [id, formToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddQuestion = () => {
    setForm({
      ...form,
      questions: [
        ...form.questions,
        { text: "", options: ["", "", "", ""], type: "single" },
      ],
    });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...form.questions];
    newQuestions[index].text = value;
    setForm({ ...form, questions: newQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...form.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setForm({ ...form, questions: newQuestions });
  };

  const handleQuestionTypeChange = (index, value) => {
    const newQuestions = [...form.questions];
    newQuestions[index].type = value;
    setForm({ ...form, questions: newQuestions });
  };

  const handleSave = () => {
    if (id) {
      editForm(id, form);
    } else {
      createForm(form);
    }
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Form" : "Create Form"}
      </h2>
      <input
        className="w-full border p-2 mb-4"
        type="text"
        name="title"
        placeholder="Form Title"
        value={form.title}
        onChange={handleInputChange}
      />
      <textarea
        className="w-full border p-2 mb-4"
        name="description"
        placeholder="Form Description"
        value={form.description}
        onChange={handleInputChange}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleAddQuestion}
      >
        Add Question
      </button>
      {form.questions.map((question, qIndex) => (
        <div key={qIndex} className="border p-4 mb-4 rounded">
          <input
            className="w-full border p-2 mb-2"
            type="text"
            placeholder={`Question ${qIndex + 1}`}
            value={question.text}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
          />
          {question.options.map((option, oIndex) => (
            <input
              key={oIndex}
              className="w-full border p-2 mb-2"
              type="text"
              placeholder={`Option ${oIndex + 1}`}
              value={option}
              onChange={(e) =>
                handleOptionChange(qIndex, oIndex, e.target.value)
              }
            />
          ))}
          <select
            className="w-full border p-2 mb-2"
            value={question.type}
            onChange={(e) => handleQuestionTypeChange(qIndex, e.target.value)}
          >
            <option value="single">Single Choice</option>
            <option value="multiple">Multiple Choice</option>
          </select>
        </div>
      ))}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleSave}
      >
        Save Form
      </button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  formToEdit: state.forms?.forms?.find(
    (f) => f._id === ownProps.match.params.id
  ),
});

const mapDispatchToProps = (dispatch) => ({
  createForm: (form) => dispatch(createForm(form)),
  fetchForm: (formId) => dispatch(fetchForm(formId)),
  editForm: (formId, updatedForm) => dispatch(editForm(formId, updatedForm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormCreation);
