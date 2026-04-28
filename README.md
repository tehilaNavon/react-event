# 🎉 Smart Event Budget Planner

A comprehensive event planning application that intelligently manages budgets, vendor selection, and task tracking — all in one streamlined flow.

---

## Overview

Smart Event Budget Planner guides users through the entire event planning process: from setting a total budget, to intelligently distributing it across categories, selecting vendors, and managing post-selection tasks. The system adapts dynamically to the event's scale, ensuring a realistic and coherent planning experience.

---

### Database Setup (SQL Server)

1. Open **SQL Server Management Studio (SSMS)**.
2. Connect to your local server.
3. Locate the provided `.sql` script in the project folder.
4. Open the script in SSMS and click **Execute**. This will create the `EventDB` database and populate it with initial data.

### Backend Setup (C# / .NET)

1. Navigate to the Backend folder.
2. Open the `EventMaster` file .
3. Ensure the connection string in `OnConfiguring` matches your local SQL instance:
   ```csharp
   protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
   {
       // Choose the one that fits your setup:
       optionsBuilder.UseSqlServer("server=.;database=EventDB;trusted_connection=true;TrustServerCertificate=True");
   }

---

### Prerequisites

- [Node.js]
- npm v9+ (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/smart-event-budget-planner.git===============================================================================
cd smart-event-budget-planner

# 2. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_API_BASE_URL=http://localhost:5000/api===========================================================================================
```

> Replace the URL with your backend's address. All API calls (event loading, vendor fetching, auth) depend on this variable.

### Running the App

1. Open the terminal inside your **C# backend project** and make sure the backend is running
2. Open a **new terminal** and navigate to the React project folder:

```bash
cd path/to/react-project
```

3. Run the development server:

```bash
npm run dev
```

4. Copy the local URL printed in the terminal (e.g. `http://localhost:5173`) and open it in **Chrome**

> ⚠️ The C# backend must be running before launching the React app, otherwise API calls will fail.

---

## Core Features

### 1. Event Creation & Budget Setup

The user begins by creating a new event and entering a total budget. This is the foundation of the entire planning flow. Based on the budget amount, the system determines which  categories and features are relevant to display.

> **Scale-aware categories:** Low-budget events will not display prestigious categories such as fireworks.

---

### 2. Smart Budget Allocation

Once the budget is defined, the system performs an **automatic initial distribution** across relevant categories (e.g., venue, catering, photography, entertainment, decorations, etc.).

- Each category receives a suggested allocation amount.
- Categories displayed are filtered based on budget size — ensuring the suggestions are always practical and proportional.
- Users can adjust individual category budgets using a **slider**, and the system automatically redistributes the remaining budget across other categories to maintain balance.

> **Dynamic rebalancing:** Increasing the budget for one category (e.g., the photographer) will proportionally reduce the suggested amounts for the remaining categories, keeping the total within budget at all times.

---

### 3. Vendor Selection Page

After confirming the budget allocation, users proceed to the **vendor selection screen**. This screen displays all available vendors for each category.

Key behaviors:
- Each vendor is shown alongside the **planned budget** for that category.
- Vendors whose prices **exceed the planned budget** for a category are **locked and unselectable**, preventing overspending.
- Once a vendor is selected:
  - The **budget slider for that category is locked** — no further changes can be made to that category's budget.
  - The **remaining overall budget** is updated in real time to reflect the commitment.

This ensures that once a financial decision is made, the plan remains consistent and coherent.

---

### 4. Task Management Per Vendor

After selecting a vendor, the system **automatically generates a set of specific tasks** relevant to that vendor and the event type.

Each task includes:
- A **title** describing the action required
- A **priority level**: Low / Medium / High
- A default **due date** or timeline suggestion (where applicable)

Users can also:
- **Add custom tasks** manually based on their personal preferences or special requirements
- Edit or remove existing tasks as needed

This feature ensures that after vendor selection, users have a clear and actionable checklist to follow through on each vendor relationship.

---

## User Flow Summary

