type ButtonProps = {
  children: React.ReactNode;
  variant: "primary" | "black";
  size: "lg" | "md" | "sm";
  justify: "center" | "start" | "end";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const variantStyles = {
  primary: "bg-primary text-white hover:bg-primary/90 flex items-center",
  black: "bg-black text-white hover:bg-black/90 flex items-center",
};

const variantSize = {
  lg: "py-6 px-10",
  md: "py-4 px-6",
  sm: "py-3 px-4",
};

const textJustify = {
  center: "justify-center",
  start: "justify-start",
  end: "justify-end",
};

export default function Button({
  children,
  variant,
  size,
  justify,
  disabled,
  type,
}: ButtonProps) {
  const style = `${variantStyles[variant]} ${variantSize[size]} ${textJustify[justify]} rounded-2xl transition-colors cursor-pointer w-full`;

  return (
    <button type={type} disabled={disabled} className={style}>
      {children}
    </button>
  );
}
