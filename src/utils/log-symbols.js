import chalk from "chalk"
import { isUnicodeSupported } from "."

const main = {
  info: chalk.blue("ℹ"),
  success: chalk.green("✔"),
  warning: chalk.yellow("⚠"),
  error: chalk.red("✖"),
  star: chalk.cyan("★"),
  arrow: chalk.yellow("➜"),
}

const fallback = {
  info: chalk.blue("i"),
  success: chalk.green("√"),
  warning: chalk.yellow("‼"),
  error: chalk.red("×"),
  star: chalk.cyan("*"),
  arrow: chalk.yellow("->"),
}
const logSymbols = isUnicodeSupported() ? main : fallback
export default logSymbols
