import { lazy, Suspense, useState } from "react";
import { validator } from "../utils/task-2";
import s from "./ValidatorPage.module.css";

interface LazyJsonViewerProps {
  data: object;
  [key: string]: string | object | number;
}

const LazyJsonViewer = lazy(() =>
  import("react-json-view").then((module) => ({
    default: ({ data, ...props }: LazyJsonViewerProps) => {
      const ReactJson = module.default;
      return <ReactJson src={data} {...props} />;
    },
  }))
);

export const ValidatorPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [validatedValue, setValidatedValue] = useState<object>({});

  const handleValidate = () => {
    const parsedValue = JSON.parse(inputValue);
    const validatedValue = validator(parsedValue);
    setValidatedValue(validatedValue);
    console.log(validatedValue);
  };

  return (
    <div className={s.validatorPageContainer}>
      <h1>Validator</h1>
      <textarea
        className={s.textarea}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleValidate} className={s.button}>
        Validate
      </button>
      <p>Result:</p>
      <Suspense fallback={<div>Loading JSON viewer...</div>}>
        <div className={s.jsonViewerContainer}>
          <LazyJsonViewer
            data={validatedValue}
            theme="monokai"
            collapsed={1}
          />
        </div>
      </Suspense>
    </div>
  );
};
