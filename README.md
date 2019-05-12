## My Blog

### About
My personal open source blog project,
using on my web page : [https://sergey-didenko.pro](https://sergey-didenko.pro)

**The project was created to solve several problems:**

- Develop the right technology stack
- Develop a convenient and flexible **blog** using the latest technology
- To consolidate knowledge in the development and try new solutions
- To consolidate knowledge in project management
- **Educational material** for novice programmers,
as the project is developed "from scratch".
The development process is as close as possible to the workflow,
and therefore I hope it will be useful to someone.

## Releases

[[ver. 1.0] (2017-02-6)](https://github.com/sergey-didenko/my-blog/releases/tag/1.0)

## Features

[Documentation](https://doc.sergey-didenko.pro/) - DB Models, UML Diagrams

[Board][board]

[Changelog][changelog]

## Technology stack
**Front-end stack :**
 - [Angular/TypeScript][] - web framework
 - [Angular material][] and [NG Bootstrap][] - UI components, styles
 - [HttpInterceptor][] - transform request before passing it
 - [NGX WebStorage][] - web storage's (local and session)
 - [NGX Translate][] - i18n translation tools
 - [Webpack][] - JS pack system
 - [NPM from NodeJS][Node.js] - packet manager and build system
 
 **Back-end stack :**
 - [JPAModelGen][] - meta-model generator for JPA2
 - [JsonWebToken][] - implementation of JWT, JWS, JWE, JWK, JWA specs
 - [Spring Security][] - authentication and access-control framewor
 - [Liquibase][] - DB migration tool
 - [Spring boot][] - java web framework
 - [Embedded Tomcat][] - servlet container to run project
 - [Gradle][] - build system

## Project Installation
#### Node JS

Before you can build this project, you must install and configure the [Node.js][]

#### Npm Install

After installing Node, you should be able to run the following command to install dependency :

    npm install

or gradle task :

    bash ./gradlew npm_install

    ./gradlew.bat npm_install

#### Fix NPM for Linux users

You should fix **NPM** permissions:

    sudo chown -R $(whoami) $HOME/.npm
    sudo chmod -R 0777 $HOME/.npm
    sudo chown -R $(whoami) /usr/lib/node_modules
    sudo chmod -R 0777 /usr/lib/node_modules

Then install **rimraf** globally:

    sudo npm install rimraf -g

And then fix permissions for **rimraf**:

    sudo chown -R $(whoami) /usr/bin/rimraf
    sudo chmod -R 0777 /usr/bin/rimraf

## Build configuration
#### Terminal tasks

**BootRun** - build and run project via terminal

    bash ./gradlew bootRun

    ./gradlew.bat bootRun

**BootWar** - build project for production

    bash ./gradlew -Pprod bootWar

    ./gradlew.bat -Pprod bootWar

**Jar** Command to run binary

    java -jar build/*.war

#### Intellij IDEA configuration

 - **Delegate to gradle** - 
 Press **Ctrl+Alt+S**, go to **Build, Execution, Deployment** -> **Build Tools** -> **Gradle** -> **Runner**
 and enable checkbox **Delegate IDE build/run actions to gradle**

 - **Build for production** - 
 just create gradle **bootWar** task with argument **-Pprod**

 - **Build and run front-end path** - 
 just create new **NPM** configuration with **Run** command, argument **webpack:dev** 
 and for **before launch** block add gradle task **clean**

 - **Build and run back-end path** - 
 after running **NPM** task, just run **Spring Boot** task

[Tutorial with screenshots][idea_tutorial]

[Angular/TypeScript]: https://angular.io/
[Angular material]: https://material.angular.io/
[NG Bootstrap]: https://github.com/ng-bootstrap/ng-bootstrap
[NGX Translate]: https://github.com/ngx-translate
[NGX WebStorage]: https://www.npmjs.com/package/ngx-webstorage
[HttpInterceptor]: https://angular.io/api/common/http/HttpInterceptor

[JsonWebToken]: https://github.com/jwtk/jjwt
[Spring Security]: https://spring.io/projects/spring-security
[Spring boot]: https://spring.io/
[JPAModelGen]: https://docs.jboss.org/hibernate/jpamodelgen/1.0/reference/en-US/html_single
[Liquibase]: https://www.liquibase.org/
[Embedded Tomcat]: http://tomcat.apache.org/
[Gradle]: https://gradle.org/

[Node.js]: https://nodejs.org/
[Webpack]: https://webpack.github.io/

[changelog]: https://github.com/sergey-didenko/my-blog/blob/master/CHANGELOG.md
[board]: https://github.com/sergey-didenko/my-blog/projects/1

[idea_tutorial]: https://github.com/sergey-didenko/my-blog/blob/master/doc/IDEA_TUTORIAL.md
