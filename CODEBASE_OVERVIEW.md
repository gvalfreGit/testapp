# Visão geral da base de código

Este repositório está em estado inicial (bootstrap) e ainda **não contém código de aplicação**.

## Estrutura atual

- `.git/`: metadados de versionamento do Git.
- `.gitkeep`: arquivo vazio usado apenas para manter o diretório versionado enquanto ainda não existem arquivos reais de código.

## Pontos importantes para alguém novo

1. Não há módulos, serviços, rotas, componentes ou testes implementados.
2. O primeiro passo prático será definir stack e convenções (linguagem, framework, lint, testes, CI).
3. Vale começar criando pelo menos:
   - `README.md` com objetivo do projeto e instruções de execução;
   - estrutura inicial de pastas (`src/`, `tests/`, etc., dependendo da stack);
   - automação mínima (lint/test/build) para garantir qualidade desde o começo.

## Dicas para aprender mais (neste contexto)

- Converse com o time para entender o domínio de negócio e o objetivo do produto.
- Verifique histórico de issues/planejamento para descobrir prioridades do MVP.
- Ao iniciar a implementação, adote commits pequenos e claros para facilitar revisão e onboarding.
