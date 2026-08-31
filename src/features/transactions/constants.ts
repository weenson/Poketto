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
        color: "bg-[#4F8068]",
      },
      {
        label: "Food",
        value: "food",
        icon: Pizza,
        color: "bg-[#222222]",
      },
      {
        label: "Transport",
        value: "transportation",
        icon: Car,
        color: "bg-[#F97316]",
      },
      {
        label: "Fun",
        value: "entertainment",
        icon: PartyPopper,
        color: "bg-[#3B82F6]",
      },
      {
        label: "Charity",
        value: "charity",
        icon: HeartHandshake,
        color: "bg-[#EC4899]",
      },
      {
        label: "Other",
        value: "other",
        icon: Grid2x2,
        color: "bg-[#8B5CF6]",
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
        color: "bg-[#4F8068]",
      },
      {
        label: "Salary",
        value: "salary",
        icon: DollarSign,
        color: "bg-[#222222]",
      },
      {
        label: "Property",
        value: "property",
        icon: House,
        color: "bg-[#F97316]",
      },
      {
        label: "Freelance",
        value: "Freelance",
        icon: Computer,
        color: "bg-[#3B82F6]",
      },
      {
        label: "Gifts",
        value: "Gifts",
        icon: Gift,
        color: "bg-[#EC4899]",
      },
      {
        label: "Other",
        value: "other",
        icon: Grid2x2,
        color: "bg-[#8B5CF6]",
      },
    ],
  },
} as const;

export type TransactionRoutesType = keyof typeof TRANSACTION_ROUTES;

export type TransactionCategories =
  (typeof TRANSACTION_ROUTES)[TransactionRoutesType]["transactionCategories"];
