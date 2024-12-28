import "dotenv/config";
import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from "discord-interactions";
import { ABUSES } from "./abuses.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Check required environment variables
if (!process.env.PUBLIC_KEY) {
  console.error("Error: PUBLIC_KEY is not defined in environment variables.");
  process.exit(1);
}

app.post(
  "/interactions",
  verifyKeyMiddleware(process.env.PUBLIC_KEY),
  async function (req, res) {
    try {
      const { type, data } = req.body;

      if (type === InteractionType.APPLICATION_COMMAND) {
        const { name, options } = data;

        if (name === "abuse") {
          // Get the mentioned user (assuming the "user" option exists in your slash command)
          const userOption = options?.find((option) => option.name === "user");
          const mentionedUser = userOption?.value; // This is the user's ID

          if (mentionedUser) {
            // Get a random abuse message
            const randomIndex = Math.floor(Math.random() * ABUSES.length);
            const randomAbuse = ABUSES[randomIndex];

            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: `<@${mentionedUser}> ${randomAbuse}`, // Tag the user with their abuse
              },
            });
          } else {
            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: "You need to mention someone to abuse!",
              },
            });
          }
        }
        if (name === "new-gali") {
          const galiOption = options?.find((option) => option.name === "text");
          const newGali = galiOption?.value;

          if (newGali) {
            // Save the new abusive phrase
            ABUSES.push(newGali);
            console.log("New gali added:", newGali);

            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: `New gali added: "${newGali}"`,
              },
            });
          } else {
            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: "Please provide a gali to add.",
              },
            });
          }
        }

        // Unknown command handling
        console.error(`Unknown command received: ${name}`);
        return res.status(400).json({ error: `Unknown command: ${name}` });
      }

      // Unknown interaction type handling
      console.error("Unknown interaction type:", type);
      return res
        .status(400)
        .json({ error: `Unknown interaction type: ${type}` });
    } catch (error) {
      return res.status(400).json({ error: `Something went wrong try again` });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
