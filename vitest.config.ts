import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // Hỗ trợ render React Component trong test
  test: {
    globals: true, // Cho phép dùng 'describe', 'it', 'expect' mà không cần import
    environment: "jsdom", // Giả lập môi trường trình duyệt
    setupFiles: "./tests/setup.ts", // File cấu hình khởi đầu cho mỗi lần test
    include: ["**/*.test.{ts,tsx}"],
    coverage: {
      reporter: ["text", "json", "html"], // Xuất báo cáo độ phủ code (tùy chọn)
    },
  },
});
