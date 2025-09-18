import { Link } from "react-router-dom";
import Form from "@/components/ui/form/Form";
import type { FieldGroup, ButtonGroup } from "@/types/form";
import type { Category } from "@/types/categories";

interface RoomCreationProps extends React.ComponentProps<"div"> {
  handleSubmit: () => void;
  options: Category[];
}

export function RoomCreationForm({
  handleSubmit,
  options,
  className,
  ...rest
}: RoomCreationProps) {
  const selectOptions = options.map((option: Category) => {
    return {
      value: option.id,
      label: option.name,
    };
  });

  const fields: FieldGroup[] = [
    {
      element: "input",
      name: "topic",
      label: "Topic Title",
      type: "text",
      placeholder: "Is homework useless?",
      required: true,
    },
    {
      element: "select",
      name: "categoryId",
      label: "Category",
      options: selectOptions,
      placeholder: "Select a category",
      required: true,
    },
  ];

  const buttons: ButtonGroup[] = [
    {
      text: "submit",
      type: "submit",
      variant: "default",
    },
  ];

  return (
    <Form
      variant="card"
      name="create-room"
      title="Create a room"
      fields={fields}
      buttons={buttons}
      handleSubmit={handleSubmit}
      showSeparator
      className={className}
      {...rest}
    />
  );
}

export default RoomCreationForm;
