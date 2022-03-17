USE db;
CREATE TABLE IF NOT EXISTS `transfers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `description` varchar(100) NOT NULL,
  `status` bit(1) NOT NULL,
  `type` bigint(20) NOT NULL,
  `value` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;