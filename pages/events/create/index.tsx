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
import Router from "next/router";
import {useState} from 'react'
import analytics from '../../../utils/analytics'
type Props = {};

const CreateEvent = (props: Props) => {
  const [encImg , setEncImg] = useState(null);
  const { user, loading } = useAuth();
  const [file , setFile] = React.useState(null);
  const setImage = (img) => {
    setEncImg(img)
  }
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
      label: "Start Date",
      type: "datetime-local",
      value: "startDate",
      details: {
        required: "Event start time is required",
      },
    },
    {
      label: "End Date",
      type: "datetime-local",
      value: "endDate",
      details: {
        required: "Event start time is required",
      },
    },
    {
      label: "Max Participants (Set as 0 for unlimited)",
      type: "number",
      value: "maxAttendees",
    },
    {
      label: "Question for the viewer (leave empty for none)",
      type: "string",
      value: "extraInfo",
    },
  ];

  const createEventSelectFields: SelectInputsProps[] = [
    LocationSelect,
    OfficeSelect,
    EventTypeSelect
  ];

  const onSubmit = (data: any, event: any) => {
    event.preventDefault();
    const formattedData = {
      ...data,
      image: encImg,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    };
    const newData = {
      ...formattedData,
      user,
    };
    analytics.track('event-created',{
      'eventType': newData.eventType,
      'location': newData.location,
      'office': newData.office,
      'description': newData.description,
      'title': newData.title
    })
    console.log("createEvent", newData, user);
    createNewEvent(newData);
    Router.push('/dashboard')
  };

  return (
    <div className="page-container form-container">
      <h1 className="page-title">Create Event</h1>
      
      <Form
        textInputs={createEventInputFields}
        selectInputs={createEventSelectFields}
        onSubmit={handleSubmit(onSubmit)}
        file = {setImage}
        register={register}
        errors={errors}
      />     
    </div>
  );
};

export default CreateEvent;