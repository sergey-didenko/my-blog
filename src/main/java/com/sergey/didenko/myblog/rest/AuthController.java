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

package com.sergey.didenko.myblog.rest;

import com.sergey.didenko.myblog.db.dao.RoleRepository;
import com.sergey.didenko.myblog.db.dao.UserRepository;
import com.sergey.didenko.myblog.db.dto.LoginDTO;
import com.sergey.didenko.myblog.db.dto.RegisterDTO;
import com.sergey.didenko.myblog.db.dto.UserDTO;
import com.sergey.didenko.myblog.db.entity.Role;
import com.sergey.didenko.myblog.db.entity.User;
import com.sergey.didenko.myblog.db.enums.RoleEnum;
import com.sergey.didenko.myblog.security.jwt.JwtProvider;
import com.sergey.didenko.myblog.security.AuthoritiesConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
@Transactional
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtProvider jwtProvider;

    /**
     * localhost:8080/api/auth
     *
     * @return UserDTO if token exist
     */
    @GetMapping()
    @Secured(AuthoritiesConstants.USER)
    public ResponseEntity<UserDTO> auth() {
        return ResponseEntity.ok(new UserDTO(getCurrentUser()));
    }

    /**
     * localhost:8080/api/auth/login
     *
     * @param loginDTO
     * @return UserDTO and Authorization Header
     */
    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@Valid @RequestBody LoginDTO loginDTO) {

        String jwt = authorization(loginDTO.getUsername(), loginDTO.getPassword());
        UserDTO userDTO = getCurrentUserDTO();

        return ResponseEntity.ok().headers(generateHttpHeaderWithToken(jwt)).body(userDTO);
    }

    /**
     * localhost:8080/api/auth/register
     *
     * @param registerDTO
     * @return UserDTO and Authorization Header
     */
    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@Valid @RequestBody RegisterDTO registerDTO) {
        if (userRepository.existsByUsername(registerDTO.getUsername())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(registerDTO.getName(), registerDTO.getUsername(), registerDTO.getEmail(),
                encoder.encode(registerDTO.getPassword()));

        Set<Role> roles = new HashSet<>();

        Role userRole = roleRepository.findByRole(RoleEnum.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
        roles.add(userRole);

        user.setRoleSet(roles);
        userRepository.save(user);

        String jwt = authorization(registerDTO.getUsername(), registerDTO.getPassword());
        UserDTO userDTO = getCurrentUserDTO();

        return ResponseEntity.ok().headers(generateHttpHeaderWithToken(jwt)).body(userDTO);
    }

    private String authorization(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateJwtToken(authentication);
    }

    private HttpHeaders generateHttpHeaderWithToken(String jwt) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", jwt);

        return httpHeaders;
    }

    private UserDTO getCurrentUserDTO() {
        User user = getCurrentUser();
        if (user != null) {
            return new UserDTO(user);
        }

        return null;
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            return userRepository.findByUsername(userDetails.getUsername()).orElse(null);
        }

        return null;
    }


}
