import * as css from "./styles.module.css";

type Props = {
  message: string;
  hasError?: boolean;
};

/** Just a small container to display some information for the user in a friendly way */
export const InfoBox = ({ message, hasError = false }: Props) => {
  return (
    <section
      role="alert"
      className={css.box}
      data-error={hasError ? "true" : "false"}
    >
      {message}
    </section>
  );
};
