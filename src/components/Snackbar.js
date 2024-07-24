// src/components/Snackbar.js
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { clearError } from "../redux/Forms/action";

const Snackbar = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        dispatch(clearError());
      }, 3000);
    }
  }, [props.error, dispatch]);

  if (!show || !props.error) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg">
      {error}
    </div>
  );
};

const mapStateToProps = (state) => ({
  forms: state.forms.forms,
});
export default connect(mapStateToProps, null)(Snackbar);
