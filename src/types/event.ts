// src/types/event.ts
import type { BudgetItem } from "./budgetItem";
export interface EventDtoo {
  eventID: number;
  eventName: string;
  eventDate: string; // ISO string
  userID: number;
  eventTypeID: string;
  totalBudget: number;
  guestCount: number;
  budgetItems ?: BudgetItem[];

}

export interface EventCreateDto {
  eventName: string;
  eventDate: string;
  userID: number;
  eventTypeID: number ;
  totalBudget: number;
  guestCount: number;
}

export interface EventTypeDtoo {
  eventTypeID: number;
  eventTypeName: string;
}