```
Create Event & Set Total Budget
        ↓
Smart Budget Allocation (auto-distributed by category, scale-aware)
        ↓
Adjust Sliders (dynamic rebalancing across categories)
        ↓
Vendor Selection (locked if over budget; locks slider on selection)
        ↓
Auto-Generated Task List per Vendor (with priority levels)
        ↓
Add Custom Tasks as Needed
```

---

## Design Principles

- **Budget integrity:** The total budget is always respected. No combination of choices can exceed it.
- **Progressive locking:** Confirmed decisions (vendor selections) cannot be undone via slider changes, preserving data consistency.
- **Scale-aware UX:** The interface adapts to the event's financial scope.
- **Actionability:** Every vendor selection immediately produces a concrete task list, bridging planning and execution.

---

## Tech Stack

### Frontend
|       Tool          |                      Role                     |
|---------------------|-----------------------------------------------|
| **React**           | UI framework                                  |
| **TypeScript**      | Static typing across all components and state |
| **React Router v6** | Client-side routing with dynamic segments (e.g. `/events/:eventId/vendors`) |
| **Redux Toolkit**   | Global state management (event, budgets, vendors, auth) |


# 🎉 Smart Event Budget Planner

A comprehensive event planning application that intelligently manages budgets, vendor selection, and task tracking — all in one streamlined flow.

---

## Overview

Smart Event Budget Planner guides users through the entire event planning process: from setting a total budget, to intelligently distributing it across categories, selecting vendors, and managing post-selection tasks. The system adapts dynamically to the event's scale, ensuring a realistic and coherent planning experience.

---

### Database Setup (SQL Server)

1. Open **SQL Server Management Studio (SSMS)**.
2. Connect to your local server.
3. Locate the provided `.sql` script in the project folder.
4. Open the script in SSMS and click **Execute**. This will create the `EventDB` database and populate it with initial data.

### Backend Setup (C# / .NET)

1. Navigate to the Backend folder.
2. Open the `EventMaster` file .
3. Ensure the connection string in `OnConfiguring` matches your local SQL instance:
   ```csharp
   protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
   {
       // Choose the one that fits your setup:
       optionsBuilder.UseSqlServer("server=.;database=EventDB;trusted_connection=true;TrustServerCertificate=True");
   }

---

### Prerequisites

- [Node.js]
- npm v9+ (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/smart-event-budget-planner.git===============================================================================
cd smart-event-budget-planner

# 2. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_API_BASE_URL=http://localhost:5000/api===========================================================================================
```

> Replace the URL with your backend's address. All API calls (event loading, vendor fetching, auth) depend on this variable.

### Running the App

1. Open the terminal inside your **C# backend project** and make sure the backend is running
2. Open a **new terminal** and navigate to the React project folder:

```bash
cd path/to/react-project
```

3. Run the development server:

```bash
npm run dev
```

4. Copy the local URL printed in the terminal (e.g. `http://localhost:5173`) and open it in **Chrome**

> ⚠️ The C# backend must be running before launching the React app, otherwise API calls will fail.

---

## Core Features

### 1. Event Creation & Budget Setup

The user begins by creating a new event and entering a total budget. This is the foundation of the entire planning flow. Based on the budget amount, the system determines which  categories and features are relevant to display.

> **Scale-aware categories:** Low-budget events will not display prestigious categories such as fireworks.

---

### 2. Smart Budget Allocation

Once the budget is defined, the system performs an **automatic initial distribution** across relevant categories (e.g., venue, catering, photography, entertainment, decorations, etc.).

- Each category receives a suggested allocation amount.
- Categories displayed are filtered based on budget size — ensuring the suggestions are always practical and proportional.
- Users can adjust individual category budgets using a **slider**, and the system automatically redistributes the remaining budget across other categories to maintain balance.

> **Dynamic rebalancing:** Increasing the budget for one category (e.g., the photographer) will proportionally reduce the suggested amounts for the remaining categories, keeping the total within budget at all times.

---

### 3. Vendor Selection Page

After confirming the budget allocation, users proceed to the **vendor selection screen**. This screen displays all available vendors for each category.

