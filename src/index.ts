type consoleType = keyof Console | "";

interface options {
  /**
   * @description show ignored info tips
   * @default false
   */
  showLog?: Boolean;
  /**
   * @description the environment take effect
   * @default ["development"]
   */
  env?: String[];
  /**
   * @description the type of console you want to ignore
   * @default error
   */
  type?: consoleType;
  /**
   * @description 🙂
   * @default ["Warning: \\[antd:"]
   */
  ignoreRule?: String[];
}

export const antdRule: String[] = ["Warning: \\[antd:"];

export default function ignoreConsole(config: options | undefined) {
  // default options
  const defaultConfig = config || {};
  const {
    showLog = false,
    env = ["development"],
    type = "error",
    ignoreRule = antdRule,
  } = defaultConfig;

  // env
  const projectEnv = process.env.NODE_ENV || "";
  if (!env.includes(projectEnv)) {
    return;
  }

  const ignoreRuleRegList = ignoreRule
    .map((text) => {
      return `(${text})`;
    })
    .join("|");

  if (window.console && window.console[type]) {
    const filterError = window.console[type];
    window.console[type] = function (...args: any[]) {
      const [errorMessage] = args;
      const reg = new RegExp(ignoreRuleRegList, "g");
      const result = reg.exec(errorMessage);
      if (result) {
        if (showLog) {
          window.console.log("Ignored info: ", errorMessage);
        }
        return;
      }
      filterError.apply(this, args);
    };
  }
}
