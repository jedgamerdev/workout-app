import { useState } from "react";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";

const BookModal = ({ workout, onClose }) => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("http://localhost:3000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      dispatch({ type: "CREATE_WORKOUTS", payload: json });
    }
  };
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 bottom-0 right-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <span className="material-symbols-outlined delete" onClick={onClose}>
          Close
        </span>
        <h1>Workout Modal Popup</h1>
        <form className="create" onSubmit={handleSubmit}>
          <h3>Add a new workout</h3>
          <label>Exercise Title:</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes("title") ? "error" : ""}
            required={true}
          />

          <label>Load (in Kg):</label>
          <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes("load") ? "error" : ""}
            required={true}
          />

          <label>Repititions:</label>
          <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes("reps") ? "error" : ""}
            required={true}
          />

          <button>Add workout</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default BookModal;
