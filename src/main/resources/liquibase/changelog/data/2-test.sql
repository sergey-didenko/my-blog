--liquibase formatted sql

--changeset Sergey-Didenko:2
--preconditions onFail:CONTINUE onError:CONTINUE
--precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM test
INSERT INTO `test` VALUES (1, 'test');
--rollback delete from test where id in (1);
