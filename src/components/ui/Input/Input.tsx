import cn from "classnames";
import React, { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  prefix?: any;
  suffix?: any;
  disabled?: boolean;
  outlined?: boolean;
}

export const Input: React.FC<Props> = ({
  className,
  prefix,
  suffix,
  outlined = false,
  disabled,
  ...props
}) => {
  const classNames = cn(
    styles.input,
    {
      [styles.disabled]: disabled,
      [styles.outlined]: outlined,
    },
    className
  );

  return (
    <div className={classNames}>
      {prefix}
      <input disabled={disabled} {...props} />
      {suffix}
    </div>
  );
};

export default Input;
