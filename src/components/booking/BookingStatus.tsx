import { Badge } from "@/components/ui";

type BookingStatusType =
  | "confirmed"
  | "checked-in"
  | "checked-out"
  | "cancelled"
  | "no-show";

type BookingStatusProps = {
  status: BookingStatusType;
  className?: string;
  size?: "sm" | "md" | "lg";
};

// Map booking statuses to their respective badge variants
const statusConfig: Record<
  BookingStatusType,
  {
    variant: "default" | "primary" | "success" | "warning" | "error" | "info";
    label: string;
  }
> = {
  confirmed: { variant: "primary", label: "Confirmed" },
  "checked-in": { variant: "success", label: "Checked In" },
  "checked-out": { variant: "info", label: "Checked Out" },
  cancelled: { variant: "error", label: "Cancelled" },
  "no-show": { variant: "warning", label: "No Show" },
};

export function BookingStatus({
  status,
  className = "",
  size = "md",
}: BookingStatusProps) {
  const { variant, label } = statusConfig[status];

  return (
    <Badge variant={variant} className={className} size={size}>
      {label}
    </Badge>
  );
}
