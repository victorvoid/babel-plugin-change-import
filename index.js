const babel = require("@babel/core");

function babelPluginChangeImport({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        let { modulePath, libraryName } = state.opts;
        let { node } = path;
        let modulesName = [];

        if (node.source.value === libraryName) {
          node.specifiers.forEach((spec) => {
            if (t.isImportSpecifier(spec)) {
              modulesName.push(spec.local.name);
            }
          });

          const imports = modulesName.map((name) => {
            return `import ${name} from '${modulePath(name)}'`;
          });

          path.replaceWith(babel.parse(imports.join("\n")).program);
        }
      },
    },
  };
}

module.exports = babelPluginChangeImport;
