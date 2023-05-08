import { Text as TextRN, TextProps } from "react-native";
import React, { ReactNode } from "react";

type Props = TextProps & {
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "h1" | "h2";
  children: ReactNode;
};

const Text = ({ size, children, ...props }: Props) => {
  const textSize =
    size === "xs"
      ? "text-xs"
      : size === "sm"
      ? "text-sm"
      : size === "lg"
      ? "text-lg"
      : size === "xl"
      ? "text-xl"
      : size === "base"
      ? "text-base"
      : size === "h1"
      ? "text-4xl"
      : size === "h2"
      ? "text-2xl"
      : "";

  return (
    <TextRN className={`${textSize} text-content-400 dark:text-content-150`} {...props}>
      {children}
    </TextRN>
  );
};

export default Text;
