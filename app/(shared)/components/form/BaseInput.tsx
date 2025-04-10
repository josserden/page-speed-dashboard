import { Input, InputProps } from '@heroui/react';
import React, { FC } from 'react';

export const BaseInput: FC<InputProps> = ({ ...props }) => {
  return (
    <Input
      className="flex items-center"
      isClearable
      isRequired
      labelPlacement="inside"
      variant="bordered"
      {...props}
    />
  );
};
