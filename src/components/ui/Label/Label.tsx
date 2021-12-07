import React, { LabelHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./Label.module.scss";

interface TagProps extends LabelHTMLAttributes<HTMLLabelElement> {
  status: "success" | "warning" | "info" | "danger";
}

export const Tag: React.FC<TagProps> = ({
  status = "info",
  children,
  ...props
}) => {
  const classNames = cn(
    styles.root,
    {
      [styles[`status-${status}`]]: status,
    },
    styles.status
  );

  return (
    <label className={classNames} label-type="tag" {...props}>
      {children}
    </label>
  );
};

const Label: React.FC<LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  ...props
}) => {
  return (
    <label className={styles.root} {...props}>
      {children}
    </label>
  );
};

export default Label;
