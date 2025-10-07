import useForm from "@/hooks/useForm";
import type { FormProps } from "@/types/form";
import FormDialog from "./FormDialog";
import FormCard from "./FormCard";
import FormGhost from "./FormGhost";
import ErrorAlertDialog from "@/components/ErrorAlertDialog";
import { useEffect } from "react";

function Form(props: FormProps) {
  const { getError, setError, reset } = useForm(props.name);

  useEffect(() => {
    if (props.refreshes) reset();
  }, []);

  return (
    <>
      <ErrorAlertDialog error={getError()} setError={setError} />
      {props.variant === "card" && <FormCard {...props} />}
      {props.variant === "ghost" && <FormGhost {...props} />}
      {props.variant === "dialog" && <FormDialog {...props} />}
    </>
  );
}

export default Form;
