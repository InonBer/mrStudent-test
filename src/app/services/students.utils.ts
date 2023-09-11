interface Student {
    id: string;
    name: string;
    grade: string;
    email: string;
    dateJoined: Date;
    address: string;
    gradesOverTime: Array<{ subject: string; grade: number; date: Date }>;
    city: string;
    country: string;
    zip: string;
    subject: string;
  }
  
  function getRandomInt(min: number, max: number) {
    // Helper function to generate a random integer between min and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function formatDateToDDMMYYYY(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  function getRandomDate(from: Date, to: Date) {
    // Helper function to generate a random date between from and to
    return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
  }
  
  export function getRandomStudents(numStudents: number): Student[] {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      return JSON.parse(savedStudents);
    }else{


    const students: Student[] = [];
    const subjects = ['Math', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography'];
    for (let i = 1; i <= numStudents; i++) {
      const gradesOverTimeCount = getRandomInt(3, 6); // Random number of grades over time (between 3 and 6)
     
      const day = getRandomInt(1, 31); // Random day between 1 and 31
    const month = getRandomInt(1, 12); // Random month between 1 and 12
    const year = getRandomInt(2000, 2023); // Random year between 2000 and 2023

      const student: Student = {
        id: `${i}`,
        name: `Student ${i}`,
        grade: `${getRandomInt(9, 12)}th`, // Random grade between 9th and 12th
        email: `student${i}@example.com`,
        dateJoined:  new Date(year, month - 1, day), // Joined date between 2015 and today
        address: `${getRandomInt(100, 999)} Elm Street`,
        gradesOverTime: [],
        city: `City ${i}`,
        country: `Country ${i}`,
        zip: `ZIP${i}`,
        subject: subjects[getRandomInt(0, subjects.length - 1)],
      };
  
      for (let j = 1; j <= gradesOverTimeCount; j++) {
        student.gradesOverTime.push({
          subject: subjects[getRandomInt(0, subjects.length - 1)], // Random subject
          grade: getRandomInt(30, 100), // Random grade between 60 and 100
          date: getRandomDate(student.dateJoined, new Date()), // Date within the student's enrollment period
        });
      }
  
      students.push(student);
    }
    
    localStorage.setItem('students', JSON.stringify(students));
    return students;
  }

  }
  
  // Example: Generate 15 random students
  