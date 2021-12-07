import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./Button.module.scss";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text";
  icon?: boolean;
}

export const Button: React.FC<Props> = ({
  variant = "primary",
  icon = false,
  children,
  ...props
}) => {
  const classNames = cn(styles.root, {
    [styles[variant]]: variant,
    [styles.icon]: icon,
  });

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};

export default Button;
