const babel = require("@babel/core");

function changeImportPlugin({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const options = state.opts;

        const memberImports = path.node.specifiers.filter(
          (specifier) => specifier.type === "ImportSpecifier",
        );

        let { node } = path;
        const transforms = [];
        const source = node.source.value;
        const isMatchWithLibrary = source === options.libraryName;

        if (isMatchWithLibrary) {
          memberImports.forEach((memberImport) => {
            const importName = memberImport.imported.name;

            const specificImport =
              options?.specific?.[importName] ||
              options?.specificDestructuring?.[importName];

            const replace =
              specificImport || `${options.modulePath}/${importName}`;

            const destructuringSpecificImport =
              options?.specificDestructuring?.[importName];

            const newImportSpecifier = destructuringSpecificImport
              ? t.importSpecifier(
                  t.identifier(memberImport.local.name),
                  t.identifier(memberImport.local.name),
                )
              : t.importDefaultSpecifier(t.identifier(memberImport.local.name));

            transforms.push(
              t.importDeclaration(
                [newImportSpecifier],
                t.stringLiteral(replace),
              ),
            );
          });

          if (transforms.length > 0) {
            path.replaceWithMultiple(transforms);
          }
        }
      },
    },
  };
}

module.exports = changeImportPlugin;
