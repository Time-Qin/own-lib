import shell from "shelljs"
import logSymbols from "./logSymbols.js"
import fs from "fs-extra"
import { changePackageJSON, npmInstall, removeDir } from "./index.js"
import clone from "./gitIndex.js"
import { inquirerChoices, inquirerInputs } from "./interactive.js"
import { templates } from "./constants.js"
const initActions = async (name, option) => {
  if (!shell.which("git")) {
    console.log(logSymbols.error, "抱歉，运行脚本需要先安装git")
    shell.exit(1)
  }
  // 验证name输入是否符合规范
  if (name.match(/[\u4E00-\u9FFF`~!@#$%&^*[\]()\\;:<.>/?]/g)) {
    console.log(logSymbols.error, "抱歉，项目名称存在非法字符！")
    return
  }

  let repository = ""
  if (option.template) {
    const template = templates.find((item) => item.name === option.template)
    if (!template) {
      console.log(
        logSymbols.error,
        `不存在模板 ${chalk.yellow(option.template)}`
      )
      console.log(
        `\r\n运行${logSymbols.arrow} ${chalk.cyan(
          `dy-cli list`
        )} 查看所有可用模板\r\n`
      )
      return
    }
    repository = template.value
  } else {
    // 选择远程git项目模板
    const answer = await inquirerChoices("请选择项目模板", templates)
    repository = answer.choose
  }

  // 验证是否存在${name}同名文件夹,如果存在
  // 1. 如果没有-f --force选项,提示用户是否删除同名文件夹
  // 2. 如果有-f --force选项,直接删除同名文件夹
  if (fs.existsSync(name) && !option.force) {
    console.log(
      logSymbols.error,
      `已存在${chalk.yellow(name)}文件夹，请重新输入！`
    )
    const answer = await inquirerConfirm(
      `是否强制覆盖${chalk.yellow(name)}文件夹？`
    )
    console.log(answer)
    if (answer.confirm) {
      await removeDir(name)
    } else {
      console.log(
        logSymbols.error,
        chalk.redBright(
          `对不起,项目创建失败,存在同名文件夹,${chalk.yellowBright(name)}`
        )
      )
      return
    }
  } else if (fs.existsSync(name) && option.force) {
    console.log(
      logSymbols.warning,
      `已经存在项目文件夹${chalk.yellowBright(name)},强制删除`
    )
    await removeDir(name)
  }
  // 下载远程git项目模板
  try {
    await clone(repository, name)
  } catch (error) {
    console.log(logSymbols.error, error)
    shell.exit(1)
  }
  // 是否忽略项目相关描述
  if (!option.ignore) {
    // 输入提问
    const answers = await inquirerInputs(messages)
    console.log(answers)
    await changePackageJSON(name, answers)
  }
  npmInstall(name)
}
export default initActions
