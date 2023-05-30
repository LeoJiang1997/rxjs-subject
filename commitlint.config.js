'use strict';
const message = process.argv[process.argv.length - 1];
const fs = require('fs');

const types = ['feat', 'fix', 'perf', 'refactor', 'style', 'script', 'chore', 'doc'];

const scopes = ['feat 应用编号', 'fix 应用编号'];

function parseMessage(message) {
  const PATTERN = /^(\w+)(?:\(([^)]+)\))?\: (.+)$/;
  const match = PATTERN.exec(message);
  if (!match) {
    return null;
  }
  // 返回匹配的 scope 的值
  return {
    scope: match[2],
  };
}

function getScopesRule() {
  const messages = fs.readFileSync(message, { encoding: 'utf-8' });
  const parsed = parseMessage(messages.split('\n')[0]);
  if (!parsed) {
    return [2, 'always', []];
  }
  const { scope } = parsed;
  if ((scope && /[feat|fix] [0-9]+$/.test(scope)) || !scope) {
    return [2, 'always', []];
  } else {
    return [2, 'always', scopes];
  }
}

module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [2, 'always', types],
  },
};