import React, { ImgHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./Img.module.scss";

export interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  size?: "lg" | "base" | "sm";
  circle?: boolean;
}

export const Image: React.FC<Props> = ({
  size = "base",
  circle = false,
  ...props
}) => {
  const classNames = cn(styles.root, {
    [styles[`size-${size}`]]: size,
    [styles.gradient]: circle,
  });

  return <img loading="lazy" className={classNames} {...props}></img>;
};

export default Image;
