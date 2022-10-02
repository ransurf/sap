import React from "react";
import Form, {
  SelectInputsProps,
  TextInputsProps,
  FormValues,
} from "../../../../components/Form";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../back-end/authContext";
import {
  LocationSelect,
  OfficeSelect,
  EventTypeSelect,
} from "../../../../formData";
import { createNewEvent } from "../../../../back-end/functions";
import Router from "next/router";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getEvent, updateEventInfo } from "../../../../back-end/functions";

type Props = {};

const EditEvent = (props: Props) => {
  const [encImg, setEncImg] = useState(null);
  const [oldInfo, setOldInfo] = useState(null);
  const { user, loading } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const setImage = (img) => {
    setEncImg(img);
  };

  const getEventById = async (eventId: string) => {
    const res = await getEvent(eventId);
    console.log("res", res);
    setOldInfo(res);
  };

  useEffect(() => {
    const eventId = router.asPath.split("/")[3];
    if (eventId) {
      console.log("EventId", eventId);
      getEventById(eventId);
    }
  }, [router.asPath]);

  useEffect(() => {
    console.log("oldInfo", oldInfo);
  }, [oldInfo]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: oldInfo ? oldInfo : {},
  });
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
    // {
    //   label: "Question for the viewer (leave empty for none)",
    //   type: "string",
    //   value: "extraInfo",
    // },
  ];

  const createEventSelectFields: SelectInputsProps[] = [
    LocationSelect,
    OfficeSelect,
    EventTypeSelect,
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
    console.log("createEvent", newData, user);
    updateEventInfo(newData);
    Router.push("/events");
  };

  return (
    <div className="page-container form-container">
      <h1 className="page-title">Update Event</h1>

      <Form
        textInputs={createEventInputFields}
        selectInputs={createEventSelectFields}
        onSubmit={handleSubmit(onSubmit)}
        file={setImage}
        register={register}
        // defaultValues={oldInfo}
        errors={errors}
      />
    </div>
  );
};

export default EditEvent;
