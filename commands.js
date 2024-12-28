import "dotenv/config";
import { InstallGlobalCommands } from "./utils.js";
import { MY_TYPES } from "./myTypes.js";

// Get the game choices from game.js

// Simple test command
const TEST_COMMAND = {
  name: "test",
  description: "Basic command",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ABUSE_ANYONE = {
  name: "abuse",
  description: "Abuse someone with a random insult",
  options: [
    {
      type: 6, // USER type
      name: "user",
      description: "The user to abuse",
      required: true,
    },
  ],
};
const ADD_NEW_GALI = {
  name: "new-gali",
  description: "Add a new gali to the list",
  options: [
    {
      type: 3, // STRING type
      name: "text",
      description: "The abusive phrase to add",
      required: true,
    },
  ],
};

// Command containing options
// const CHALLENGE_COMMAND = {
//   name: 'challenge',
//   description: 'Challenge to a match of rock paper scissors',
//   options: [
//     {
//       type: 3,
//       name: 'object',
//       description: 'Pick your object',
//       required: true,
//       choices: createCommandChoices(),
//     },
//   ],
//   type: 1,
//   integration_types: [0, 1],
//   contexts: [0, 2],
// };

const ALL_COMMANDS = [
  //
  TEST_COMMAND,
  ABUSE_ANYONE,
  ADD_NEW_GALI,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
