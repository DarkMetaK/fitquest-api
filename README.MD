<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://github.com/DarkMetaK/fitquest-api">
    <img src="https://raw.githubusercontent.com/DarkMetaK/fitquest-app/refs/heads/master/public/Logo.svg" alt="Logo" width="165" height="30">
  </a>
  
  <h3 align="center">Fitquest - API</h3>

  <p align="center">
    Aplicativo de atividades físicas com gamificação
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre">Sobre o projeto</a>
      <ul>
        <li><a href="#tecnologias">Tecnologias usadas</a></li>
      </ul>
    </li>
    <li>
      <a href="#como-rodar-o-projeto">Como rodar o projeto</a>
    </li>
    <li><a href="#contato">Contato</a></li>
    <li><a href="#agradecimentos">Agradecimentos</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Sobre

<a href="https://youtu.be/wAHg-hRq9i8">
    <img src="https://raw.githubusercontent.com/DarkMetaK/fitquest-app/refs/heads/master/public/preview.png" alt="Fitquest Preview" width=100%>
</a>

## Sobre o projeto

Fitquest é um aplicativo que combina atividade física e recompensas para incentivar um estilo de vida mais saudável. Por meio de atividades como exercícios e caminhadas, os usuários acumulam pontos que podem ser trocados por cupons para sorteios de prêmios ou descontos em empresas parceiras.

O back-end deste projeto foi desenvolvido com foco em desempenho e organização, utilizando práticas modernas como <strong>Clean Architecture</strong>, <strong>Publisher/Subscriber</strong> e <strong>Test-Driven Development (TDD)</strong>. Ele é responsável por gerenciar funcionalidades essenciais, como o registro de atividades, cálculo de pontos e integração com parceiros para oferecer cupons e sorteios.

A aplicação oferece 100% de cobertura de testes, garantindo alta confiabilidade, e utiliza Docker para facilitar a configuração e execução do ambiente com postgres. Para visualizar uma demonstração do uso e das funcionalidades, [clique aqui](https://youtu.be/wAHg-hRq9i8)

### Design Patterns aplicados
- Singleton
- Factory

### Tecnologias usadas
[![Fastify][Fastify]][Fastify-url]<br>
[![Node][Node]][Node-url]<br>
[![TypeScript][TypeScript]][TypeScript-url]<br>
[![Docker][Docker]][Docker-url]<br>
[![Prisma][Prisma]][Prisma-url]<br>
[![Postgres][Postgres]][Postgres-url]<br>

<p align="right">(<a href="#readme-top">Retornar ao topo</a>)</p>

<!-- GETTING STARTED -->
## Como rodar o projeto

1 - Clone o repositório
```sh
git clone https://github.com/DarkMetaK/fitquest-api.git
cd fitquest-api
```

2 - Instale as dependências do projeto.

```
npm i
```

3 - Configure as variáveis de ambiente
```sh
cp .env.example .env
```

4 - Certifique-se de ter o Docker instalado e em execução. Em seguida, suba os contêineres:
```sh
docker compose up -d
```

5 - Execute as migrações do banco de dados
```sh
npx prisma migrate dev
```

6 - Popule o banco de dados com dados fictícios (opcional)
```sh
npm run db:seed
```

7 - Adicione mídias na pasta uploads (opcional)
```sh
mkdir uploads
```

8 - Execute a aplicação com o seguinte comando.
```sh
npm run dev
```

<p align="right">(<a href="#readme-top">Retornar ao topo</a>)</p>

<!-- CONTACT -->
## Contatos
Matheus Porto - [LinkedIn](https://www.linkedin.com/in/matheusport0/) - [Website](https://www.matporto.live/pt) - matporto03@gmail.com

Link Repositório: [https://github.com/DarkMetaK/fitquest-api](https://github.com/DarkMetaK/fitquest-api)

<p align="right">(<a href="#readme-top">Retornar ao topo</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Agradecimentos
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [Img Shields](https://shields.io)

<p align="right">(<a href="#readme-top">Retornar ao topo</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[Fastify]: https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white
[Fastify-url]: https://fastify.dev/

[Node]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/

[TypeScript]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=for-the-badge
[TypeScript-url]: https://www.typescriptlang.org/

[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/

[Prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/

[Postgres]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/
