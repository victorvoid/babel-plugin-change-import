# babel-plugin-change-import

This plugin is a transform to remove unused library dependencies, without forcing the user to cherry pick import manually. This lets you use libraries naturally without worrying about bundling parts you're not using.

## Installation

using npm
```bash
npm install babel-plugin-change-import -S
```
or via yarn
```bash
yarn add babel-plugin-change-import -S
```

## Example

.babelrc

```
{
  "plugins": [
      ["change-import", {
        "libraryName": "@company/ds",
        "modulePath": "@company/ds/components"
      }]
    ]
}
```

Your code
```js
import { Button, Input, Text} from '@company/ds'
```

generate to:

```js
import Button from '@company/ds/components/Button'
import Input from '@company/ds/components/Input'
import Text from '@company/ds/components/Text'
```

## Options

You can to specific your imports

## 1. "specific"

.babelrc

```
{
  "plugins": [
      ["change-import", {
        "libraryName": "@company/ds",
        "modulePath": "@company/ds/components",
        "specific": {
            "configure": "@mobi/ds/configure",
        },
      }]
    ]
}
```

Your code
```js
import { Button, configure } from '@company/ds'
```

generate to:

```js
import Button from '@company/ds/components/Button'
import configure from '@company/ds/configure'
```

## 2. "specificDestructuring"

.babelrc

```
{
  "plugins": [
      ["change-import", {
        "libraryName": "@company/ds",
        "modulePath": "@company/ds/components",
        "specificDestructuring": {
            "useAlert": "@mobi/ds/components/Alert",
        },
      }]
    ]
}
```

Your code
```js
import { Button, useAlert } from '@company/ds'
```

generate to:

```js
import Button from '@company/ds/components/Button'
import { useAlert } from '@company/ds/components/Alert'
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
