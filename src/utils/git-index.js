import download from 'download-git-repo'
import ora from 'ora'
import chalk from 'chalk'

const clone = (remote,name,option=false)=>{
    const spinner = ora('正在下载...').start()
    return new Promise((resolve,reject)=>{
        download(remote,name,option,(err)=>{
            if(err){
                spinner.fail(chalk.red(err))
                reject(err)
            }else{
                spinner.succeed(chalk.green('下载成功'))
                resolve()
            }
        })
    })
}

export default clone