import {
  Grid2x2,
  Pizza,
  Car,
  PartyPopper,
  HeartHandshake,
  Computer,
  Gift,
  House,
  DollarSign,
  Briefcase,
} from "lucide-react";

export const TRANSACTION_ROUTES = {
  expense: {
    href: "/transactions/expense",
    dbType: "expense",
    heading: "Add Expense",
    transactionCategories: [
      {
        label: "General",
        value: "general",
        icon: Grid2x2,
        hexColor: "#4F8068",
        bgColor: "bg-[#4F8068]",
      },
      {
        label: "Food",
        value: "food",
        icon: Pizza,
        hexColor: "#222222",
        bgColor: "bg-[#222222]",
      },
      {
        label: "Travel",
        value: "travel",
        icon: Car,
        hexColor: "#F97316",
        bgColor: "bg-[#F97316]",
      },
      {
        label: "Fun",
        value: "entertainment",
        icon: PartyPopper,
        hexColor: "#3B82F6",
        bgColor: "bg-[#3B82F6]",
      },
      {
        label: "Charity",
        value: "charity",
        icon: HeartHandshake,
        hexColor: "#EC4899",
        bgColor: "bg-[#EC4899]",
      },
      {
        label: "Other",
        value: "other",
        icon: Grid2x2,
        hexColor: "#8B5CF6",
        bgColor: "bg-[#8B5CF6]",
      },
    ],
  },
  income: {
    href: "/transactions/income",
    dbType: "income",
    heading: "Add Income",
    transactionCategories: [
      {
        label: "Business",
        value: "business",
        icon: Briefcase,
        hexColor: "#4F8068",
        bgColor: "bg-[#4F8068]",
      },
      {
        label: "Salary",
        value: "salary",
        icon: DollarSign,
        hexColor: "#222222",
        bgColor: "bg-[#222222]",
      },
      {
        label: "Property",
        value: "property",
        icon: House,
        hexColor: "#F97316",
        bgColor: "bg-[#F97316]",
      },
      {
        label: "Freelance",
        value: "Freelance",
        icon: Computer,
        hexColor: "#3B82F6",
        bgColor: "bg-[#3B82F6]",
      },
      {
        label: "Gifts",
        value: "Gifts",
        icon: Gift,
        hexColor: "#EC4899",
        bgColor: "bg-[#EC4899]",
      },
      {
        label: "Other",
        value: "other",
        icon: Grid2x2,
        hexColor: "#8B5CF6",
        bgColor: "bg-[#8B5CF6]",
      },
    ],
  },
} as const;

export type TransactionRoutesType = keyof typeof TRANSACTION_ROUTES;

export type TransactionCategories =
  (typeof TRANSACTION_ROUTES)[TransactionRoutesType]["transactionCategories"];
