export const OfficeSelect = {
  label: "Office",
  value: "office",
  options: [
    { label: "Calgary", value: "Calgary" },
    { label: "Montreal", value: "Montreal" },
    { label: "Ottowa", value: "Ottowa" },
    { label: "Toronto", value: "Toronto" },
    { label: "Vancouver", value: "Vancouver" },
    { label: "Waterloo", value: "Waterloo" },
  ],
  details: {
    required: "Office is required",
  },
};

export const PositionSelect = {
  label: "Position",
  value: "position",
  options: [
    { label: "Developer", value: "Developer" },
    { label: "UI/UX Designer", value: "UI/UX Designer" },
    { label: "Product Manager", value: "Product Manager" },
    { label: "Sales and Marketing", value: "Sales and Marketing" },
    { label: "Other", value: "Other" },
  ],
  details: {
    required: "Position is required",
  },
};

export const EventTypeSelect = {
  label: "Event Type",
  value: "eventType",
  options: [
    {
      value: "Food and Drink",
      label: "Food and Drink",
    },
    {
      value: "Board Games",
      label: "Board Games",
    },
    {
      value: "Video Games",
      label: "Video Games",
    },
    {
      value: "Fitness",
      label: "Fitness",
    },
    {
      value: "Sports",
      label: "Sports",
    },
    {
      value: "Arts",
      label: "Arts",
    },
    {
      value: "Socializing",
      label: "Socializing",
    },
    {
      value: "Music",
      label: "Music",
    },
    {
      value: "Media",
      label: "Media",
    },
    {
      value: "Other",
      label: "Other",
    },
  ],
  details: {
    required: "Event type is required",
  },
};

export const LocationSelect = {
  label: "Location",
  value: "location",
  options: [
    {
      value: "Online",
      label: "Online",
    },
    {
      value: "In Office",
      label: "In Office",
    },
    {
      value: "In Person",
      label: "In Person",
    },
  ],
  details: {
    required: "Location is required",
  },
};
