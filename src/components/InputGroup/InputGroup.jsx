import "./InputGroup.css";

const InputGroup = ({
  label,
  placeholder,
  name,
  type = "text",
  value,
  setValue,
}) => {
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="input__group">
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default InputGroup;
