# Fuel Economy Tracker

A simple, responsive web app for logging vehicle fuel expenses and tracking fuel efficiency (km/L) over time.

## Features

- **Add expenses** — log kilometer readings, liters consumed, and gas price per liter
- **Auto-calculated metrics** — distance traveled, fuel efficiency (km/L), and total fuel cost are derived automatically from your inputs
- **Edit & delete** — update or remove past entries via a drawer-based form and confirmation modal
- **Responsive layouts** — a desktop table view and a mobile-first card view, switching automatically based on screen size
- **Form validation** — required fields, numeric type-checking, and date validation powered by React Hook Form
- **Sequential km tracking** — the starting kilometer reading for a new entry is automatically pre-filled from the previous entry's ending reading

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tool & dev server
- [Chakra UI v3](https://chakra-ui.com/) — component library and styling
- [React Hook Form](https://react-hook-form.com/) — form state and validation
- [React Icons](https://react-icons.github.io/react-icons/) — icon set

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
git clone <repo-url>
cd fuel-economy-tracker
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── expenses/
│   │   ├── AddForm.tsx        # Form for adding a new expense
│   │   ├── EditForm.tsx       # Form for editing an existing expense
│   │   ├── ExpenseDrawer.tsx  # Drawer wrapper for add/edit forms
│   │   ├── Table.tsx          # Desktop table view
│   │   ├── List.tsx           # Mobile list view
│   │   └── Card.tsx           # Individual expense card (mobile)
│   ├── Modal.tsx               # Generic confirmation modal
│   ├── Navbar.tsx
│   └── Footer.tsx
├── types/
│   └── Expense.ts              # Expense data model & form value types
├── utilities/
│   └── utils.ts                # Formatters, validation rules, column config
├── App.tsx
└── main.tsx
```

## Notes

- Expense data is currently held in local React state (no backend/persistence yet).
- IDs are generated client-side as a placeholder until a database is integrated.

## License

MIT
