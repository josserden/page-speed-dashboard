import React, { useState } from 'react';

import { addToast } from '@heroui/react';

type ServerAction = (formData: FormData) => Promise<void>;

type ValidationErrors = Record<string, string>;

type ActionProps = {
  action: ServerAction;
};

export const useForm = ({ action }: ActionProps) => {
  const [password, setPassword] = useState<string>('');
  const [submitted, setSubmitted] = useState<null | Record<string, FormDataEntryValue>>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPasswordError = (value: string): null | string => {
    if (value.length < 4) {
      return 'Password must be 4 characters or more';
    }

    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return 'Password needs at least 1 uppercase letter';
    }

    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return 'Password needs at least 1 symbol';
    }

    return null;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as Record<string, FormDataEntryValue>;

    try {
      const newErrors: ValidationErrors = {};

      const passwordValue = formData.get('password') as string;
      const passwordError = getPasswordError(passwordValue);

      if (passwordError) {
        newErrors.password = passwordError;
      }

      if (formData.get('name') === 'admin') {
        newErrors.name = 'Nice try! Choose a different username';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      await action(formData);

      addToast({
        color: 'success',
        description: 'Form submitted successfully!',
        title: 'Success',
      });

      setErrors({});
      setSubmitted(data);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ form: 'An error occurred during form submission' });

      addToast({
        color: 'danger',
        description: errors.form,
        title: 'Error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    errors,
    getPasswordError,
    isLoading,
    onSubmit,
    password,
    setErrors,
    setPassword,
    setSubmitted,
    submitted,
  };
};
