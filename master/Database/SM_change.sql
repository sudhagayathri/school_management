use `UserDB`;

ALTER TABLE `TeacherDetails` ADD COLUMN `photo` VARCHAR(45) NOT NULL AFTER type;
ALTER TABLE `TeacherDetails` MODIFY `photo` BLOB NOT NULL;
ALTER TABLE `StudentDetails` MODIFY `photo` BLOB NOT NULL;
