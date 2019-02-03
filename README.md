# My Blog

## About
#### Few words

My personal open source blog project,

using on my web page :

https://sergey-didenko.pro

#### Technology stack
**Front-end stack :**
 - [Angular/TypeScript][] - web framework
 - [Angular material][] and [NG Bootstrap][] - UI components, styles
 - [NGX Translate][] - i18n translation tools
 - [Webpack][] - JS pack system
 - [NPM from NodeJS][Node.js] - packet manager and build system
 
 **Back-end stack :**
 - [Spring boot][] - java web framework
 - **Embeded Tomcat** - servlet container to run project
 - [Gradle][] - build system

#### Features

[Changelog][changelog]

[TODO Features][features_todo]

## Project Installation
#### Node JS

Before you can build this project, you must install and configure the [Node.js][]

#### Npm Install

After installing Node, you should be able to run the following command to install dependency :

    npm install

or gradle task :

    ./gradlew npm_install

## Build configuration
#### Terminal tasks

**BootRun** - build and run project via terminal

    ./gradlew bootRun

**BootWar** - build project for production

    ./gradlew -Pprod bootWar

**Jar** Command to run binary

    java -jar build/libs/*.war

#### Intellij IDEA configuration

 - Build for production, 
 just create gradle **bootWar** task with argument **-Pprod**

 - Build and run front-end path, 
 just create new **NPM** configuration with **Run** command, argument **webpack:dev** 
 and for **before launch** block add gradle task **clean compileJava**

 - Build and run back-end path, 
 after running **NPM** task, just run **Spring Boot** task

[Tutorial with screenshots][idea_tutorial]

[Angular/TypeScript]: https://angular.io/
[Angular material]: https://material.angular.io/
[NG Bootstrap]: https://github.com/ng-bootstrap/ng-bootstrap
[NGX Translate]: https://github.com/ngx-translate

[Spring boot]: https://spring.io/
[Embeded Tomcat]: http://tomcat.apache.org/
[Gradle]: https://gradle.org/

[Node.js]: https://nodejs.org/
[Webpack]: https://webpack.github.io/

[changelog]: https://github.com/sergey-didenko/my-blog/blob/master/CHANGELOG.md
[features_todo]: https://github.com/sergey-didenko/my-blog/blob/master/doc/TODO_FEATURES.md

[idea_tutorial]: https://github.com/sergey-didenko/my-blog/blob/master/doc/IDEA_TUTORIAL.md
