{
    "compilerOptions": {
        "lib": [
            "es5",
            "es6",
            "dom"
        ],
        "target": "es5",
        "module": "commonjs",
        // "module": "system",
        "moduleResolution": "node",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "allowJs": true,
        "outDir": "build",
        "rootDir": "src",
        "sourceMap": true,
        "removeComments": false,
        "noImplicitAny": false
        // "allowSyntheticDefaultImports": true, /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
        // "esModuleInterop": true, /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports.*/
    },
    "exclude": [
        "build",
        "node_modules",
        ".npm",
        "prisma",
    ]
}