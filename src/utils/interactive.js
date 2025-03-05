import inquirer from "inquirer"

/**
 * @param {string} message 询问提示语句
 * @returns {boolean} 返回结果
 */
export const inquirerConfirm = async (message) => {
  return await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: message,
    },
  ])
}

/**
 * @param {string} message 询问提示语句
 * @param {Array} choices 选择列表
 * @param {string} type 列表类型
 * @returns {Object} 选择结果
 */
export const inquirerChoices = async (message, choices, type = "list") => {
  return await inquirer.prompt({
    name: "choose",
    type,
    message,
    choices,
  })
}

/**
 * @param {string} message 询问提示语句 
 * @returns 输入结果
 */
export const inquirerInput = async (message)=>{
    return await inquirer.prompt({
        name: "input",
        type: "input",
        message,
    })
}

/**
 * @param {Array} messages 询问提示语句数组 
 * @returns {Object} 结果对象
 */
export const inquirerInputs = async (messages)=>{
    return await inquirer.prompt(messages.map((msg)=>{
        return {
            name: msg.name,
            type: "input",
            message: msg.message,
        }
    }))
}