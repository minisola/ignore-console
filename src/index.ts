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

  if (console && console[type]) {
    const filterError = console[type];
    console[type] = function (...args: any[]) {
      const [message] = args;
      const reg = new RegExp(ignoreRuleRegList, "g");
      const result = reg.exec(message);
      if (result) {
        if (showLog) {
          console.log("Ignored info: ", message);
        }
        return;
      }
      filterError.apply(this, args);
    };
  }
}
