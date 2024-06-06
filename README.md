# Kalculota

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 17.3.0.

## Alterações 001 - Prettier

Instalado o Prettier com o comando `npm install --save-dev prettier` e configurado o arquivo `.prettierrc` na raiz da aplicação com as seguintes configurações:

```json
{
    "singleQuote": true,
    "useTabs": false,
    "tabWidth": 4
}
```

Adicionado o script `format` na seção de scripts no arquivo `package.json`:

```json
"format": "prettier --write ."
```

Executado o comando `npm run format` para formatar todos os arquivos do projeto.

## Alterações 002 - Jest

Removidos Jasmine e Karma:

```bash
npm uninstall jasmine-core @types/jasmine karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter
```

Instalado Jest + pacotes necessários:

```bash
npm install --save-dev jest ts-jest @types/jest jest-preset-angular
```

Criado arquivo de configuração do Jest `jest.config.js` na raiz do projeto com o seguinte conteúdo:

```javascript
module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/test.ts'],
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    transform: {
        '^.+\\.(ts|html)$': [
            'jest-preset-angular',
            {
                tsconfig: 'tsconfig.spec.json',
                stringifyContentPathRegex: '\\.html$',
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1',
    },
    collectCoverage: true,
    coverageReporters: ['html'],
};
```

Criado arquivo de configuração do Jest `setup-jest.ts` na raiz do projeto com o seguinte conteúdo:

```javascript
import 'jest-preset-angular/setup-jest';
```

No arquivo `package.json`, alterada a seção de scripts de teste para:

```json
  "test": "jest",
  "test:watch": "jest --watch",
```

Alterado arquivo `tsconfig.spec.json` para:

```json
{
    "extends": "./tsconfig.json",
    "compilerOptions": {
        "outDir": "./out-tsc/spec",
        "types": ["jest", "node"],
        "module": "commonjs"
    },
    "files": ["src/test.ts"],
    "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

## Alterações 003 - Angular Material

Adicionado Angular Material:

```bash
ng add @angular/material
```

## Alterações 004 - Cálculos

Criada service que realiza os cálculos de IRRF, PIS, COFINS e CSLL. Escritos testes para os cálculos.

## Alterações 005 - Tela

Criada primeira versão de layout + implementação. Ainda sem testes e sem máscaras.
