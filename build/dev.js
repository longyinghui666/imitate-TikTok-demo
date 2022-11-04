import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { exit } from 'process';

const build = () => {
  let command = '';
  let tempname = '';
  // eslint-disable-next-line no-undef
  const argv = process.argv;

  if (argv.length < 2) {
    console.log('请输入要启动服务的模板应用名称');exit;
    return false;
  }
  switch (argv.length) {
    case 4:
      command = `vite ${argv[2]}`;
      tempname = argv[3];
      break;
    default:
      tempname = argv[2];
      // command = 'vite serve src/templates/demo/ --config ./vite.config.js';
      command = 'vite';
      break;
  }

  if (!existsSync(resolve(`src/templates/${tempname}`))) {
    console.log('需要启动服务的模板名称不存在');
    return false;
  }
  // eslint-disable-next-line no-undef
  process.env.TEMPAPPNAME = tempname;

  spawn(command, {
    stdio: 'inherit',
    // eslint-disable-next-line no-undef
    shell: process.platform === 'win32'
  });
};
build();
