## Intellij IDEA configuration

 - Build for production, 
 just create gradle **bootWar** task with argument **-Pprod**

 - Build and run front-end path, 
 just create new **NPM** configuration with **Run** command, argument **webpack:dev**
 and for **before launch** block add gradle task **clean compileJava**

Schema :

    before Npm - gradle task 'clean compileJava', then : 'webpack:dev'

 - Build and run back-end path, 
 after running **NPM** task, just run **Spring Boot** task

[Back][back]

[back]: https://github.com/sergey-didenko/my-blog/blob/master/README.md
