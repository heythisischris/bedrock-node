import { CrtSignerV4 } from '@aws-sdk/signature-v4-crt';
import { HttpRequest } from '@aws-sdk/protocol-http'
import { sha256 } from '#src/utils';

let globalRegion;
let signer;
export class BedrockClient {
    constructor({
        region = 'us-east-1',
        accessKeyId = process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken = process.env.AWS_SESSION_TOKEN
    }) {
        globalRegion = region;
        signer = new CrtSignerV4({
            service: 'bedrock',
            region,
            credentials: {
                accessKeyId,
                secretAccessKey,
                sessionToken,
            },
            sha256,
        });
    }
    async invoke({
        model = "anthropic.claude-v2",
        prompt = "\n\nHuman: test\n\nAssistant:",
        max_tokens_to_sample = 300,
        temperature = 1,
        top_k = 250,
        top_p = 0.999,
        stop_sequences = ["\n\nHuman:"],
        anthropic_version = "bedrock-2023-05-31",
    }) {
        const hostname = `bedrock-runtime.${globalRegion}.amazonaws.com`;
        const path = `model/${model}/invoke`;
        const method = 'POST';
        const body = JSON.stringify({
            prompt,
            max_tokens_to_sample,
            temperature,
            top_k,
            top_p,
            stop_sequences,
            anthropic_version,
        });
        const headers = { host: hostname, 'Content-Type': 'application/json' };
        const { headers: signedHeaders } = await signer.sign(new HttpRequest({ hostname, path, body, method, headers }));
        const response = await (await fetch(`https://${hostname}/${path}`, { method, body, headers: { ...signedHeaders, ...headers } })).json();
        return response;
    }
}