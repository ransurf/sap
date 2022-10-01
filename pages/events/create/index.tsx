import React from "react";
import Form, {
  SelectInputsProps,
  TextInputsProps,
  FormValues,
} from "../../../components/Form";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../back-end/authContext";
import {LocationSelect, OfficeSelect, EventTypeSelect} from '../../../formData'
import {createNewEvent} from '../../../back-end/functions'

type Props = {};

const CreateEvent = (props: Props) => {
  const { user, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const createEventInputFields = [
    {
      label: "Event Title",
      type: "text",
      value: "title",
      details: {
        required: "Event name is required",
      },
    },
    {
      label: "Event Description",
      type: "textarea",
      value: "description",
      details: {
        required: "Event description is required",
      },
    },
    {
      label: "Date",
      type: "datetime-local",
      value: "startDate",
      details: {
        required: "Event start time is required",
      },
    },
    {
      label: "Date",
      type: "datetime-local",
      value: "endDate",
      details: {
        required: "Event start time is required",
      },
    },
    {
      label: "Max Participants (leave empty for unlimited)",
      type: "number",
      value: "maxParticipants",
      details: {
        required: "Max participants is required",
      },
    },
  ];

  const createEventSelectFields: SelectInputsProps[] = [
    LocationSelect,
    OfficeSelect,
    EventTypeSelect
  ];

  const onSubmit = (data: any, event: any) => {
    event.preventDefault();
    const dataWithDates = {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    };
    const newData = {
      ...dataWithDates,
      user,
    };
    console.log("createEvent", newData, user);
    createNewEvent(newData);
  };

  return (
    <div className="page-container form-container">
      <h1 className="page-title">Create Event</h1>
      <Form
        textInputs={createEventInputFields}
        selectInputs={createEventSelectFields}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
    </div>
  );
};

export default CreateEvent;
