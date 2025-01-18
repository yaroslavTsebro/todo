import { useState } from "react"; 

type State = [
  enteredValue: string,
  enteredValueIsValid: boolean,
  isTouched: boolean,
  hasError: boolean[],
  valueChangeHandler: React.ChangeEventHandler<HTMLInputElement>,
  inputBlurHandler: React.ChangeEventHandler<HTMLInputElement>,
  reset: Function
];

const useInput = (functions: Function[], initialValue: string = ""): State => {
  const [enteredValue, setEnteredValue] = useState<string>(initialValue); // Initialize with initialValue
  const [valueInputIsTouched, setValueInputIsTouched] =
    useState<boolean>(false);

  const validationResults: boolean[] = functions.map((func) =>
    Boolean(func(enteredValue))
  );
  const enteredValueIsValid = !validationResults.includes(false);

  const valueChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (): void => {
    setValueInputIsTouched(true);
  };

  const reset = (): void => {
    setValueInputIsTouched(false);
    setEnteredValue(initialValue);
  };

  return [
    enteredValue,
    enteredValueIsValid,
    valueInputIsTouched,
    validationResults,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  ];
};

export default useInput;
