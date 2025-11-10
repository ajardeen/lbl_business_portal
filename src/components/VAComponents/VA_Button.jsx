import React from "react";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

function VA_Button({
  children,
  loading = false,
  icon = null,
  iconPosition = "left",
  disabled = false,
  onClick,
  ...props
}) {
  const loadingIcon = <Loader className="animate-spin" />;

  // Ensure children render safely
  const safeChildren = React.Children.toArray(children);

  const renderContent = () => {
    const iconElement = loading ? loadingIcon : icon;

    if (iconPosition === "right") {
      return (
        <>
          {safeChildren}
          {iconElement && <span>{iconElement}</span>}
        </>
      );
    }

    // Default: icon on left
    return (
      <>
        {iconElement && <span>{iconElement}</span>}
        {safeChildren}
      </>
    );
  };

  // Handle click safely (prevent clicks while loading)
  const handleClick = (event) => {
    if (loading || disabled) {
      event.preventDefault();
      return;
    }
    if (typeof onClick === "function") {
      onClick(event);
    }
  };

  try {
    return (
      <Button
        {...props}
        disabled={loading || disabled}
        onClick={handleClick}
      >
        {renderContent()}
      </Button>
    );
  } catch (error) {
    console.error("VA_Button render error:", error);
    return (
      <Button variant="destructive" disabled>
        ⚠️ Button Error
      </Button>
    );
  }
}

VA_Button.propTypes = {
  /** Text or elements inside the button */
  children: PropTypes.node.isRequired,

  /** Whether to show a loading spinner */
  loading: PropTypes.bool,

  /** Optional icon component (e.g. <Plus />) */
  icon: PropTypes.node,

  /** Icon position: "left" | "right" */
  iconPosition: PropTypes.oneOf(["left", "right"]),

  /** Disable button interaction */
  disabled: PropTypes.bool,

  /** Click event handler */
  onClick: PropTypes.func,

  /** ShadCN button props */
  variant: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
};

export default VA_Button;
