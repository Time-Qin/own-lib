// #!/usr/bin/env node
import chalk from "chalk"
import { Command } from "commander"
import figlet from "figlet"
import { templates } from "./utils/constants.js"
import fs from "fs-extra"
import logSymbols from "./utils/logSymbols.js"
import { table } from "table"
import initActions from "./utils/initActions.js"

const program = new Command("own-cli")

const pkg = fs.readJsonSync(new URL("../package.json", import.meta.url))
program.version(pkg.version, "-v,--version")

const init = () => {
  console.log(chalk.cyanBright("欢迎使用own-cli"))
}

program.command("init").description("初始化脚手架").action(init)

program
  .name("own-cli")
  .description("脚手架工具")
  .usage("<command> [options]")
  .on("--help", () => {
    console.log(
      "\r\n" +
        chalk.greenBright.bold(
          figlet.textSync("own-cli", {
            fonts: "Ghost",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 80,
            Whitespace: true,
          })
        )
    )
    console.log("\r\n" + chalk.greenBright.bold("欢迎使用own-cli"))
    console.log("\r\n" + chalk.greenBright.bold("作者：Time-Qin"))
    console.log(
      `\r\n Run ${chalk.cyan(
        "own-cli <command> --help"
      )} for detailed usage of given command.\r\n`
    )
  })

program
  .command("create <app-name>")
  .description("创建一个新项目")
  .option("-t, --template [template]", "输入模板名称创建项目")
  .option("-f, --force", "是否强制覆盖同名项目")
  .option("-i, --ignore", "忽略项目相关描述,快速创建项目")
  .action(initActions)

program
  .command("check-all")
  .description("查看所有可用模板")
  .action(() => {
    // console.log(chalk.yellowBright(logSymbols.star, "模板列表"))
    // templates.forEach((item, index) => {
    //   console.log(
    //     chalk.green(
    //       `(${index + 1}) | ${item.name} | ${item.value} | ${item.desc}`
    //     )
    //   )
    // })
    const data = templates.map((item) => [
      chalk.yellowBright(item.name),
      item.value,
      item.desc,
    ])
    data.unshift([
      chalk.yellowBright("模板名称"),
      chalk.yellowBright("模板地址"),
      chalk.yellowBright("模板描述"),
    ])
    const config = {
      header: {
        alignment: "center",
        content: chalk.yellowBright(logSymbols.star, "模板列表"),
      },
    }
    console.log(table(data, config))
  })

program.parse(process.argv)

console.log("Hello own-lib")
