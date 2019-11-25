#!/usr/bin/env node

import { exists, writeFileSync, readFileSync, existsSync, writeFile } from 'fs';
import { logger, colors } from './logger';
import { styler } from '@sorg/log';
import { Config, Badges, Links } from './types';
import fetch from 'node-fetch';

const BADGES: Badges = {
  circleci: '/circleci/build/github/<GITHUB>/<REPO>',
  vscV: '/visual-studio-marketplace/v/<VSCODE>',
  vscD: '/visual-studio-marketplace/d/<VSCODE>',
  vscI: '/visual-studio-marketplace/i/<VSCODE>',
  vscR: '/visual-studio-marketplace/r/<VSCODE>',
  min: '/bundlephobia/min/<NAME>',
  minzip: '/bundlephobia/minzip/<NAME>',
  install: '/packagephobia/install/<NAME>',
  publish: '/packagephobia/publish/<NAME>',
  npmV: '/npm/v/<NAME>',
  npmDM: '/npm/dm/<NAME>',
  npmDT: '/npm/dt/<NAME>',
  npmDW: '/npm/dw/<NAME>',
  npmDY: '/npm/dy/<NAME>',
  npmDep: '/npm/dependents/<NAME>',
  npmLicense: '/npm/license/<NAME>',
  npmNode: '/npm/node/<NAME>',
  npmTypes: '/npm/types/<NAME>',
  githubFollowers: '/github/followers/<GITHUB>',
  githubForks: '/github/forks/<GITHUB>/<REPO>',
  githubStars: '/github/stars/<GITHUB>/<REPO>',
  githubIssues: '/github/issues/<GITHUB>/<REPO>',
  githubLastCommit: '/github/last-commit/<GITHUB>/<REPO>',
  badge: '/badge/'
};

const LINKS: Links = {
  npm: 'https://www.npmjs.com/package/<NAME>',
  github: 'https://github.com/<GITHUB>/<REPO>',
  circleci: 'https://app.circleci.com/github/<GITHUB>/<REPO>/pipelines',
  vscode: 'https://marketplace.visualstudio.com/items?itemName=<VSCODE>',
  bundle: 'https://bundlephobia.com/result?p=<NAME>',
  package: 'https://packagephobia.now.sh/result?p=<NAME>',
  custom: '<CUSTOM>'
};

class Start {
  args: string[];
  config: Config = {
    badges: [],
    github: '',
    name: '',
    repo: '',
    out: '',
    vscode: ''
  };
  externalConfig = '';
  package: any;
  constructor() {
    const [, , ...args] = process.argv;
    this.args = [];
    args.forEach((arg, i) => {
      arg = arg.toLowerCase().replace(/^--/, '');
      if (Object.keys(this.config).includes(arg)) {
        this.addArgToConfig(arg as keyof Config, args, i);
      }
      if (arg === 'config') {
        this.externalConfig = args[i + 1].replace(/["']?([^"']*)["']?/, '$1');
      }
      this.args[i] = arg === undefined ? '' : arg.toLowerCase();
    });
    this.run();
  }
  private addArgToConfig(name: keyof Config, args: string[], i: number) {
    if (args[i + 1]) {
      const nextArg = args[i + 1].replace(/["']?([^"']*)["']?/, '$1');
      if (name !== 'badges') {
        this.config[name] = nextArg;
      } else {
        this.config[name] = nextArg.split(',');
      }
    } else {
      logger.Log('error', `--${name} ${args[i + 1]} not Found.`);
    }
  }
  private async run() {
    const hasPackage = await Exits('./package.json');
    if (!hasPackage) {
      logger.Log('info', 'No package.json found!');
      process.exit();
    }
    this.package = JSON.parse(readFileSync('./package.json').toString());

    const config: Config = await this.getConfig();
    // console.log(`${styler('CONFIG', colors.blue)}:`, config);
    let out = '';
    for (const _badge of config.badges) {
      out += this.Badge(_badge, config);
    }

    let input = '';
    if (existsSync(config.out)) {
      const inputFile = readFileSync(config.out).toString();
      input = inputFile.replace(
        /<span id="BADGE_GENERATION_MARKER_0"><\/span>[\S\s]*<span id="BADGE_GENERATION_MARKER_1"><\/span>/,
        'BADGE_INSERTION_MARKER'
      );
      if (!/BADGE_INSERTION_MARKER/.test(input)) {
        input += '\nBADGE_INSERTION_MARKER';
      }
    }

    const generated = `<span id="BADGE_GENERATION_MARKER_0"></span>\n${out}\n<span id="BADGE_GENERATION_MARKER_1"></span>`;
    writeFile(config.out, input.replace(/BADGE_INSERTION_MARKER/, generated), err => {
      if (err) throw err;
      logger.Log('info', `Successfully Generated Badges at `, config.out);
    });

    // console.log(`${styler('OUTPUT', colors.blue)}: ${out}`);
  }

