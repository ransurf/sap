import * as React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  [key: string]: any;
};

interface Props {
  selectInputs: SelectInputsProps[];
  textInputs: TextInputsProps[];
  onSubmit: (data: FormValues) => void;
  register: any;
  errors: any;
  classNames?: string;
}

interface SelectInputsProps {
  label: string;
  value: string;
  options: SelectInput[];
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
      return (
        <div className="flex flex-col w-full max-w-xs" key={value}>
          <label className="" htmlFor={value}>
            {label}
          </label>

          <input
            {...register(value, details)}
            id={value}
            type={type}
            className="input input-bordered w-full max-w-xs"
          />
          {errors[value] && <p>{errors[value]?.message}</p>}
        </div>
      );
    });
  };

  const generateSelectFields = (selectInputs: SelectInputsProps[]) => {
    return selectInputs.map((input, index) => {
      const { label, value, options } = input;
      return (
        <div className="flex flex-col w-full max-w-xs" key={value}>
          <label htmlFor={value}>
            {" "}
            <span className="label-text">{label}</span>
          </label>
          <select
            {...register(value)}
            id="gender"
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
        </div>
      );
    });
  };

  return (
    <form className="flex flex-col gap-4 form-control" onSubmit={onSubmit}>
      {generateTextInputFields(textInputs)}
      {generateSelectFields(selectInputs)}
      <button type="submit">Submit</button>
    </form>
  );
}
