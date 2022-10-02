import React from "react";
import Form, { SelectInputsProps, FormValues } from "../Form";
import { LocationSelect, PositionSelect } from "../../formData";
import { useForm } from "react-hook-form";
type Props = {
  setFilter?: (...args: any) => void;
  filters?: string[];
  form?: boolean;
  reset?: boolean;
};

const Drawer = (props: Props) => {
  const { setFilter, filters, form, reset } = props;
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
                <a className="text-md font-bold">{val}</a>
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
        {reset? (<button className="btn btn-secondary text-capitalize text-white" onClick={() => setFilter(null)}>
          clear filter
        </button>):null}
        </ul>
      </div>
	  <div>
	  	<iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FVancouver&showNav=0&showTitle=0&showPrint=0&showTabs=0&showCalendars=0&src=c2F0LmdhcmcwM0BnbWFpbC5jb20&color=%23039BE5" width="300" height="600" frameborder="0" scrolling="no"></iframe>
	  </div>
    </div>
  );
};

export default Drawer;
