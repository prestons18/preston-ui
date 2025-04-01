import { VariantProps } from "class-variance-authority";
import { ElementType, JSX } from "react";
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from "@/utils/types";
declare const textStyles: (props?: ({
    emphasis?: "low" | null | undefined;
    size?: "sm" | "lg" | "base" | "2xl" | "3xl" | null | undefined;
    weight?: "bold" | "thin" | "normal" | "medium" | "semibold" | "black" | null | undefined;
    align?: "center" | "left" | "right" | null | undefined;
    italic?: boolean | null | undefined;
    underline?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type TextProps<C extends ElementType> = PolymorphicComponentPropsWithRef<C, VariantProps<typeof textStyles>>;
export declare const Text: <C extends ElementType = "span">(props: TextProps<C> & {
    ref?: PolymorphicRef<C>;
}) => JSX.Element;
export {};
