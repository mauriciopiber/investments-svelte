/* eslint-disable no-console */
import esbuild from "esbuild";

const buildDirectory = "dist";
const production = process.env.NODE_ENV === "production";

// Config entrypoint files
const entryPoints = ["src/index.ts"];

/**
 * Default Settings
 * @type {esbuild.BuildOptions}
 */
const defaultSettings = {
  platform: "node",
  bundle: true,
  outdir: buildDirectory,
  minify: production,
  sourcemap: false,
  target: production ? "esnext" : "esnext",
  entryPoints,
  // outExtension: { ".js": ".cjs" },
};

// Files building

esbuild.build(defaultSettings);
