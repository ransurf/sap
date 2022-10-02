import React from "react";
import Form, { SelectInputsProps, FormValues } from "../Form";
import { LocationSelect, PositionSelect } from "../../formData";
import { useForm } from "react-hook-form";
type Props = {
  setFilter?: (...args: any) => void;
  filters?: string[];
  form?: boolean;
};

const Drawer = (props: Props) => {
  const { setFilter, filters, form } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const inputValues: SelectInputsProps[] = [
    {
      label: "Location",
      value: "location",
      options: [
        { label: "none", value: "" },
        { value: "Online", label: "Online" },
        { value: "In Office", label: "In Office" },
        { value: "In Person", label: "In Person" },
      ],
    },
    {
      label: "Event Type",
      value: "eventType",
      options: [
        { label: "none", value: "" },
        { value: "Food and Drink", label: "Food and Drink" },
        { value: "Board Games", label: "Board Games" },
        { value: "Video Games", label: "Video Games" },
        { value: "Fitness", label: "Fitness" },
        { value: "Sports", label: "Sports" },
        { value: "Arts", label: "Arts" },
        { value: "Socializing", label: "Socializing" },
        { value: "Music", label: "Music" },
        { value: "Media", label: "Media" },
        { value: "Other", label: "Other" },
      ],
    },
    {
      label: "Office",
      value: "office",
      options: [
        { label: "none", value: "" },
        { label: "Calgary", value: "Calgary" },
        { label: "Montreal", value: "Montreal" },
        { label: "Ottowa", value: "Ottowa" },
        { label: "Toronto", value: "Toronto" },
        { label: "Vancouver", value: "Vancouver" },
        { label: "Waterloo", value: "Waterloo" },
      ],
    },
  ];
  const onSubmit = (data: any, event: any) => {
    event.preventDefault();
    setFilter(data);
  };
  return (
    <div className="drawer max-w-xs">
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content gap-2">
          {filters?.map((val, key) => {
            return (
              <li onClick={() => setFilter(val)} key={key}>
                <a>{val}</a>
              </li>
            );
          })}
          {form ? (
            <Form
              selectInputs={inputValues}
              errors={errors}
              register={register}
              onSubmit={handleSubmit(onSubmit)}
            />
          ) : null}
          <button className="btn btn-secondary text-capitalize text-white" onClick={() => setFilter(null)}>
            clear filter
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
