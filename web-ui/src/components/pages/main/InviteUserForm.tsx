import React, { useState } from 'react';
import Button from '../../UI/Button';
import Dropdown from '../../UI/Dropdown';
import TextInput from '../../UI/TextInput';
import { InviteUserDtoRoleEnum } from '../../../openapi';


interface InviteUserFormProps {
  onSubmit: (email: string, role: InviteUserDtoRoleEnum) => Promise<void>;
}

const InviteUserForm: React.FC<InviteUserFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<InviteUserDtoRoleEnum>(InviteUserDtoRoleEnum.Viewer);

  const handleSubmit = () => {
    onSubmit(email, role);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Invite User</h2>
      <TextInput
        id="email"
        label="Email"
        type="email"
        validations={[{ validator: (value) => /\S+@\S+\.\S+/.test(value), message: 'Invalid email' }]}
        onValidChange={(value) => setEmail(value)}
      />
      <Dropdown
        id="role"
        label="Role"
        optionsEnum={InviteUserDtoRoleEnum}
        selected={role}
        onChange={(value) => setRole(value as InviteUserDtoRoleEnum)}
      />
      <Button text="Invite" onClick={handleSubmit} />
    </div>
  );
};

export default InviteUserForm;
