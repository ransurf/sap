import * as React from "react";
import Form, {
  SelectInputsProps,
  TextInputsProps,
  FormValues,
} from "../../components/Form";
import { useForm } from "react-hook-form";
import { updateUserInfo } from "../../back-end/functions";
import { useAuth } from "../../back-end/authContext";
import { OfficeSelect, PositionSelect } from "../../formData";
import { toast } from "react-toastify";

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
    OfficeSelect,
    {
      label: "Gender",
      value: "gender",
      options: [
        {
          value: "Male",
          label: "Male",
        },
        {
          value: "Female",
          label: "Female",
        },
        {
          value: "They/Them",
          label: "They/Them",
        },
        {
          value: "Other",
          label: "Other",
        },
      ],
    },
  ];

  const onSubmit = (data: any, event: any) => {
    event.preventDefault();
    const newData = {
      ...data,
      user,
    };
    console.log("uploadUserData", newData, user);
    updateUserInfo(newData)
      .then((res) => {
        console.log("res", res);
        toast.success("Profile updated successfully");
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("Profile update failed");
      });
  };

  return (
    <div className="page-container form-container">
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
