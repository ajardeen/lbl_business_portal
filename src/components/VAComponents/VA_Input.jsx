import React, { useState } from "react";
import PropTypes from "prop-types";
import { Loader, Eye, EyeOff } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

/**
 * VA_Input — wrapped inside ShadCN ButtonGroup layout
 * Supports password reveal toggle via Eye icon
 */
export default function VA_Input({
  type = "text",
  value,
  onChange,
  placeholder = "Enter text...",
  icon = null,
  iconPosition = "left",
  onClickIcon,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const displayType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <InputGroup className="w-full overflow-hidden">
      {/* Left Icon */}
      {icon && iconPosition === "left" && (
        <InputGroupAddon
          variant="outline"
          onClick={onClickIcon}
          disabled={disabled || loading}
        >
          {icon}
        </InputGroupAddon>
      )}

      {/* Input */}
      <InputGroupInput
        type={displayType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled || loading}
        className={`border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none shadow-none w-full hide-password-toggle ${className}`}
        {...props}
      />

      {/* Right Side Controls */}

      {/* Loader or Right Icon */}
      {loading && (
        <InputGroupAddon  align="inline-end" variant="outline" disabled>
          <Loader className="animate-spin" />
        </InputGroupAddon>
      )}

      {/* Password reveal toggle */}
      {isPasswordField && !loading && (
        <InputGroupAddon
          align="inline-end"
          className={"cursor-pointer"}
          variant="outline"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </InputGroupAddon>
      )}

      {/* Optional custom right icon */}
      {!isPasswordField && iconPosition === "right" && !loading && (
        <InputGroupAddon
          align="inline-end"
          variant="outline"
          onClick={onClickIcon}
          disabled={disabled || loading}
        >
          {icon}
        </InputGroupAddon>
      )}

      {/* Hide default browser password reveal button */}
      <style>{`
        .hide-password-toggle::-ms-reveal,
        .hide-password-toggle::-ms-clear {
          visibility: hidden;
          pointer-events: none;
          display: none;
          border-radius:inherit
        }
      `}</style>
    </InputGroup>
  );
}

VA_Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  onClickIcon: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
