import React, { useState } from 'react';

export const useForm = () => {
  const [password, setPassword] = useState<string>('');
  const [submitted, setSubmitted] = useState<null | Record<string, FormDataEntryValue>>(null);
  const [errors, setErrors] = useState({});

  // Real-time password validation
  const getPasswordError = (value: string) => {
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<
      string,
      FormDataEntryValue
    >;

    // Custom validation checks
    const newErrors: Record<string, FormDataEntryValue> = {};

    // Password validation
    const passwordError = getPasswordError(data.password as string);

    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Username validation
    if (data.name === 'admin') {
      newErrors.name = 'Nice try! Choose a different username';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    if (data.terms !== 'true') {
      setErrors({ terms: 'Please accept the terms' });

      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);
  };

  return {
    errors,
    getPasswordError,
    onSubmit,
    password,
    setErrors,
    setPassword,
    setSubmitted,
    submitted,
  };
};
