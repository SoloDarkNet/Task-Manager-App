const CountStatusContainer = ({ task }) => {
  const completed = () => {
    return task.filter((t) => t.status === "Completed").length;
  };

  const inProgress = () => {
    return task.filter((t) => t.status === "In Progress").length;
  };

  const pending = () => {
    return task.filter((t) => t.status === "Pending").length;
  };

  return (
    <div className="d-flex justify-content-center gap-4 mb-3">
      <h6 className="text-success">Completed ({completed()})</h6>
      <h6 className="text-warning">In Progress ({inProgress()})</h6>
      <h6 className="text-danger">Pending ({pending()})</h6>
    </div>
  );
};
export default CountStatusContainer;
