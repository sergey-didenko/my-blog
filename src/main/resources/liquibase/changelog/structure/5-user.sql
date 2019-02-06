--liquibase formatted sql

--changeset Sergey-Didenko:5
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT '',
  `email` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT '',
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `u_u` (`username`) USING BTREE,
  UNIQUE INDEX `u_e` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
--rollback drop table user;
