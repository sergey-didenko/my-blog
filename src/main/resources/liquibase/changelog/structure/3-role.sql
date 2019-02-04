--liquibase formatted sql

--changeset Sergey-Didenko:3
CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_nb4h0p6txrmfc0xbrd1kglp9t` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
--rollback drop table role;
