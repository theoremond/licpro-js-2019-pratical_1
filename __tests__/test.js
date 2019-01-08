const string = require('../src/string');
const fonction = require('../src/fonction');
const Student = require('../src/Student');
const {hard, easy} = require('../src/examen');

// Futher import's module

test('default export of module string return "Hi"', () => {
  expect(string).toBe('Hi');
});

test('default export of module fonction return a function', () => {
  expect(fonction).toBeInstanceOf(Function);
});

test('default export of module student return a class', () => {
  expect(Student).toBeInstanceOf(Function);
});

test('export of module examen return "easy" and "hard" function', () => {
  expect(easy).toBeInstanceOf(Function);
  expect(hard).toBeInstanceOf(Function);
});

test('default export of module fonction return value passing in parameter', () => {
  expect(fonction(6)).toBe(6);
});

test('default export of module student return a instance of Student', () => {
  expect(new Student()).toBeInstanceOf(Student);
});

test('Student class has constructor firstName and lastName and property with the same name', () => {
  const student = new Student('Claude', 'Dioudonnat');
  expect(student.firstName).toBe('Claude');
  expect(student.lastName).toBe('Dioudonnat');
});

test('Student class has method "fullName"', () => {
  const student = new Student('Claude', 'Dioudonnat');
  expect(student.fullName).toBeInstanceOf(Function);
});

test('Student method "fullName" return the fullName of the student', () => {
  const student = new Student('Claude', 'Dioudonnat');
  expect(student.fullName()).toBe('Claude Dioudonnat');
});

test('Student method should be only bind for the current student', () => {
  const student = new Student('Claude', 'Dioudonnat');
  const fullName = student.fullName;
  expect(fullName()).toBe('Claude Dioudonnat');
})

test('Studen class shoudl have a function "examen" defined in class definition"', () => {
  expect(Student.prototype.examen).toBeInstanceOf(Function);
});

test('The Student\'s method "examen" shoudl call the first parameter has an function', () => {
  const student = new Student('Claude', 'Dioudonnat');

  const mockedExamen = jest.fn();
  student.examen(mockedExamen);

  expect(mockedExamen).toHaveBeenCalled();
});

test('The Student\'s class should have a number property "level"', () => {
  const student = new Student('Claude', 'Dioudonnat');
  expect(typeof student.level).toBe('number');
});

test('The Student\'s method "examen" should call the case callback with value of "level"', () => {
  const student = new Student('Claude', 'Dioudonnat');

  const mockedExamen = jest.fn();
  student.examen(mockedExamen);

  expect(mockedExamen).toHaveBeenCalledWith(student.level);
});

test('The Student\'s method "examen" should set the value return by the callback in array "grade" property', () => {
  const student = new Student('Claude', 'Dioudonnat');
  student.examen(() => {
    return 9;
  });
  expect(student.grade[0]).toBe(9);
  student.examen(() => {
    return 15;
  });
  expect(student.grade[1]).toBe(15);
  expect(student.grade.length).toBe(2);
});

test('The Student\'s should have method "average" who compute grade\'s average', () => {
  const student = new Student('Claude', 'Dioudonnat');
  student.examen(() => {
    return 9;
  });
  expect(student.grade[0]).toBe(9);
  student.examen(() => {
    return 15;
  });
  expect(student.average()).toBe(12);
})

test('The Student\'s method "examen" should push "def" in "grade" array when callback is undefined', () => {
  const student = new Student('Claude', 'Dioudonnat');
  student.examen(() => {
    return 9;
  });
  student.examen();
  expect(student.grade[0]).toBe(9);
  expect(student.grade[1]).toBe("def");
  expect(student.grade.length).toBe(2);
});

test('Test average with a "def" value in grade', () => {
  const student = new Student('Claude', 'Dioudonnat');
  student.examen(() => {
    return 9;
  });
  expect(student.grade[0]).toBe(9);
  student.examen(() => {
    return 15;
  });
  student.examen();
  expect(student.average()).toBe(8);
});

test('Test average with 0 grade should return 0', () => {
  const student = new Student('Claude', 'Dioudonnat');
  expect(student.average()).toBe(0);
});

test('"easy" function should multiply parameter by 2', () => {
  expect(easy(8)).toBe(16);
});

test('"hard" function should multiply parameter by 0.5', () => {
  expect(hard(8)).toBe(4);
});

test('Student\'s method "examen" should throw an error when level > 10', () => {
  expect(() => {
    const student = new Student('Claude', 'Dioudonnat');
    student.level = 11;
    student.examen(() => { return 15; });
  }).toThrow();
});

test('Student\'s method "examen" should throw an error when level < 0', () => {
  expect(() => {
    const student = new Student('Claude', 'Dioudonnat');
    student.level = -1;
    student.examen(() => { return 15; });
  }).toThrow();
});

test('Student\'s method "examen" should throw an error when level is null', () => {
  expect(() => {
    const student = new Student('Claude', 'Dioudonnat');
    student.level = null;
    student.examen(() => { return 15; });
  }).toThrow();
});

test('Student\'s method "examen" should throw an error when level is 0', () => {
  const student = new Student('Claude', 'Dioudonnat');
  student.level = 0;
  student.examen(() => { return 5; });
  expect(student.grade[0]).toBe(5);
});