Key behaviors:
- Each vendor is shown alongside the **planned budget** for that category.
- Vendors whose prices **exceed the planned budget** for a category are **locked and unselectable**, preventing overspending.
- Once a vendor is selected:
  - The **budget slider for that category is locked** — no further changes can be made to that category's budget.
  - The **remaining overall budget** is updated in real time to reflect the commitment.

This ensures that once a financial decision is made, the plan remains consistent and coherent.

---

### 4. Task Management Per Vendor

After selecting a vendor, the system **automatically generates a set of specific tasks** relevant to that vendor and the event type.

Each task includes:
- A **title** describing the action required
- A **priority level**: Low / Medium / High
- A default **due date** or timeline suggestion (where applicable)

Users can also:
- **Add custom tasks** manually based on their personal preferences or special requirements
- Edit or remove existing tasks as needed

This feature ensures that after vendor selection, users have a clear and actionable checklist to follow through on each vendor relationship.

---

## User Flow Summary

```
Create Event & Set Total Budget
        ↓
Smart Budget Allocation (auto-distributed by category, scale-aware)
        ↓
Adjust Sliders (dynamic rebalancing across categories)
        ↓
Vendor Selection (locked if over budget; locks slider on selection)
        ↓
Auto-Generated Task List per Vendor (with priority levels)
        ↓
Add Custom Tasks as Needed
```

---

## Design Principles

- **Budget integrity:** The total budget is always respected. No combination of choices can exceed it.
- **Progressive locking:** Confirmed decisions (vendor selections) cannot be undone via slider changes, preserving data consistency.
- **Scale-aware UX:** The interface adapts to the event's financial scope.
- **Actionability:** Every vendor selection immediately produces a concrete task list, bridging planning and execution.

---

## Tech Stack

### Frontend
|       Tool          |                      Role                     |
|---------------------|-----------------------------------------------|
| **React**           | UI framework                                  |
| **TypeScript**      | Static typing across all components and state |
| **React Router v6** | Client-side routing with dynamic segments (e.g. `/events/:eventId/vendors`) |
| **Redux Toolkit**   | Global state management (event, budgets, vendors, auth) |











# 🎉 Smart Event Budget Planner

A comprehensive event planning application that intelligently manages budgets, vendor selection, and task tracking — all in one streamlined flow.

---

## Overview

Smart Event Budget Planner guides users through the entire event planning process: from setting a total budget, to intelligently distributing it across categories, selecting vendors, and managing post-selection tasks. The system adapts dynamically to the event's scale, ensuring a realistic and coherent planning experience.

---

### Database Setup (SQL Server)

1. Open **SQL Server Management Studio (SSMS)**.
2. Connect to your local server.
3. Locate the provided `.sql` script in the project folder.
4. Open the script in SSMS and click **Execute**. This will create the `EventDB` database and populate it with initial data.

### Backend Setup (C# / .NET)

1. Navigate to the Backend folder.
2. Open the `EventMaster` file .
3. Ensure the connection string in `OnConfiguring` matches your local SQL instance:
   ```csharp
   protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
   {
       // Choose the one that fits your setup:
       optionsBuilder.UseSqlServer("server=.;database=EventDB;trusted_connection=true;TrustServerCertificate=True");
   }

---

### Prerequisites

- [Node.js]
- npm v9+ (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/smart-event-budget-planner.git===============================================================================
cd smart-event-budget-planner

# 2. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_API_BASE_URL=http://localhost:5000/api===========================================================================================
```

> Replace the URL with your backend's address. All API calls (event loading, vendor fetching, auth) depend on this variable.

### Running the App

1. Open the terminal inside your **C# backend project** and make sure the backend is running
2. Open a **new terminal** and navigate to the React project folder:

```bash
cd path/to/react-project
```

3. Run the development server:

```bash
npm run dev
```

4. Copy the local URL printed in the terminal (e.g. `http://localhost:5173`) and open it in **Chrome**

> ⚠️ The C# backend must be running before launching the React app, otherwise API calls will fail.

---

## Core Features

### 1. Event Creation & Budget Setup

The user begins by creating a new event and entering a total budget. This is the foundation of the entire planning flow. Based on the budget amount, the system determines which  categories and features are relevant to display.

> **Scale-aware categories:** Low-budget events will not display prestigious categories such as fireworks.

