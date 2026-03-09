export interface BudgetItem {
  budgetItemID: number;   // ← camelCase
  eventID: number;
  categoryID: number;     // ← c קטנה!
  plannedAmount: number;  // ← p קטנה!
  actualAmount: number;
  isIgnore: boolean;      // ← i קטנה!
  isLocked: boolean;
  vendorID: number;
  allCategory?: {
    categoryID: number;
    categoryName: string;
  };
}


//   export interface BudgetItemSmallCase {
// budgetItemID   :number;
//      eventID:number;
//     categoryID:number;


//   plannedAmount:number;
//    actualAmount:number;
//   isIgnore:boolean;
//   isLocked:boolean;
//   vendorID:number;
//     allCategory?: {
//       categoryID: number;
//       categoryName: string;
//     };

//   };