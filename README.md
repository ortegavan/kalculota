# Kalculota

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 17.3.0.

## Alterações em 05/06/2024

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
