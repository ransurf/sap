import * as React from "react";

type FormValues = {
  [key: string]: any;
};

interface Props {
  selectInputs: SelectInputsProps[];
  textInputs: TextInputsProps[];
  onSubmit: (...args: any) => void;
  register: any;
  errors: any;
  classNames?: string;
}

interface SelectInputsProps {
  label: string;
  value: string;
  options: SelectInput[];
  details?: any;
}

interface TextInputsProps {
  label: string;
  value: string;
  type: string;
  details?: any;
}

interface SelectInput {
  value: string;
  label: string;
}

export default function Form(props: Props) {
  const { selectInputs, textInputs, onSubmit, register, errors, classNames } =
    props;

  const generateTextInputFields = (mockTextInputs: TextInputsProps[]) => {
    return mockTextInputs.map((input, index) => {
      const { label, type, value, details: details = {} } = input;
      console.log("details", details);
      return (
        <div className="flex flex-col w-full max-w-xs" key={value}>
          <label className="my-label-text" htmlFor={value}>
            {label}
          </label>
          {type === "textarea" ? (
            <textarea
              className="input input-bordered w-full max-w-xs"
              id={value}
              {...register(value, details)}
            />
          ) : (
            <input
              {...register(value, details)}
              id={value}
              type={type}
              className="input input-bordered w-full max-w-xs"
            />
          )}
          {errors[value] && (
            <p className="text-red-500">{errors[value]?.message}</p>
          )}
        </div>
      );
    });
  };

  const generateSelectFields = (selectInputs: SelectInputsProps[]) => {
    return selectInputs.map((input, index) => {
      const { label, value, options, details } = input;
      return (
        <div className="flex flex-col w-full max-w-xs" key={value}>
          <label htmlFor={value}>
            {" "}
            <span className="my-label-text">{label}</span>
          </label>
          <select
            {...register(value, details)}
            id={value}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              Pick one
            </option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors[value] && (
            <p className="text-red-500">{errors[value]?.message}</p>
          )}
        </div>
      );
    });
  };

  return (
    <form className="flex flex-col gap-4 form-control" onSubmit={onSubmit}>
      {generateTextInputFields(textInputs)}
      {generateSelectFields(selectInputs)}
      <button className="btn btn-primary w-full max-w-xs" type="submit">Submit</button>
    </form>
  );
}
