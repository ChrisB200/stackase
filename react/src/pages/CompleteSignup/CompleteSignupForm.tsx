import Form from "@/components/ui/form/Form";
import type { ButtonGroup, FieldGroup } from "@/types/form";
import type { ComponentProps, FormEvent } from "react";

interface CompleteSignupProps extends ComponentProps<"div"> {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function CompleteSignupForm({ handleSubmit }: CompleteSignupProps) {
  const fields: FieldGroup[] = [
    {
      element: "input",
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Your username",
      required: true,
    },
    {
      element: "input",
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Your name",
      required: true,
    },
  ];

  const buttons: ButtonGroup[] = [
    {
      text: "Submit",
      type: "submit",
      variant: "default",
    },
  ];

  return (
    <Form
      variant="card"
      name="complete-signup"
      title="Profile Details"
      fields={fields}
      buttons={buttons}
      handleSubmit={handleSubmit}
    />
  );
}

export default CompleteSignupForm;
