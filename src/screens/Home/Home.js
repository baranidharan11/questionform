import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchForms, deleteForm } from "../../redux/Forms/action";
import { useNavigate } from "react-router-dom";

const HomeScreen = ({ forms, fetchForms, deleteForm }) => {
  useEffect(() => {
    fetchForms();
  }, [fetchForms]);
  const navigate = useNavigate();
  const handleDelete = (formId) => {
    deleteForm(formId);
  };
  console.log("forms", forms);
  return (
    <div className="container mx-auto p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => navigate("/create-form")}
      >
        Create New Form
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {forms &&
          forms?.forms?.map((form) => (
            <div key={form._id} className="border rounded p-4 shadow">
              <h3 className="text-lg font-semibold mb-2">{form.title}</h3>
              <p className="mb-2">{form.description}</p>
              <button
                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => navigate(`/edit-form/${form._id}`)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => handleDelete(form._id)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => navigate(`/fill-form/${form._id}`)}
              >
                Respond
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  forms: state.forms,
});

const mapDispatchToProps = (dispatch) => ({
  fetchForms: () => dispatch(fetchForms()),
  deleteForm: (formId) => dispatch(deleteForm(formId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
