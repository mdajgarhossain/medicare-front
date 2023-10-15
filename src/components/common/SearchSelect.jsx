import Select from "react-select";

function SearchSelect(props) {
  return (
    <Select
      classNamePrefix="project"
      className={`${props?.classNames}`}
      styles={{
        control: (base, state) => ({
          ...base,
          fontSize: 14,
          cursor: "pointer",
          border: state.isFocused && "1px solid #242a44 !important",
          boxShadow: state.isFocused && "0 0 0 1px #242a44 !important",
          width: props?.width ?? "",
          padding: props?.insidePadding ?? "",
        }),
        input: (base) => ({
          ...base,
          fontSize: 14,
          "input:focus": {
            boxShadow: "none",
          },
        }),
        placeholder: (base) => ({
          ...base,
          fontSize: 14,
        }),
        option: (styles, state) => ({
          ...styles,
          cursor: "pointer",
        }),
      }}
      {...props}
    />
  );
}

export default SearchSelect;
