const exam  = require("./examen");

class Student {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = this.fullName.bind(this);
        this.examen = this.examen.bind(this);
        this.average = this.average.bind(this);
        this.level = 1;
        this.grade = [];
    }

    fullName() {
        return this.firstName + ' ' + this.lastName;
    };

    examen(fonction) {
        if (this.level>10) throw new Error("Over 10 thousand");
        else if (this.level<0) throw new Error("Under 0");
        else if (this.level === null) throw new Error("is null");


        if (fonction === undefined) {
            this.grade.push("def");
        } else {
            this.grade.push(fonction(this.level));
        }
    }

    average() {
        if (this.grade.length === 0){
            return 0;
        }

        let avg = 0;

        this.grade.forEach(function(value) {
            if (value !== 'def'){
                avg += value;
            }
        });

        avg /= this.grade.length;
        return avg;
    }
}

module.exports = Student;