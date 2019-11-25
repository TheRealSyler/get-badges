## get-badges

<span id="BADGE_GENERATION_MARKER_0"></span>
 [![npmV](https://img.shields.io/npm/v/get-badges)](https://www.npmjs.com/package/get-badges) [![min](https://img.shields.io/bundlephobia/min/get-badges)](https://bundlephobia.com/result?p=get-badges) [![install](https://badgen.net/packagephobia/install/get-badges)](https://packagephobia.now.sh/result?p=get-badges) [![githubLastCommit](https://img.shields.io/github/last-commit/TheRealSyler/get-badges)](https://github.com/TheRealSyler/get-badges) [![badge](https://img.shields.io/badge/test-badge-blue)](https://example.com)
<span id="BADGE_GENERATION_MARKER_1"></span>

### Usage Example

run `get-badges`, for the `BADGE` param pick a key of [Badges](#badges), for the `LINK` param pick a key of [Links](#links).

the badges above have been generated with this config:

```json
{
  "name": "package.name",
  "github": "TheRealSyler",
  "repo": "package.name",
  "out": "README.md",
  "vscode": "",
  "badges": [
    "npmV npm",
    "min bundle",
    "install package",
    "githubLastCommit github",
    "badge custom=https://example.com test-badge-blue"
  ]
}
```

<span id="DOC_GENERATION_MARKER_0"></span>
# Docs

- **[types](#types)**

  - [Config](#config)
  - [Badges](#badges)
  - [Links](#links)

### types


##### Config

```typescript
interface Config {
    name: string;
    github: string;
    vscode: string;
    repo: string;
    out: string;
    badges: string[];
    [key: string]: string | string[] | undefined;
}
```

##### Badges

```typescript
interface Badges {
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
     * Custom Shields.io Badge.
     */
    badge: '/badge/';
}
```

##### Links

```typescript
interface Links {
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
     * Custom, usage example: custom=example.com.
     */
    custom: '<CUSTOM>';
}
```

*Generated With* **[ts-doc-gen](https://www.npmjs.com/package/ts-doc-gen)**
<span id="DOC_GENERATION_MARKER_1"></span>
