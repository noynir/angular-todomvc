
export class TaskModel {
	id: number;
	title: string;
	completed: boolean;

	constructor(id: number, title: string, completed?: boolean) {
		this.id = id;
		this.title = title;
		this.completed = completed ? completed : false;
	}
}
