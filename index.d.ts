interface clientConfig {
    region?: string;
}

interface message {
    type: 'Assistant' | 'Human';
    message: string;
}

interface getChatCompletion {
    messages: message[];
    max_tokens_to_sample?: number;
}

declare class BedrockClient {
    constructor(config?: clientConfig)

    getChatCompletion(config: getChatCompletion): Promise<any>
}

export { BedrockClient }