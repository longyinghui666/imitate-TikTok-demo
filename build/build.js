import { exec,spawn } from "child_process";
import { existsSync } from "fs";
import { resolve } from 'path';

const build = () => {
  let command = '';
  let tempname = '';
  // eslint-disable-next-line no-undef
  const argv = process.argv;
  if (argv.length<3) {
    console.log('请输入要打包的应用名称');
    return;
  }
  switch (argv.length) {
    case 4:
      command = `vite build --mode ${argv[2]}`;
      tempname = argv[3]
      break;    
    default:
      tempname = argv[2]
      command = 'vite build'
      break;
  }
  if (!existsSync(resolve(`src/templates/${tempname}`))) {
    console.log('需要打包的模板名称不存在');
    return;
  }
  // eslint-disable-next-line no-undef
  process.env.TEMPAPPNAME=tempname

  spawn(command, {
    stdio: 'inherit',
    // eslint-disable-next-line no-undef
    shell: process.platform === 'win32'
  });
  
  // exec(command, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`执行出错: ${error}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  //   console.log(`stderr: ${stderr}`);
  // });
}

build();
