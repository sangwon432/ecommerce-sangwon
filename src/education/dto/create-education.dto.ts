import { EducationLevel } from '@common/enums/education-level.enum';

export class CreateEducationDto {
  highschoolName: string;
  universityName: string;
  fieldOfStudy: string[];
  educationLevel: EducationLevel;
}
