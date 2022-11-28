# ignore-console

ignore console(error,log,warn...)
(主要为了解决 antd 4.23.0 开发环境下疯狂抛 error 提示 deprecated 的问题 😠)

# Installation

```shell
npm i ignore-console
```

# Usage

```javascript
import ignoreConsole from "ignore-console"

// use default options
ignoreConsole()

// or custom
ignoreConsole({
    //show ignored info tips. default:false
    showLog: true;
    // the environment take effect. default:["development"]
    env:["development"];
    // the type of console. default: error
    type: "error";
    // default:["Warning: \\[antd:"] 🙂
    ignoreRule: ["Warning: \\[antd:","you jump i jump"];
})

```
