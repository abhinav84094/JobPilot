import { Loader2 } from "lucide-react";

const VARIANT_CLASSES = {
  primary:
    "bg-violet-600 text-white hover:bg-violet-700 disabled:hover:bg-violet-600",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 disabled:hover:bg-neutral-100",
  outline:
    "bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 disabled:hover:bg-white disabled:hover:border-neutral-200",
  ghost:
    "bg-transparent text-neutral-600 hover:bg-neutral-100 disabled:hover:bg-transparent",
  danger:
    "bg-red-600 text-white hover:bg-red-700 disabled:hover:bg-red-600",
};

const SIZE_CLASSES = {
  sm: "text-xs px-3 py-1.5 gap-1.5 rounded-lg",
  md: "text-sm px-4 py-2 gap-2 rounded-lg",
  lg: "text-sm px-5 py-2.5 gap-2 rounded-xl",
};

/**
 * Unified button component — Phase 1 of the design system.
 *
 * <Button variant="primary" size="md" loading={isSaving} icon={Send}>
 *   Send
 * </Button>
 *
 * variant: primary | secondary | outline | ghost | danger
 * size:    sm | md | lg
 * loading: shows a spinner and disables the button, keeping its width stable
 * icon:    optional lucide-react icon component, rendered before children
 * fullWidth: stretches to 100% of the parent
 *
 * Any other prop (onClick, type, href via "as", etc.) passes through.
 */
export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  as: As = "button",
  className = "",
  children,
  ...props
}) {
  const isDisabled = disabled || loading;

  const classes = [
    "inline-flex items-center justify-center font-medium",
    "transition-colors duration-base ease-out",
    "focus-ring",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <As className={classes} disabled={As === "button" ? isDisabled : undefined} {...props}>
      {loading ? (
        <Loader2 size={size === "sm" ? 13 : 15} className="animate-spin" />
      ) : (
        Icon && <Icon size={size === "sm" ? 13 : 15} />
      )}
      {children}
    </As>
  );
}
