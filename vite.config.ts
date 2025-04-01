import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: {
        components: path.resolve(__dirname, "./src/components/index.tsx"),
        hooks: path.resolve(__dirname, "./src/hooks/index.ts"),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@storybook/react",
        "@storybook/addons",
        "@storybook/client-api",
        "@storybook/preview-api",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@storybook/react": "Storybook",
          "@storybook/addons": "StorybookAddons",
          "@storybook/client-api": "StorybookClientApi",
          "@storybook/preview-api": "StorybookPreviewApi",
        },
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
  },
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.app.json",
      include: ["src/components/**/*", "src/hooks/**/*"],
      exclude: ["src/**/*.stories.tsx", "src/**/*.test.tsx"],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace("/src/", "/"),
        content,
      }),
    }),
    tailwindcss(),
  ],
});
