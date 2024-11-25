import React, { useState } from 'react';
import { Eye, EyeOff, Mail, User, Lock } from 'lucide-react';

interface AuthInputProps {
  type: 'text' | 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({ type, placeholder, value, onChange, name }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const getIcon = () => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5 text-gray-400" />;
      case 'password':
        return <Lock className="w-5 h-5 text-gray-400" />;
      default:
        return <User className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="relative mb-6">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        {getIcon()}
      </div>
      <input
        type={showPassword ? 'text' : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-12 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:border-fuchsia-500"
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-gray-400" />
          ) : (
            <Eye className="w-5 h-5 text-gray-400" />
          )}
        </button>
      )}
    </div>
  );
};