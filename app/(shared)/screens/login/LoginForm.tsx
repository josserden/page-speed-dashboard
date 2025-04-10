'use client';

import { Button, Form } from '@heroui/react';
import { Mail } from 'lucide-react';
import React, { FC } from 'react';

import { BaseInput } from '@/app/(shared)/components/form/BaseInput';
import { PasswordInput } from '@/app/(shared)/components/form/PasswordInput';
import { useForm } from '@/app/(shared)/screens/login/hooks/useForm';
import { login } from '@/app/(shared)/utils/supabase/actions';

export const LoginForm: FC = () => {
  const { errors, getPasswordError, isLoading, onSubmit, password, setPassword, setSubmitted } =
    useForm({ action: login });

  return (
    <Form
      className="w-full items-center justify-center space-y-4"
      onReset={() => setSubmitted(null)}
      onSubmit={onSubmit}
      validationErrors={errors}
    >
      <BaseInput
        errorMessage={({ validationDetails }) => {
          if (validationDetails.valueMissing) {
            return 'Please enter your email';
          }
          if (validationDetails.typeMismatch) {
            return 'Please enter a valid email address';
          }
        }}
        label="Email"
        name="email"
        placeholder="Enter your email"
        startContent={
          <Mail className="pointer-events-none flex-shrink-0 text-2xl text-default-400" size={20} />
        }
        type="email"
      />

      <PasswordInput
        errorMessage={getPasswordError(password)}
        onValueChange={setPassword}
        value={password}
      />

      <div className="flex w-full gap-4">
        <Button className="w-full" color="primary" isLoading={isLoading} type="submit">
          Submit
        </Button>

        <Button isDisabled={isLoading} type="reset" variant="bordered">
          Reset
        </Button>
      </div>
    </Form>
  );
};
