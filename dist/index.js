import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { XMLParser } from "fast-xml-parser";
const parser = new XMLParser();
let bedrock;
export class BedrockClient {
    constructor({ region = 'us-east-1', accessKeyId = process.env.AWS_ACCESS_KEY_ID, secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY, sessionToken = process.env.AWS_SESSION_TOKEN } = {}) {
        bedrock = new BedrockRuntimeClient({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey,
                sessionToken
            }
        });
    }
    async getChatCompletion({ messages, max_tokens_to_sample = 1000 }) {
        const response = JSON.parse(Buffer.from((await bedrock.send(new InvokeModelCommand({
            contentType: 'application/json',
            modelId: 'anthropic.claude-v2',
            body: Buffer.from(JSON.stringify({
                prompt: messages.map(({ type, message }) => `${type}: ${message.replaceAll('\n', '')}`).join('\n\n'),
                max_tokens_to_sample,
            })),
        })))?.body).toString())?.completion;
        const object = parser.parse(response);
        return { response, object };
    }
}
