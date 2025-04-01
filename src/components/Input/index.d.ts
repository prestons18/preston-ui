import { VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
declare const inputStyles: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
type InputProps = ComponentProps<"input"> & VariantProps<typeof inputStyles>;
export declare const Input: import("react").ForwardRefExoticComponent<Omit<InputProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
export {};
