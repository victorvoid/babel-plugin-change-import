const babel = require("@babel/core");
const changePlugin = require("./index.js");

describe("Should test all options", () => {
  test("Should change import to get from `modulePath`", () => {
    const code = `
    import { Button as MyButton, Input, Text } from '@company/ds'
    `;

    const output = babel.transformSync(code, {
      plugins: [
        [
          "./index.js",
          {
            libraryName: "@company/ds",
            modulePath: `@company/packages/ds/components`,
          },
        ],
      ],
    });

    const expected = `
import MyButton from "@company/packages/ds/components/Button";
import Input from "@company/packages/ds/components/Input";
import Text from "@company/packages/ds/components/Text";
`;

    expect(output.code).toEqual(expected.trim());
  });

  test("Should change import to get from `specific`", () => {
    const code = `
    import { configure } from '@company/ds'
    `;

    const output = babel.transformSync(code, {
      plugins: [
        [
          "./index.js",
          {
            libraryName: "@company/ds",
            specific: {
              configure: "@company/packages/ds/configure",
            },
          },
        ],
      ],
    });

    const expected = `
import configure from "@company/packages/ds/configure";
`;

    expect(output.code).toEqual(expected.trim());
  });

  test("Should change import to get from `specificDestructuring`", () => {
    const code = `
    import { useAlert } from '@company/ds'
    `;

    const output = babel.transformSync(code, {
      plugins: [
        [
          "./index.js",
          {
            libraryName: "@company/ds",
            specificDestructuring: {
              useAlert: "@company/packages/ds/components/Alert",
            },
          },
        ],
      ],
    });

    const expected = `
import { useAlert } from "@company/packages/ds/components/Alert";
`;

    expect(output.code).toEqual(expected.trim());
  });
});
