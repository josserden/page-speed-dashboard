import React, { FC } from 'react';

import { Eye, EyeOff, KeyRound } from 'lucide-react';

import { Button, Input, InputProps } from '@heroui/react';

export const PasswordInput: FC<InputProps> = ({ ...props }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      endContent={
        <Button
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          isIconOnly
          onPress={toggleVisibility}
          size="sm"
          variant="light"
        >
          {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
        </Button>
      }
      isRequired
      label="Password"
      labelPlacement="inside"
      name="password"
      placeholder="Enter your password"
      startContent={
        <KeyRound
          className="pointer-events-none flex-shrink-0 text-2xl text-default-400"
          size={20}
        />
      }
      type={isVisible ? 'text' : 'password'}
      variant="bordered"
      {...props}
    />
  );
};
