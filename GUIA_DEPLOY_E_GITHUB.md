# Guia de publicação — Portfólio no GitHub Pages

Este guia substitui as instruções antigas de publicação pela Vercel. O portfólio já está hospedado no **GitHub Pages** e é publicado automaticamente a partir do repositório `Daniel-SLima/Portfolio`.

- **Repositório:** https://github.com/Daniel-SLima/Portfolio
- **Site publicado:** https://daniel-slima.github.io/Portfolio/
- **Branch de publicação:** `main`
- **Hospedagem:** GitHub Pages
- **Deploy:** GitHub Actions, com exportação estática do projeto

## 1. Como funciona a publicação

O fluxo esperado é:

1. As alterações são feitas no projeto local.
2. Os arquivos são enviados para a branch `main` do repositório.
3. O workflow do GitHub Actions executa a rotina de publicação e gera a versão estática.
4. O GitHub Pages disponibiliza a atualização no endereço público do portfólio.

Não é necessário importar o projeto para a Vercel nem realizar um deploy manual nela.

## 2. Atualizar o portfólio com segurança

No PowerShell, entre na pasta local do projeto:

```powershell
cd C:\Users\Usuario\Documents\portfolio-daniel-lima
```

Confira a branch e se há alterações locais:

```powershell
git branch --show-current
git status
```

Antes de começar, sincronize com o repositório remoto:

```powershell
git pull --rebase origin main
```

Depois de revisar as alterações, registre e envie a atualização:

```powershell
git add .
git commit -m "update: atualiza conteúdo do portfólio"
git push origin main
```

Se não houver mudanças para registrar, o Git informará que não há nada para commit; não é preciso criar um commit vazio.

**Importante:** não use `git push --force` como procedimento normal. O force push pode sobrescrever o histórico remoto e descartar alterações. Se houver divergência ou conflito, interrompa o envio, examine o estado do Git e resolva o conflito antes de continuar.

## 3. Verificar o deploy

Após o `git push`:

1. Abra a aba **Actions** do repositório: https://github.com/Daniel-SLima/Portfolio/actions
2. Confira a execução mais recente do workflow de publicação.
3. Aguarde o workflow terminar com sucesso.
4. Acesse https://daniel-slima.github.io/Portfolio/ e valide a versão publicada.

Se a execução falhar, abra os detalhes do workflow e consulte o primeiro passo com erro antes de tentar novamente.

## 4. Configuração do GitHub Pages

No repositório, acesse **Settings → Pages** e confira se a origem de publicação está configurada para **GitHub Actions**, conforme o workflow do projeto.

O site é publicado como um projeto dentro do domínio `github.io`, no caminho `/Portfolio/`. Por isso, a configuração de exportação estática e os caminhos dos recursos precisam continuar compatíveis com esse subcaminho. Ao alterar a configuração do Next.js, valide especialmente links, imagens, CSS e navegação direta em páginas internas.

Não troque o caminho público por `/` nem remova a configuração de `/Portfolio` sem revisar e testar o deploy.

## 5. Repositórios de projetos de vitrine

Os projetos independentes continuam separados do repositório do portfólio:

- `Daniel-SLima/playwright-erp-qa-suite`
- `Daniel-SLima/saas-gestao-comercial-architecture`

Cada repositório deve ser atualizado a partir da sua própria pasta local e com seu próprio remoto. Não inicialize um Git dentro da pasta do portfólio para incorporar esses projetos como submódulos sem uma decisão explícita de arquitetura.

## 6. Checklist antes de considerar a publicação concluída

- [ ] Alterações revisadas localmente.
- [ ] Branch confirmada como `main`.
- [ ] Repositório sincronizado antes do commit.
- [ ] Commit criado e enviado sem force push.
- [ ] Workflow do GitHub Actions concluído com sucesso.
- [ ] Site público conferido em desktop e mobile.
- [ ] Links, imagens, PDFs/CVs e navegação testados.
- [ ] Caminho `/Portfolio/` preservado.

---

**Endereço oficial do portfólio:** https://daniel-slima.github.io/Portfolio/

Este documento descreve o fluxo atual de publicação via GitHub Pages; não use mais as instruções antigas de deploy pela Vercel.
