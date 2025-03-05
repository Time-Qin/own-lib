import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import { terser } from "rollup-plugin-terser"
import { defineConfig } from "rollup"
import { dependencies } from "./package.json"

const external = Object.keys(dependencies || "")
const globals = external.reduce((prev, current) => {
  const nextPrev = prev
  nextPrev[current] = current
  return nextPrev
}, {})

const defaultConfig = defineConfig({
  input: "./src/index.js",
  output: {
    dir: "./dist",
    entryFileNames: "es/index.js",
    format: "es",
    banner: "#!/usr/bin/env node",
    globals,
    // sourcemap:true,
  },
  external,
  plugins: [resolve(), commonjs(), json(), terser()],
})
export default defaultConfig
