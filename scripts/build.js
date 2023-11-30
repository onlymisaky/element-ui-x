/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');

const { spawn } = require('child_process');

/**
 * @param {string} command
 * @param {{ cwd: string; silent: boolean; time: boolean;}} options
 * @returns {Promise<{  pid: null | string | number, code: null | number, stdout: string[], stderr: string[],}>}
 */
function execCommand(command, options) {
  let resolve;
  const promise = new Promise((res) => { resolve = res; });

  const { cwd, silent } = {
    cwd: '', silent: false, ...options,
  };

  /** @type {string[]} */
  const stdout = [];
  /** @type {string[]} */
  const stderr = [];

  const sub = spawn(command, { cwd, shell: true });

  sub.on('close', (code) => {
    process.stdin.destroy();

    resolve({
      pid: sub.pid, code, stdout, stderr,
    });
  });

  sub.stdout.on('data', (data) => {
    stdout.push(data.toString());
    if (!silent) {
      process.stdout.write(data);
    }
  });

  sub.stderr.on('data', (data) => {
    stderr.push(data.toString());
    if (!silent) {
      console.log(data.toString());
    }
  });

  process.stdin.on('data', (input) => {
    sub.stdin.write(`${input.toString()}\n\r`);
  });

  return promise;
}

const componentsPath = path.resolve(process.cwd(), './packages/components');

function getItems() {
  return fs.readdirSync(componentsPath)
    .reduce((prev, current) => {
      const stat = fs.statSync(path.resolve(componentsPath, current));
      if (stat.isDirectory() && fs.existsSync(path.resolve(componentsPath, current, 'index.ts'))
      ) {
        return [...prev, current];
      }
      return prev;
    }, []);
}

const buildItems = () => {
  const components = getItems();
  // todo 用队列优化一下，一次3到5个
  return components.reduce((prev, current) => prev.then(() => {
    console.log(`开始构建: ${current}`);
    const cmd = [
      'npm run build:single',
      ' -- ',
      `./packages/components/${current}/index.ts `,
      '--name index ',
      `--dest lib/${current} `,
    ].join('');
    return execCommand(cmd, { silent: true }).then((res) => {
      if (res.code !== 0) {
        console.log(`构建失败: ${current}`);
        console.log(`***请使用 ${cmd} 单独构建该组件***`);
        return;
      }
      console.log(`构建成功: ${current}`);
    });
  }), Promise.resolve());
};

buildItems();
