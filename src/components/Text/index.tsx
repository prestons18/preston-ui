import { cn } from "@/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ElementType, forwardRef, JSX, Ref } from "react";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@/utils/types";

const textStyles = cva("w-full", {
  variants: {
    emphasis: { low: "text-gray-600 font-light" },
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    },
    weight: {
      thin: "font-thin",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      black: "font-black",
    },
    align: { left: "text-left", center: "text-center", right: "text-right" },
    italic: { true: "italic" },
    underline: { true: "underline underline-offset-2" },
  },
  defaultVariants: { size: "base", align: "left" },
});

type TextProps<C extends ElementType> = PolymorphicComponentPropsWithRef<
  C,
  VariantProps<typeof textStyles>
>;

const TextComponent = <C extends ElementType = "span">(
  {
    as,
    align,
    size,
    emphasis,
    italic,
    underline,
    weight,
    className,
    ...props
  }: TextProps<C>,
  ref: Ref<C>
) => {
  const Component = as || "span";
  return (
    <Component
      ref={ref}
      className={cn(
        textStyles({ size, weight, emphasis, italic, underline, align }),
        className
      )}
      {...props}
    />
  );
};

// ✅ Explicitly set `forwardRef` return type
export const Text = forwardRef(TextComponent) as <
  C extends ElementType = "span"
>(
  props: TextProps<C> & { ref?: PolymorphicRef<C> }
) => JSX.Element;
