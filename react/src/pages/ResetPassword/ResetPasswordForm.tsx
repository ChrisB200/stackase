import Form from "@/components/ui/form/Form";
import type { ButtonGroup, FieldGroup } from "@/types/form";
import type { ComponentProps } from "react";

interface FormProps extends ComponentProps<"div"> {
  handleSubmit: () => void;
}

function ResetPasswordForm({ handleSubmit }: FormProps) {
  const fields: FieldGroup[] = [
    {
      element: "input",
      name: "password",
      label: "Password",
      placeholder: "Your password",
    },
    {
      element: "input",
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Confirm password",
    },
  ];

  const buttons: ButtonGroup[] = [
    [
      {
        type: "button",
        text: "Back",
        variant: "secondary",
      },
      {
        type: "submit",
        text: "Reset",
        variant: "accent",
      },
    ],
  ];

  return (
    <Form
      variant="ghost"
      name="reset-password"
      title="Reset password"
      fields={fields}
      buttons={buttons}
      handleSubmit={handleSubmit}
    />
  );
}

export default ResetPasswordForm;
