export interface Config {
  name: string;
  github: string;
  vscode: string;
  repo: string;
  out: string;
  badges: string[];
  [key: string]: string | string[] | undefined;
}

export interface Badges {
  /**
   * circleCi build.
   */
  circleci: '/circleci/build/github/<GITHUB>/<REPO>';
  /**
   * Vscode Extension Version.
   */
  vscV: '/visual-studio-marketplace/v/<VSCODE>';
  /**
   * Vscode Extension downloads.
   */
  vscD: '/visual-studio-marketplace/d/<VSCODE>';
  /**
   * Vscode Extension installs.
   */
  vscI: '/visual-studio-marketplace/i/<VSCODE>';
  /**
   * Vscode Extension ratings.
   */
  vscR: '/visual-studio-marketplace/r/<VSCODE>';
  /**
   * Bundlephobia Min.
   */
  min: '/bundlephobia/min/<NAME>';
  /**
   * Bundlephobia Minzip.
   */
  minzip: '/bundlephobia/minzip/<NAME>';
  /**
   * Packagephobia Install.
   */
  install: '/packagephobia/install/<NAME>';
  /**
   * Packagephobia Publish.
   */
  publish: '/packagephobia/publish/<NAME>';
  /**
   * Npm Version.
   */
  npmV: '/npm/v/<NAME>';
  /**
   * Npm Weekly Downloads.
   */
  npmDW: '/npm/dw/<NAME>';
  /**
   * Npm Monthly Downloads.
   */
  npmDM: '/npm/dm/<NAME>';
  /**
   * Npm Yearly Downloads.
   */
  npmDY: '/npm/dy/<NAME>';
  /**
   * Npm Total Downloads.
   */
  npmDT: '/npm/dt/<NAME>';
  /**
   * Npm Types.
   */
  npmTypes: '/npm/types/<NAME>';
  /**
   * Npm License.
   */
  npmLicense: '/npm/license/<NAME>';
  /**
   * Npm Node.
   */
  npmNode: '/npm/node/<NAME>';
  /**
   * Npm Dependents.
   */
  npmDep: '/npm/dependents/<NAME>';
  /**
   * GitHub Followers.
   */
  githubFollowers: '/github/followers/<GITHUB>';
  /**
   * GitHub Forks.
   */
  githubForks: '/github/forks/<GITHUB>/<REPO>';
  /**
   * GitHub Starts.
   */
  githubStars: '/github/stars/<GITHUB>/<REPO>';
  /**
   * GitHub Issues.
   */
  githubIssues: '/github/issues/<GITHUB>/<REPO>';
  /**
   * GitHub Last Commit.
   */
  githubLastCommit: '/github/last-commit/<GITHUB>/<REPO>';
  /**
   * Custom, usage example: badge=https://img.shields.io/badge/custom%2C-Badge-brightgreen.
   */
  badge: '<CUSTOM>';
}
export interface Links {
  /**
   * Npm package.
   */
  npm: 'https://www.npmjs.com/package/<NAME>';
  /**
   * Github Repo.
   */
  github: 'https://github.com/<GITHUB>/<REPO>';
  /**
   * circleCi Repo Pipelines.
   */
  circleci: 'https://app.circleci.com/github/<GITHUB>/<REPO>/pipelines';
  /**
   * Visual Studio marketplace.
   */
  vscode: 'https://marketplace.visualstudio.com/items?itemName=<VSCODE>';
  /**
   * Bundlephobia Link.
   */
  bundle: 'https://bundlephobia.com/result?p=<NAME>';
  /**
   * Packagephobia Link.
   */
  package: 'https://packagephobia.now.sh/result?p=<NAME>';
  /**
   * Custom, usage example: link=https://example.com.
   */
  link: '<CUSTOM>';
}
