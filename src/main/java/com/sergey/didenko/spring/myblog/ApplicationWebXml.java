/*
Copyright 2019 Sergey Didenko <sergey.didenko.dev@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

		http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package com.sergey.didenko.spring.myblog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import java.util.HashMap;
import java.util.Map;

public class ApplicationWebXml extends SpringBootServletInitializer {

    private static final String SPRING_PROFILE_DEFAULT = "spring.profiles.default";

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        /**
         * set a default to use when no profile is configured.
         */
        ApplicationWebXml.addDefaultProfile(application.application());
        return application.sources(MyBlogApplication.class);
    }

    static void addDefaultProfile(SpringApplication app) {
        Map<String, Object> defProperties = new HashMap<>();
        /*
         * The default profile to use when no other profiles are defined
         * This cannot be set in the <code>application.yml</code> file.
         * See https://github.com/spring-projects/spring-boot/issues/1219
         */
        defProperties.put(SPRING_PROFILE_DEFAULT, "dev");
        app.setDefaultProperties(defProperties);
    }
}
