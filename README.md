# Bedrock Node API

A simple Node API wrapper for Amazon Bedrock.

Since the AWS SDK v3 for Javascript does not support any Bedrock calls at the moment, I decided to take matters into my own hands and create a simple and easy to use wrapper for interacting with Amazon's new suite of LLMs.

## Installation

### Basic install

```
npm install bedrock-node-api
```

### Managing dependencies

I decided not to bundle dependencies since many users will probably be running this inside of an AWS Lambda Node runtime, which includes `@aws-sdk/signature-v4-crt` and `@aws-sdk/protocol-http` by default. Otherwise, you'll have to include those packages.

```
npm install @aws-sdk/signature-v4-crt @aws-sdk/protocol-http
```

### Lambda permissions

If you're running this inside of AWS Lambda, make sure that you add an inline policy to grant permission to the Bedrock service- you won't have to worry about configuring the access keys.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "bedrock:*"
            ],
            "Resource": "*"
        }
    ]
}
```

## Usage

### Making a request

```
import { BedrockClient } from 'bedrock-node-api';
const bedrockClient = new BedrockClient({
    region: 'us-east-1', // Defaults to "us-east-1"
    accessKey: '*****', // Pre-fills with process.env.AWS_ACCESS_KEY_ID
    secretAccessKey: '*****', // Pre-fills with process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: '*****', // process.env.AWS_SESSION_TOKEN
});

export const bedrock = async () => {
    const response = await bedrockClient.invoke({
        prompt: `\n\nHuman: What time is it?\n\nAssistant:`
    });
    return response;
}
```

### Response

```
{
    completion: " Hello! I'm Claude, an AI assistant created by Anthropic.",
    stop_reason: 'stop_sequence'
}
```
