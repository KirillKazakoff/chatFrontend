# Онлайн-чат 

> ## Ссылка на сайт: [**GitHubPages**][GitHubPages]

</br>

<h2>Оглавление</h2>

- [Онлайн-чат](#онлайн-чат)
  - [Описание](#описание)
  - [Возможности](#возможности)
  - [Цели](#цели)
  - [Демонстрация](#демонстрация)
  - [Плагины](#плагины)
  - [Установка](#установка)

[![Build status](https://ci.appveyor.com/api/projects/status/2knai625p57w8cta/branch/master?svg=true)](https://ci.appveyor.com/project/KirillKazakoff/chatfrontend/branch/master)

## Описание
Онлайн-чат - это приложение, в котором пользователи могут общаться друг с другом. Передача данных между юзерами происходит по протоколу WebSocket. Пользователи авторизируются по протоколу HTTPS. </br>
Верстка неадаптивная.

## Возможности
- Организация двухстороннего обмена данных между клиентами и сервером через WS
- Синхронизация сообщений, чата и его участников у всех пользователей 
- Обработка ошибок в api-обертке

## Цели
Основной целью приложения было создать работающий чат, в котором несколько пользователей могли бы общаться друг с другом в онлайн-режиме. Здесь нет сложных проверок, аутентификации пользователей и т.д. Интерфейс максимально прост. <br/>
И backend и frontend были созданы мной полностью (fullstack-приложение).

## Демонстрация 
- ### **Логин-форма** </br>
    При входе в приложение необходимо заполнить форму и отправить её на сервер.  Если пользователь с введеным именем уже существует, то всплывет ошибка и будет необходимо заполнить форму с незанятым ранее именем
    </br>
    
    В случае отправки не на локальный сервер, а на реальный (развернутый на платформе heroku), то прием ответа займет некоторое время (около 20 - 30 секунд). На это время форма скроется, начнет крутиться лоадер.

    ![login_gif] 

- ### **Чат** </br>
    Здесь пользователи могут общаться друг с другом. Ваши сообщения будут помечены розовым цветом и будут выведены справа в чате. Сообщения от других пользователей будут слева. </br>
    Для того, чтобы тестировать возможность передачи сообщений, вам будет необходимо либо перейти по ссылке с нескольких устройств, либо открыть несколько вкладок в браузере по ссылке на сайт.
    ![interaction_gif]

- ### **Выход из чата** </br>
    Для того, чтобы покинуть чат, необходимо закрыть вкладку с приложением. Когда другие пользователи покидают чат, то они "исчезают" из списка текущих участников в боковой колонке.
    ![disconect_gif]

- ### **Обработка ошибок** </br>
    При потере соединения и попытке отправить сообщение ошибка попадет в try catch блок, а затем всплывет окно с описанием ошибки.
    ![bad_internet_gif]


## Плагины 

| Plugin              | README                                           |
| ------------------- | ------------------------------------------------ |
| Koa                 | [plugins/koa/README.md][PlKoa]                   |
| Koa-body            | [plugins/koa-body/README.md][PlKoaB]             |
| Koa-router          | [plugins/koa-router/README.md][PlKoaR]           |
| Koa-combine-routers | [plugins/koa-combine-routers/README.md][PlKoaCR] |
| Websockets          | [plugins/websockets/README.md][PlWebsockets]     |
| Webpack             | [plugins/webpack/README.md][PlWebpack]           |
| Luxon               | [plugins/luxon/README.md][PlLuxon]               |
| Nanoid              | [plugins/nanoid/README.md][PlNanoid]             |

## Установка
Если вы хотите запустить приложение, то вам необходимо отдельно клонировать два репозитория: этот (клиентская сторона) и [этот] (серверная).
После вам нужно установить зависимости в обоих проектах:
```sh
yarn
```
Затем:
- В проекте с бэкэндом запустите "dev" команду для отладки
    Иначе используйте команду "start"
    ```sh
    yarn dev
    yarn start
    ``` 

- В проекте с фронтэндом вам нужно запустить сначала скрипт "build" чтобы webpack собрал проект, а затем использовать команду "start"
  ```sh
  yarn build
  yarn start
  ```

<!-- Table  -->
[PlKoa]: <https://github.com/koajs/koa/blob/master/Readme.md>
[PlKoaB]: <https://github.com/koajs/koa-body#readme>
[PlKoaR]: <https://github.com/koajs/router#readme>
[PlKoaCR]: <https://github.com/saadq/koa-combine-routers/blob/master/README.md>
[PlWebsockets]: <https://github.com/websockets/ws/blob/master/README.md>
[PlWebpack]: <https://github.com/webpack/webpack/blob/main/README.md>
[PlLuxon]: <https://github.com/moment/luxon/blob/master/README.md>
[PlNanoid]: <https://github.com/ai/nanoid>


<!-- Links in text -->
[GitHubPages]: https://kirillkazakoff.github.io/chatFrontend/
[этот]: <https://github.com/KirillKazakoff/chatBackend>
[login_gif]: ./assets/login.gif
[interaction_gif]: ./assets/interaction.gif
[disconect_gif]: ./assets/disconect.gif
[bad_internet_gif]: ./assets/bad_internet.gif
