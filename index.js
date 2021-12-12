// Imports
const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const Manager = require('./lib/Manager.js');

// Hold Info For Each Card
let employees = [];

// Creates Cards From Employees Array
const createCards = (employees) => {
    let cards = [];

    for (let i = 0; i < employees.length; i++) {
        const employeeRole = employees[i].getRole(); 


        if (employeeRole === 'Manager') {
            const manager = managerCard(employees[i]);
            cards.push(manager);
        }

        if (employeeRole === 'Intern') {
            const intern = internCard(employees[i]);
            cards.push(intern);
        }
        
        if (employeeRole === 'Engineer') {
            const engineer = engineerCard(employees[i]);
            cards.push(engineer);
        }
    }
  return createPagehtml(cards);
}

// Creates Manager Card
let managerCard = (Manager) => {
  return `
  <div class="card m-3 p-0">
        <div class="card-header bg-primary text-white">
            <h2>${Manager.name}</h3>
            <h4><i class="bi bi-briefcase-fill"></i> ${Manager.getRole()}</h4>
        </div>
        <div class="card-body bg-light">
            <ul class="list-group">
                <li class="list-group-item">ID: ${Manager.id}</li>
                <li class="list-group-item">Email: <a href="mailto:${Manager.email}">${Manager.email}</a></li>
                <li class="list-group-item">Office Number: ${Manager.getOfficeNumber()}</li>
            </ul>
        </div>
    </div>
  `
}

// Creates Engineer Card
let engineerCard = (Engineer) => {
  return `
  <div class="card m-3 p-0">
        <div class="card-header bg-primary text-white">
            <h2>${Engineer.name}</h3>
            <h4><i class="bi bi-code-slash"></i> ${Engineer.getRole()}</h4>
        </div>
        <div class="card-body bg-light">
            <ul class="list-group">
                <li class="list-group-item">ID: ${Engineer.id}</li>
                <li class="list-group-item">Email: <a href="mailto:${Engineer.email}">${Engineer.email}</a></li>
                <li class="list-group-item">GitHub: ${Engineer.getGithub()}</li>
            </ul>
        </div>
    </div>
  `
};

// Creates Intern Card
let internCard = (Intern) => {
  return `
  <div class="card m-3 p-0">
        <div class="card-header bg-primary text-white">
            <h2>${Intern.name}</h3>
            <h4><i class="bi bi-mortarboard-fill"></i> ${Intern.getRole()}</h4>
        </div>
        <div class="card-body bg-light">
            <ul class="list-group">
                <li class="list-group-item">ID: ${Intern.id}</li>
                <li class="list-group-item">Email: <a href="mailto:${Intern.email}">${Intern.email}</a></li>
                <li class="list-group-item">School: ${Intern.getSchool()}</li>
            </ul>
        </div>
    </div>
  `
}

//Create Code for HTML File
const createPagehtml = (cards) => {
return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">    <link rel="stylesheet" href="style.css" />
    <title>My Team</title>
</head>
<body>
    <h1>My Team</h1>
    <div class="container d-flex flex-wrap justify-content-center">
            ${cards}
    </div>
</body>
</html>
    `
}


// Ask User For Manager Info
const managerPrompt = () => {
    console.log(`
    Add Manager
    `);
    return inquirer.prompt ([
      {
        type: 'input',
        name: 'name',
        message: 'Enter managers name.',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter managers name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'id',
        message: 'Enter managers ID',
        validate: idInput => {
          if (idInput) {
            return true;
          } else {
            console.log('Please enter managers ID!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter managers email address',
        validate: emailInput => {
          if (emailInput) {
            return true;
          } else {
            console.log('Please enter managers email address!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'id',
        message: 'Enter managers ID',
        validate: idInput => {
          if (idInput) {
            return true;
          } else {
            console.log('Please enter managers ID!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: 'Enter managers office number',
        validate: officeNumberInput => {
          if (officeNumberInput) {
            return true;
          } else {
            console.log('Please enter managers office number!');
            return false;
          }
        }
      }
    ])
    .then(data => {
        // Create New Manager Object and Push to Employee Array
        const  { name, id, email, officeNumber } = data; 
        const manager = new Manager (name, id, email, officeNumber);
        employees.push(manager); 
    })
}

// Ask User For Employee Info
const employeePrompt = () => {

    console.log(`
    Add Employees
    `);

    return inquirer.prompt ([
    {
        type: 'list',
        name: 'role',
        message: "Enter employee's role",
        choices: ['Engineer', 'Intern']
    },
    {
        type: 'input',
        name: 'name',
        message: "Enter employee's name?", 
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log ("Please enter employee's name!");
                return false; 
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter employee's ID",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log ("Please enter employee's ID!");
                return false; 
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter employee's email",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log ("Please enter employee's email!");
                return false; 
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: "Enter employee's GitHub",
        when: (input) => input.role === "Engineer",
        validate: githubInput => {
            if (githubInput ) {
                return true;
            } else {
                console.log ("Please enter employee's GitHub!")
            }
        }
    },
    {
        type: 'input',
        name: 'school',
        message: "Enter intern's school",
        when: (input) => input.role === "Intern",
        validate: schoolInput => {
            if (schoolInput) {
                return true;
            } else {
                console.log ("Please enter intern's school!")
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmNewEmployee',
        message: 'Would you like to enter another employee?',
        default: false
    }
    ])
    .then(Data => {
        // Create New Employee Objects and Push to Employee Array
        let { name, id, email, role, github, school, confirmNewEmployee } = Data; 
        let employee; 

        if (role === "Intern") {
            employee = new Intern (name, id, email, school);

        } else if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);
        }

        employees.push(employee); 

        if (confirmNewEmployee == true) {
            return employeePrompt(employees); 
        } else {
            return employees;
        }
    })
};

// Create HTML File
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
          reject(err);
          console.log("error writing file");
          return;
        } else {
            console.log('File created!');
            return
        };
    });
};

// Copy Existing CSS File
const copyFile = () => {
    fs.copyFile('./src/style.css', './dist/style.css', err => {
        if (err) {
          reject(err);
          return;
        } else {
            console.log('File created!');
            return
        };
    });
};

// Initialize App
function init() {
    managerPrompt()
    .then(employeePrompt)
    .then(employees => {
        return createCards(employees)
    })
    .then(data => {
        return writeFile(data);
    })
    .then(copyFile)
};
    
init();