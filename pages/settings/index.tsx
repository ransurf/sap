import * as React from "react";
import Form from "../../components/Form";
import { useForm } from "react-hook-form";

type FormValues = {
  [key: string]: any;
};

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

export default function Settings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const showToast = () => {
    return (
      <div className="toast toast-end toast-middle">
        <div className="alert alert-info">
          <div>
            <span>New mail arrived.</span>
          </div>
        </div>
        <div className="alert alert-success">
          <div>
            <span>Message sent successfully.</span>
          </div>
        </div>
      </div>
    );
  };

  const mockTextInputs: TextInputsProps[] = [
    {
      label: "First Name",
      type: "text",
      value: "firstName",
    },
    {
      label: "Last Name",
      type: "text",
      value: "lastName",
    },
    {
      label: "Age",
      type: "number",
      value: "age",
    },
  ];

  const mockSelectInputs: SelectInputsProps[] = [
    {
      label: "Location",
      value: "location",
      options: [
        { label: "Calgary", value: "Calgary" },
        { label: "Montreal", value: "Montreal" },
        { label: "Ottowa", value: "Ottowa" },
        { label: "Toronto", value: "Toronto" },
        { label: "Vancouver", value: "Vancouver" },
        { label: "Waterloo", value: "Waterloo" },
      ],
    },
    {
      label: "Position",
      value: "position",
      options: [
        { label: "Developer", value: "Developer" },
        { label: "UI/UX Designer", value: "UI/UX Designer" },
        { label: "Product Manager", value: "Product Manager" },
        { label: "Sales and Marketing", value: "Sales and Marketing" },
        { label: "Other", value: "Other" },
      ],
    },
  ];

  const onSubmit = (data: any, event: any) => {
    event.preventDefault();
    console.log("uploadUserData", data);
  };

  return (
    <>
      <Form
        selectInputs={mockSelectInputs}
        textInputs={mockTextInputs}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
      {showToast()}
    </>
  );
}