---

### 2. Smart Budget Allocation

Once the budget is defined, the system performs an **automatic initial distribution** across relevant categories (e.g., venue, catering, photography, entertainment, decorations, etc.).

- Each category receives a suggested allocation amount.
- Categories displayed are filtered based on budget size — ensuring the suggestions are always practical and proportional.
- Users can adjust individual category budgets using a **slider**, and the system automatically redistributes the remaining budget across other categories to maintain balance.

> **Dynamic rebalancing:** Increasing the budget for one category (e.g., the photographer) will proportionally reduce the suggested amounts for the remaining categories, keeping the total within budget at all times.

---

### 3. Vendor Selection Page

After confirming the budget allocation, users proceed to the **vendor selection screen**. This screen displays all available vendors for each category.

Key behaviors:
- Each vendor is shown alongside the **planned budget** for that category.
- Vendors whose prices **exceed the planned budget** for a category are **locked and unselectable**, preventing overspending.
- Once a vendor is selected:
  - The **budget slider for that category is locked** — no further changes can be made to that category's budget.
  - The **remaining overall budget** is updated in real time to reflect the commitment.

This ensures that once a financial decision is made, the plan remains consistent and coherent.

---

### 4. Task Management Per Vendor

After selecting a vendor, the system **automatically generates a set of specific tasks** relevant to that vendor and the event type.

Each task includes:
- A **title** describing the action required
- A **priority level**: Low / Medium / High
- A default **due date** or timeline suggestion (where applicable)

Users can also:
- **Add custom tasks** manually based on their personal preferences or special requirements
- Edit or remove existing tasks as needed

This feature ensures that after vendor selection, users have a clear and actionable checklist to follow through on each vendor relationship.

---

## User Flow Summary

```
Create Event & Set Total Budget
        ↓
Smart Budget Allocation (auto-distributed by category, scale-aware)
        ↓
Adjust Sliders (dynamic rebalancing across categories)
        ↓
Vendor Selection (locked if over budget; locks slider on selection)
        ↓
Auto-Generated Task List per Vendor (with priority levels)
        ↓
Add Custom Tasks as Needed
```

---

## Design Principles

- **Budget integrity:** The total budget is always respected. No combination of choices can exceed it.
- **Progressive locking:** Confirmed decisions (vendor selections) cannot be undone via slider changes, preserving data consistency.
- **Scale-aware UX:** The interface adapts to the event's financial scope.
- **Actionability:** Every vendor selection immediately produces a concrete task list, bridging planning and execution.

---

## Tech Stack

### Frontend
|       Tool          |                      Role                     |
|---------------------|-----------------------------------------------|
| **React**           | UI framework                                  |
| **TypeScript**      | Static typing across all components and state |
| **React Router v6** | Client-side routing with dynamic segments (e.g. `/events/:eventId/vendors`) |
| **Redux Toolkit**   | Global state management (event, budgets, vendors, auth) |

# 🎉 Smart Event Budget Planner

A comprehensive event planning application that intelligently manages budgets, vendor selection, and task tracking — all in one streamlined flow.

---

## Overview

Smart Event Budget Planner guides users through the entire event planning process: from setting a total budget, to intelligently distributing it across categories, selecting vendors, and managing post-selection tasks. The system adapts dynamically to the event's scale, ensuring a realistic and coherent planning experience.

---

### Database Setup (SQL Server)

1. Open **SQL Server Management Studio (SSMS)**.
2. Connect to your local server.
3. Locate the provided `.sql` script in the project folder.
4. Open the script in SSMS and click **Execute**. This will create the `EventDB` database and populate it with initial data.

### Backend Setup (C# / .NET)

1. Navigate to the Backend folder.
2. Open the `EventMaster` file .
3. Ensure the connection string in `OnConfiguring` matches your local SQL instance:
   ```csharp
   protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
   {
       // Choose the one that fits your setup:
       optionsBuilder.UseSqlServer("server=.;database=EventDB;trusted_connection=true;TrustServerCertificate=True");
   }

---

### Prerequisites

- [Node.js]
- npm v9+ (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/smart-event-budget-planner.git===============================================================================
cd smart-event-budget-planner

# 2. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_API_BASE_URL=http://localhost:5000/api===========================================================================================
```

