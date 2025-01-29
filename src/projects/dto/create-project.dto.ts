import ProjectStatusEnum from "../enums/projectStatusEnum";

export class CreateProjectDto {
    name:string;
    status: ProjectStatusEnum;
}
