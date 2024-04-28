import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircle,
  CircleIcon,
  CircleX,
  Clock,
} from "lucide-react";

export const statuses = [
  {
    value: "pending",
    label: "Pending",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Clock,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleX,
  },
];

export const priorities = [
  {
    value: "low",
    label: "Low",
    icon: ArrowDownIcon,
  },
  {
    value: "medium",
    label: "Medium",
    icon: ArrowRightIcon,
  },
  {
    value: "high",
    label: "High",
    icon: ArrowUpIcon,
  },
];
