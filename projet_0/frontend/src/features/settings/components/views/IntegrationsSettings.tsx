import { useState } from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle, ItemActions } from "@/components/ui/Item";
import { CodeBlock } from "@openai/apps-sdk-ui/components/CodeBlock";
import { Badge } from "@openai/apps-sdk-ui/components/Badge";
import { Button } from "@openai/apps-sdk-ui/components/Button";
import { Input } from "@openai/apps-sdk-ui/components/Input";
import { Copy, Check, Eye, EyeClosed } from "@openai/apps-sdk-ui/components/Icon";
import { supabase } from "@/services/supabase";
import { API_BASE_URL } from "@/services/api";

export function IntegrationsSettings() {
    const [token, setToken] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [revealed, setRevealed] = useState(false);

    const handleGenerateToken = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            setToken(session.access_token);
        }
    };

    const handleCopy = () => {
        if (token) {
            navigator.clipboard.writeText(token);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const maskedToken = token ? `${token.substring(0, 2)}********` : "";
    const displayToken = revealed ? token : maskedToken;

    return (
        <>
            <DialogHeader>
                <DialogTitle>Integrations & API</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-6 py-4">
                <div className="px-4 md:px-6 flex flex-col gap-8">
                    <section>
                        <h3 className="text-lg mb-2 text-primary">Introduction</h3>
                        <p className="text-sm text-secondary leading-relaxed">
                            This API reference describes the RESTful APIs you can use to interact with the Sentiment Analyzer platform.
                            REST APIs are usable via HTTP in any environment that supports HTTP requests.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg mb-2 text-primary">Authentication</h3>
                        <p className="text-sm text-secondary leading-relaxed mb-3">
                            The Sentiment Analyzer API uses session tokens for authentication. Create and manage your token below.
                        </p>
                        <p className="text-sm text-secondary leading-relaxed">
                            <strong className="text-primary">Remember that your token is a secret!</strong> Do not share it with others or expose it in any client-side code (browsers, apps). Tokens should be securely loaded from an environment variable or key management service on the server.
                        </p>
                    </section>
                </div>

                <ItemGroup>
                    <Item separator={true}>
                        <ItemContent>
                            <ItemTitle>Access Token</ItemTitle>
                            <ItemDescription className="mt-1">
                                Generate a session token to use in your API requests.
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            {token ? (
                                <div className="w-[200px]">
                                    <Input
                                        value={displayToken || ""}
                                        readOnly
                                        variant="soft"
                                        size="lg"
                                        pill={false}
                                        endAdornment={
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    color="primary"
                                                    pill={false}
                                                    size="3xs"
                                                    uniform
                                                    onClick={() => setRevealed(!revealed)}
                                                >
                                                    {revealed ? <EyeClosed /> : <Eye />}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    color="primary"
                                                    size="3xs"
                                                    pill={false}
                                                    uniform
                                                    onClick={handleCopy}
                                                >
                                                    {copied ? <Check className="text-success" /> : <Copy />}
                                                </Button>
                                            </div>
                                        }
                                    />
                                </div>
                            ) : (
                                <Button size="sm" color="primary" variant="solid" onClick={handleGenerateToken}>
                                    Generate Token
                                </Button>
                            )}
                        </ItemActions>
                    </Item>

                    <Item separator={true}>
                        <ItemContent>
                            <div className="flex items-center gap-3">
                                <Badge variant="soft" color="discovery">POST</Badge>
                                <ItemTitle>Analyze Text</ItemTitle>
                            </div>
                            <ItemDescription className="mt-1">
                                Analyze sentiment of a given text and retrieve a confidence score.
                            </ItemDescription>
                            <div className="mt-4">
                                <CodeBlock language="bash">{`curl -X POST ${API_BASE_URL}/analyze \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $YOUR_TOKEN" \\
  -d '{"text":"I absolutely love this service!"}'`}</CodeBlock>
                            </div>
                        </ItemContent>
                    </Item>

                    <Item separator={true}>
                        <ItemContent>
                            <div className="flex items-center gap-3">
                                <Badge variant="soft" color="success">GET</Badge>
                                <ItemTitle>Fetch History</ItemTitle>
                            </div>
                            <ItemDescription className="mt-1">
                                Retrieve the analysis history for the authenticated user.
                            </ItemDescription>
                            <div className="mt-4">
                                <CodeBlock language="bash">
                                    {`curl ${API_BASE_URL}/history \\
  -H "Authorization: Bearer $YOUR_TOKEN"`}
                                </CodeBlock>
                            </div>
                        </ItemContent>
                    </Item>

                    <Item separator={true}>
                        <ItemContent>
                            <div className="flex items-center gap-3">
                                <Badge variant="soft" color="danger">DELETE</Badge>
                                <ItemTitle>Delete History Item</ItemTitle>
                            </div>
                            <ItemDescription className="mt-1">
                                Delete a specific history entry by its ID.
                            </ItemDescription>
                            <div className="mt-4">
                                <CodeBlock language="bash">
                                    {`curl -X DELETE ${API_BASE_URL}/history/{id} \\
  -H "Authorization: Bearer $YOUR_TOKEN"`}
                                </CodeBlock>
                            </div>
                        </ItemContent>
                    </Item>

                    <Item separator={true}>
                        <ItemContent>
                            <div className="flex items-center gap-3">
                                <Badge variant="soft" color="discovery">PATCH</Badge>
                                <ItemTitle>Update History Item</ItemTitle>
                            </div>
                            <ItemDescription className="mt-1">
                                Update a specific history entry (e.g., user feedback ratings).
                            </ItemDescription>
                            <div className="mt-4">
                                <CodeBlock language="bash">
                                    {`curl -X PATCH ${API_BASE_URL}/history/{id} \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $YOUR_TOKEN" \\
  -d '{"rating": "up"}'`}
                                </CodeBlock>
                            </div>
                        </ItemContent>
                    </Item>

                    <Item separator={true}>
                        <ItemContent>
                            <div className="flex items-center gap-3">
                                <Badge variant="soft" color="danger">DELETE</Badge>
                                <ItemTitle>Clear History</ItemTitle>
                            </div>
                            <ItemDescription className="mt-1">
                                Clear all analysis history for the authenticated user.
                            </ItemDescription>
                            <div className="mt-4">
                                <CodeBlock language="bash">
                                    {`curl -X DELETE ${API_BASE_URL}/history \\
  -H "Authorization: Bearer $YOUR_TOKEN"`}
                                </CodeBlock>
                            </div>
                        </ItemContent>
                    </Item>

                    <Item separator={true}>
                        <ItemContent>
                            <div className="flex items-center gap-3">
                                <Badge variant="soft" color="warning">GET</Badge>
                                <Badge variant="soft" color="discovery">POST</Badge>
                                <ItemTitle>Configure Inference Model</ItemTitle>
                            </div>
                            <ItemDescription className="mt-1">
                                Get or set the ML model inference mode (<code>local</code> or <code>huggingface</code>). No auth required.
                            </ItemDescription>
                            <div className="mt-4 flex flex-col gap-4">
                                <CodeBlock language="bash">{`curl ${API_BASE_URL}/config/inference`}</CodeBlock>
                                <CodeBlock language="bash">{`curl -X POST ${API_BASE_URL}/config/inference \\
  -H "Content-Type: application/json" \\
  -d '{"mode": "local"}'`}</CodeBlock>
                            </div>
                        </ItemContent>
                    </Item>

                    <Item separator={true}>
                        <ItemContent>
                            <div className="flex items-center gap-3">
                                <Badge variant="soft" color="warning">GET</Badge>
                                <ItemTitle>Express API Health Check</ItemTitle>
                            </div>
                            <ItemDescription className="mt-1">
                                Check the backend Express API's operational status. No auth required.
                            </ItemDescription>
                            <div className="mt-4">
                                <CodeBlock language="bash">{`curl ${API_BASE_URL}/health`}</CodeBlock>
                            </div>
                        </ItemContent>
                    </Item>

                    <Item separator={false}>
                        <ItemContent>
                            <div className="flex items-center gap-3">
                                <Badge variant="soft" color="warning">GET</Badge>
                                <ItemTitle>Flask API Health Check</ItemTitle>
                            </div>
                            <ItemDescription className="mt-1">
                                Check the ML model API's operational status via the Express backend proxy. No auth required.
                            </ItemDescription>
                            <div className="mt-4">
                                <CodeBlock language="bash">{`curl ${API_BASE_URL}/health/analyzer`}</CodeBlock>
                            </div>
                        </ItemContent>
                    </Item>
                </ItemGroup>
            </div>
        </>
    )
}

