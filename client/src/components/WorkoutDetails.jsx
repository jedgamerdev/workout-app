import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutModal from "./home/WorkoutModal";

// date fns
import formatDistancetoNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    console.log("edit");
  };

  const handleClick = async () => {
    const response = await fetch(
      "http://localhost:3000/api/workouts/" + workout._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div>
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Number of reps: </strong>
          {workout.reps}
        </p>
        <p>
          {" "}
          {formatDistancetoNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
        <span
          className="material-symbols-outlined delete"
          onClick={handleClick}
        >
          Delete
        </span>
        <span
          className="material-symbols-outlined edit"
          onClick={() => setShowModal(true)}
        >
          Edit
        </span>
      </div>
      <div>
        {showModal && (
          <WorkoutModal workout={workout} onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default WorkoutDetails;
