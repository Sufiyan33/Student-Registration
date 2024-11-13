export class StudentModel  {
    id: number;
    name: string;
    course: string;
    fees: number;

    constructor(){
        this.id = 0;
        this.name = '';
        this.course = '';
        this.fees = 0;
    }
}