> Replace the URL with your backend's address. All API calls (event loading, vendor fetching, auth) depend on this variable.

### Running the App

1. Open the terminal inside your **C# backend project** and make sure the backend is running
2. Open a **new terminal** and navigate to the React project folder:

```bash
cd path/to/react-project
```

3. Run the development server:

```bash
npm run dev
```

4. Copy the local URL printed in the terminal (e.g. `http://localhost:5173`) and open it in **Chrome**

> ⚠️ The C# backend must be running before launching the React app, otherwise API calls will fail.

---

## Core Features

### 1. Event Creation & Budget Setup

The user begins by creating a new event and entering a total budget. This is the foundation of the entire planning flow. Based on the budget amount, the system determines which  categories and features are relevant to display.

> **Scale-aware categories:** Low-budget events will not display prestigious categories such as fireworks.

---

### 2. Smart Budget Allocation

Once the budget is defined, the system performs an **automatic initial distribution** across relevant categories (e.g., venue, catering, photography, entertainment, decorations, etc.).

- Each category receives a suggested allocation amount.
- Categories displayed are filtered based on budget size — ensuring the suggestions are always practical and proportional.
- Users can adjust individual category budgets using a **slider**, and the system automatically redistributes the remaining budget across other categories to maintain balance.

> **Dynamic rebalancing:** Increasing the budget for one category (e.g., the photographer) will proportionally reduce the suggested amounts for the remaining categories, keeping the total within budget at all times.

---

### 3. Vendor Selection Page

After confirming the budget allocation, users proceed to the **vendor selection screen**. This screen displays all available vendors for each category.

Key behaviors:
- Each vendor is shown alongside the **planned budget** for that category.
- Vendors whose prices **exceed the planned budget** for a category are **locked and unselectable**, preventing overspending.
- Once a vendor is selected:
  - The **budget slider for that category is locked** — no further changes can be made to that category's budget.
  - The **remaining overall budget** is updated in real time to reflect the commitment.

This ensures that once a financial decision is made, the plan remains consistent and coherent.

---

### 4. Task Management Per Vendor

After selecting a vendor, the system **automatically generates a set of specific tasks** relevant to that vendor and the event type.

Each task includes:
- A **title** describing the action required
- A **priority level**: Low / Medium / High
- A default **due date** or timeline suggestion (where applicable)

Users can also:
- **Add custom tasks** manually based on their personal preferences or special requirements
- Edit or remove existing tasks as needed

This feature ensures that after vendor selection, users have a clear and actionable checklist to follow through on each vendor relationship.

---

## User Flow Summary

```
Create Event & Set Total Budget
        ↓
Smart Budget Allocation (auto-distributed by category, scale-aware)
        ↓
Adjust Sliders (dynamic rebalancing across categories)
        ↓
Vendor Selection (locked if over budget; locks slider on selection)
        ↓
Auto-Generated Task List per Vendor (with priority levels)
        ↓
Add Custom Tasks as Needed
```

---

## Design Principles

- **Budget integrity:** The total budget is always respected. No combination of choices can exceed it.
- **Progressive locking:** Confirmed decisions (vendor selections) cannot be undone via slider changes, preserving data consistency.
- **Scale-aware UX:** The interface adapts to the event's financial scope.
- **Actionability:** Every vendor selection immediately produces a concrete task list, bridging planning and execution.

---

## Tech Stack

### Frontend
|       Tool          |                      Role                     |
|---------------------|-----------------------------------------------|
| **React**           | UI framework                                  |
| **TypeScript**      | Static typing across all components and state |
| **React Router v6** | Client-side routing with dynamic segments (e.g. `/events/:eventId/vendors`) |
| **Redux Toolkit**   | Global state management (event, budgets, vendors, auth) |

### Backend & Database
|        Tool          |            Role                |
|----------------------|--------------------------------|
| **C# / .NET**        | Server-side logic and REST API |
| **Entity Framework** | ORM for database communication |
| **SQL Server**       | Relational database for storing events, vendors, and tasks |











