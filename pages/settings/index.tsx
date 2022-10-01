import * as React from "react";
import Form, {
  SelectInputsProps,
  TextInputsProps,
  FormValues
} from "../../components/Form";
import { useForm } from "react-hook-form";
import { updateUserInfo } from "../../back-end/functions";
import { useAuth } from "../../back-end/authContext";
import { LocationSelect, PositionSelect } from "../../formData";

export default function Settings() {
  const { user, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  //   const showToast = () => {
  //     return (
  //       <div className="toast toast-end toast-middle">
  //         <div className="alert alert-info">
  //           <div>
  //             <span>New mail arrived.</span>
  //           </div>
  //         </div>
  //         <div className="alert alert-success">
  //           <div>
  //             <span>Message sent successfully.</span>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   };

  const mockTextInputs: TextInputsProps[] = [
    {
      label: "First Name",
      type: "text",
      value: "firstName",
      details: {
        required: "First name is required",
      },
    },
    {
      label: "Last Name",
      type: "text",
      value: "lastName",
      details: {
        required: "Last name is required",
      },
    },
    {
      label: "Age",
      type: "number",
      value: "age",
      details: {
        required: "Age is required",
      },
    },
    {
      label: "Bio",
      type: "textarea",
      value: "bio",
      details: {
        required: "Bio is required",
      },
    },
  ];

  const mockSelectInputs: SelectInputsProps[] = [
    PositionSelect,
    LocationSelect,
  ];

  const onSubmit = (data: any, event: any) => {
    event.preventDefault();
    const newData = {
      ...data,
      user,
    };
    console.log("uploadUserData", newData, user);
    updateUserInfo(newData);
  };

  return (
    <div className="page-container forms-container">
      <h1 className="page-title">Settings</h1>
      <Form
        selectInputs={mockSelectInputs}
        textInputs={mockTextInputs}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
    </div>
  );
}
