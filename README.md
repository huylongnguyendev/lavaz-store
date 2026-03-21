# @lavaz/store 🚀

![Lavaz Store Logo](https://github.com/huylongnguyendev/magos/blob/main/assets/logo-mago-40.png)

A lightweight, high-level state management infrastructure for React and JavaScript applications. Designed for complex workspaces, not just simple kanbans.

[![npm version](https://img.shields.io/npm/v/@lavaz/store/beta)](https://www.npmjs.com/package/@lavaz/store)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@lavaz/store)](https://bundlephobia.com/package/@lavaz/store)

## ✨ Features

- **Ultra Lightweight**: Less than 3kB gzipped.
- **Type-safe**: Built with TypeScript for excellent developer experience.
- **High Performance**: Optimized with `useSyncExternalStore` and shallow comparison to prevent unnecessary re-renders.
- **Zero Configuration**: Easy to set up and integrate into any project.

## 📦 Installation

```bash
pnpm add @lavaz/store
# or
npm install @lavaz/store
# or
yarn add @lavaz/store
# or
bun add @lavaz/store@beta
```

# 🚀 Quick Start

## 1. Create a Box
A "Box" is where your state and actions live.

```bash
import { createBox } from "@lavaz/store";

export const counterBox = createBox({
  state: { count: 0 },
  actions: (set) => ({
    inc: () => set((s) => ({ count: s.count + 1 })),
    dec: () => set((s) => ({ count: s.count - 1 })),
  }),
});
```

## 2. Create a store
A "Store" is the central hub that manages multiple boxes. It provides a unified interface to access your state and actions across the entire workspace.

```bash
import { createStore } from "@lavaz/store";
import { authBox } from "./boxes/authBox";
import { projectBox } from "./boxes/projectBox";

// Initialize your global workspace store
export const store = createStore({
  auth: authBox,
  projects: projectBox,
  // You can add more boxes as your workspace grows
});
```

## 3. Use in React
Use the `useAppStore` hook with a selector for optimal performance.

```bash
import { useAppStore } from "@lavaz/store";
import { counterBox } from "./counterBox";

const Counter = () => {
  // Only re-renders if 'count' changes
  const [count, { inc, dec }] = useAppStore(counterBox, (s) => s.count);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
    </div>
  );
};
```

## 🛠 Advanced: Shallow Comparison
Lavaz automatically performs a shallow check on the data returned by your selector.

```bash
const [user] = useAppStore(userBox, (s) => ({
  name: s.name,
  age: s.age
}));
```

# 📄 License
MIT © [Nguyen Huy Long/Lavaz Ecosystem]