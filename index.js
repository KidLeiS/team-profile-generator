const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Empty team array
const team = [];

// Questions for the Manager prompts
const initQs = [
    { name: "Name", type: "input", message: "What is the team manager's name? "},
    { name: "ID", type: "input", message: "What is the team manager's employee ID? "},
    { name: "Email", type: "input", message: "What is the team manager's email? "},
    { name: "Office", type: "input", message: "What is the team manager's office number? "}
];

// Questions for the Engineer prompts
const engineerQs = [
    { name: "Name", type: "input", message: "What is the engineer's name? "},
    { name: "ID", type: "input", message: "What is the engineer's employee ID? "},
    { name: "Email", type: "input", message: "What is the engineer's email? "},
    { name: "Github", type: "input", message: "What is the engineer's Github username? "}
];

// Questions for the Intern prompts
const internQs = [
    { name: "Name", type: "input", message: "What is the inten's name? "},
    { name: "ID", type: "input", message: "What is the intern's employee ID? "},
    { name: "Email", type: "input", message: "What is the intern's email? "},
    { name: "School", type: "input", message: "What school does the intern go to? "}
];

// Code to enter a new engineer (and returning user to the team creation screen)
const newEngineer = () => {
    inquirer.prompt(engineerQs).then((ans) => {
        team.push(new Engineer(ans.Name, ans.ID, ans.Email, ans.Github));
        teamCreation();
    })
}

// Code to enter a new intern (and returning user to the team creation screen)
const newIntern = () => {
    inquirer.prompt(internQs).then((ans) => {
        team.push(new Intern(ans.Name, ans.ID, ans.Email, ans.School));
        teamCreation();
    })
}

// Team creation screen - users have 3 options each instance
const teamCreation = () => {
    inquirer.prompt([
        { name: "selector", type: "list", message: "Choose an option:", choices: ["Add an engineer", "Add an intern", "Finish building the team"]}
    ]).then((ans) => {
        if (ans.selector === "Add an engineer") {
            newEngineer();
        } else if (ans.selector === "Add an intern") {
            newIntern();
        } else if (ans.selector === "Finish building the team") {

            // To render the HTML file and stop returning the user back to the team creation screen
            fs.writeFile(outputPath, render(team), (err) => {
                err ? console.error('Error writing file'): console.log('Team profile generated successfully!');
            });
        }
    })
}

// Init function, which creates the Manager entry and then directs user to team creation screen
const init = () => {
    inquirer.prompt(initQs).then((ans) => {
        team.push(new Manager(ans.Name, ans.ID, ans.Email, ans.Office));

        teamCreation();
    })

    
}


// To start the function
init();