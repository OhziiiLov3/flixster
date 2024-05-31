import "../styles/Dropdown.css";

const Dropdown = ({ label, options, onChange, value }) => {
  const handleSelect = (e) => {
    const selectedOption = e.target.value;
    onChange(selectedOption);
  };

  return (
    <div className="dropdown">
      <label>{label}</label>
      <select className="form-select" onChange={handleSelect} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
  
      </select>
    </div>
  );
};

export default Dropdown;
