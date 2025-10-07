import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import FormContent from "./FormContent";
import type { FormGhostProps } from "@/types/form";

function FormGhost({
  className,
  title,
  description,
  secondaryButton,
  handleSubmit,
  name,
  showSeparator,
  fields,
  bottomText,
  buttons,
  schema,
}: FormGhostProps) {
  return (
    <Card className={cn(className, "bg-transparent border-none shadow-none")}>
      <CardHeader>
        <CardTitle className="text-left text-3xl font-bold">{title}</CardTitle>
        {description && (
          <CardDescription className="text-lg">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <FormContent
          name={name}
          handleSubmit={handleSubmit}
          secondaryButton={secondaryButton}
          showSeparator={showSeparator}
          fields={fields}
          bottomText={bottomText}
          buttons={buttons}
          schema={schema}
        />
      </CardContent>
    </Card>
  );
}

export default FormGhost;
