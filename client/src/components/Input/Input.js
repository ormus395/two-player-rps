const Field = (props) => {
  return (
    <>
      <label htmlFor="">{props.label}</label>
      <input
        type="text"
        name={props.name}
        value={props.value}
        onChange={(e) => props.handleChange(e.target.value)}
      />
    </>
  );
};

export default Field;
