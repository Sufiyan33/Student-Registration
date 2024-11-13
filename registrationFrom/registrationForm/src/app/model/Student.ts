export class StudentModel  {
    id?: number;
    name: string;
    course: string;
    fees: number;

    constructor(){
        this.name = '';
        this.course = '';
        this.fees = 0;
    }
}