  private Badge(_badge: string, config: Config): string {
    let customLink = '';
    if (/ custom=.+/.test(_badge)) {
      customLink = _badge.replace(/.*?custom=([^ ]*) ?.*/, '$1');
    }

    const split = _badge.split(' ');
    const type = split[0] as keyof Badges;
    const link = split[1] as keyof Links;
    const params = split[2];
    let useBadgen = false;
    switch (type) {
      case 'install':
      case 'npmDep':
      case 'npmNode':
      case 'npmLicense':
        useBadgen = true;
        break;
    }
    if ((BADGES[type] && LINKS[link]) || customLink) {
      return ` [![${type}](${useBadgen ? 'https://badgen.net' : 'https://img.shields.io'}${this.replacePlaceholders(
        config,
        BADGES[type]
      )}${params ? params : ''})](${customLink ? customLink : this.replacePlaceholders(config, LINKS[link])})`;
    } else {
      logger.Log('info', `Badge: "${split.join(' ')}" is Not Valid.`);
    }

    return '';
  }

  private replacePlaceholders(config: Config, text: string) {
    text = text.replace(/<NAME>/g, config.name);
    text = text.replace(/<GITHUB>/g, config.github);
    text = text.replace(/<VSCODE>/g, config.vscode);
    text = text.replace(/<REPO>/g, config.repo);
    return text;
  }
  private async getConfig() {
    return new Promise<Config>(async res => {
      let path = './BADGES.json';

      if (this.externalConfig !== '') {
        const uri = new URI(this.externalConfig);
        if (uri.type === 'url') {
          const file = await fetch(uri.path);

          return res(await file.json());
        }
        path = uri.path;
      }
      const hasConfig = await Exits(path);
      if (!hasConfig || this.args[0] === '-fc') {
        logger.Log('info', 'No config Found, do you want to create one? ', '[Y/n]');
        const answer = await getYNAnswer();

        if (answer) {
          const file = await this.CreateConfig();
          console.log(`${styler('Create CONFIG', colors.blue)}: ${file}`);
          writeFileSync(path, file);
          res(this.addParamsToConfig(JSON.parse(file)));
        } else {
          process.exit();
        }
      } else {
        res(this.addParamsToConfig(JSON.parse(readFileSync(path).toString())));
      }
    });
  }
  private async addParamsToConfig(config: Config) {
    return new Promise<Config>(async res => {
      for (const key in this.config) {
        if (this.config.hasOwnProperty(key)) {
          const option = this.config[key];
          if (option && option.length !== 0) {
            config[key] = option;
          }
        }
      }
      config.name = config.name === 'package.name' ? this.package.name : config.name;
      config.repo = config.repo === 'package.name' ? this.package.name : config.repo;
      res(config);
    });
  }
  private async CreateConfig() {
    return `{
  "name": "package.name",
  "github": "${await this.getInp('Github', 'Username')}",
  "repo": "${await this.getInp('Github', 'Repo', this.package.name)}",
  "out": "${await this.getInp('out', 'FILE NAME', 'README.md')}",
  "vscode": "${await this.getInp('VsCode', 'publisher.extension-name')}",
  "badges": [
    ${await this.getBadges()}
  ]
}`;
  }
  private async getInp(type: string, type2: string, _default?: string) {
    process.stdout.write(styler(type, colors.blue));
    process.stdout.write(styler(` ${type2}`, colors.yellow));
    process.stdout.write(styler(': ', colors.gray));
    if (_default) {
      process.stdout.write(styler(`(${_default}) `, colors.gray));

      const input = await readConsole();
      if (input.length === 0) {
        return _default;
      }
      return input;
    }
    return readConsole();
  }
  private async getBadges(out?: string): Promise<string> {
    if (!out) {
      out = '';
      process.stdout.write(styler('Press Enter to Accept. ', colors.info));
      process.stdout.write(styler('Format: ', colors.gray));
      process.stdout.write(styler('BADGE ', colors.blue));
      process.stdout.write(styler('LINK ', colors.yellow));
      process.stdout.write(styler('Parameters?\n', colors.gray));
    }
    process.stdout.write(styler('Add', colors.blue));
    process.stdout.write(styler(' Badge', colors.yellow));
    process.stdout.write(styler(': ', colors.gray));

    const input = await readConsole();
    if (/^e$|^end$|^$/i.test(input)) {
      return (out + input).replace(/,\n    $/, '');
    } else {
      out += `"${input}",\n    `;
      return await this.getBadges(out);
    }
  }
}
new Start();

export async function Exits(path: string) {
  return new Promise<boolean>(res => {
    exists(path, exists => {
      res(exists);
    });
  });
}

export async function readConsole() {
  return new Promise<string>(res => {
    const stdin = process.openStdin();
    const l = (input: string[]) => {
      stdin.pause();
      stdin.removeListener('data', l);
      res(input.toString().trim());
    };
    stdin.addListener('data', l);
  });
}

export async function getYNAnswer(): Promise<boolean> {
  const answer = await readConsole();
  if (/^$|^y$/i.test(answer)) {
    return true;
  } else if (/n/i.test(answer)) {
    return false;
  } else {
    return getYNAnswer();
  }
}

class URI {
  type: 'file' | 'url';
  constructor(public path: string) {
    if (path.startsWith('http')) {
      this.type = 'url';
    } else {
      this.type = 'file';
    }
  }
}
