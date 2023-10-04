# Bedrock Node

A full-featured Node wrapper for Amazon Bedrock with function calling.

This is a high-level Node library for Amazon Bedrock built on top of Amazon's officially supported `@aws-sdk/client-bedrock-runtime`.

It exposes easy methods for generating chat completions w/ optional function calling, generating embeddings, and generating images. The function calling solution is inspired by Langchain's function calling implementation on top of Anthropic Claude: https://js.langchain.com/docs/modules/model_io/models/chat/integrations/anthropic_functions.

## Installation

### Basic install

```
yarn add bedrock-node
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
import { BedrockClient } from 'bedrock-node';
const bedrockClient = new BedrockClient({
    region: 'us-east-1',                // Defaults to 'us-east-1'
    accessKey: '************',          // Defaults to process.env.AWS_ACCESS_KEY_ID
    secretAccessKey: '************',    // Defaults to process.env.AWS_SECRET_ACCESS_KEY
    sessionToken: '************',       // Defaults to process.env.AWS_SESSION_TOKEN
});

export const bedrock = async () => {
    const response = await bedrockClient({
        messages: [
            {
                type: 'Assistant',
                message: `You may only respond in the following XML shape:
                    <response>
                        <location type="string">
                            New York, NY
                        </location>
                        <temperature type="number">
                            81
                        </temperature>
                    </response>`
            },
            {
                type: 'Human',
                message: 'What is the weather in Miami, FL?'
            },
            {
                type: 'Assistant',
                message: '<response>'
            },
        ]
    });
    return response;
}
```

### Response

```
{
    "response": "\n  <location type=\"string\">Miami, FL</location>  \n  <temperature type=\"number\">85</temperature>\n</response>",
    "object": {
        "location": "Miami, FL",
        "temperature": 85
    }
}
```
