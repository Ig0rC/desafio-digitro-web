import {useState} from 'react';

interface IErrors {
  field: string;
  message: string;
}

interface IUseErrors {
  setError(field: string, message: string): void;
  removeError (fieldName: string): void;
  getErrorMessageByFieldName(
    fieldName: string,
  ): string | undefined;
  errors: IErrors[];
}

function useErrors(): IUseErrors {
  const [errors, setErrors] = useState<IErrors[]>([]);

  function setError(field: string, message: string) {
    const errorAlreadyExists = errors.find(error => error.field === field);

    if (errorAlreadyExists) {
      return;
    }

    setErrors(prevState => [...prevState, {field, message}]);
  }

  function removeError(fieldName: string): void {
    setErrors(prevState =>
      prevState.filter(error => error.field !== fieldName),
    );
  }

  function getErrorMessageByFieldName(fieldName: string): string | undefined {
    return errors.find(error => error.field === fieldName)?.message;
  }

  return {
    setError,
    removeError,
    getErrorMessageByFieldName,
    errors,
  };
}

export default useErrors;
