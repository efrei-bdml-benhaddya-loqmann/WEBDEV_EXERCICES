import { useEffect, useState } from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/Item";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Alert } from "@openai/apps-sdk-ui/components/Alert";
import { Badge } from "@openai/apps-sdk-ui/components/Badge";
import { Switch } from "@openai/apps-sdk-ui/components/Switch";
import { TextLink } from "@openai/apps-sdk-ui/components/TextLink";
import { checkExpressApiStatus, checkFlaskApiStatus, checkSupabaseStatus, type FlaskStatus } from "@/services/api";

type Status = 'checking' | 'online' | 'offline';
type FlaskState = FlaskStatus | { status: 'checking' };

export function GeneralSettings() {
    const [expressStatus, setExpressStatus] = useState<Status>('checking');
    const [flaskStatus, setFlaskStatus] = useState<FlaskState>({ status: 'checking' });
    const [supabaseStatus, setSupabaseStatus] = useState<Status>('checking');
    const [repeatPing, setRepeatPing] = useState(true);
    const pingTimeout = 30000;

    useEffect(() => {
        const verifyStatus = async () => {
            setExpressStatus(await checkExpressApiStatus() ? 'online' : 'offline');
            setFlaskStatus(await checkFlaskApiStatus());
            setSupabaseStatus(await checkSupabaseStatus() ? 'online' : 'offline');
        };
        if (!repeatPing)
            return

        verifyStatus();
        const intervalId = setInterval(verifyStatus, pingTimeout);
        return () => clearInterval(intervalId);

    }, [repeatPing]);

    const renderBadge = (status: Status | 'warning', offlineColor: 'danger' | 'warning' = 'danger') => {
        if (status === 'checking') return <Badge variant="soft" color="secondary">Checking</Badge>;
        if (status === 'online') return <Badge variant="soft" color="success">Online</Badge>;
        if (status === 'warning') return <Badge variant="soft" color="warning">Warning</Badge>;
        return <Badge variant="soft" color={offlineColor}>Offline</Badge>;
    };

    return (
        <div className="flex flex-col gap-4">
            <DialogHeader>
                <DialogTitle>General</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-2 px-6">
                {expressStatus === 'offline' && (
                    <Alert
                        variant="soft"
                        color="danger"
                        description={
                            <>Express API is unreachable.{' '}<TextLink href="http://localhost:3000/health" target="_blank">Ping Server</TextLink></>
                        }
                    />
                )}
                {flaskStatus.status === 'offline' && (
                    <Alert
                        variant="soft"
                        color="danger"
                        description={
                            <>Flask API is unreachable.{' '}<TextLink href="http://localhost:5000/health" target="_blank">Ping Server</TextLink></>
                        }
                    />
                )}
                {flaskStatus.status === 'warning' && (
                    <Alert
                        variant="soft"
                        color="warning"
                        description={
                            <>{flaskStatus.message || 'Flask API is running but reported a warning.'}{' '}<TextLink href="http://localhost:5000/health" target="_blank">Ping Server</TextLink></>
                        }
                    />
                )}
                {supabaseStatus === 'offline' && (
                    <Alert
                        variant="soft"
                        color="danger"
                        description={
                            <>Supabase is unreachable.{' '}<TextLink href="#">Check Connection</TextLink></>
                        }
                    />
                )}
            </div>

            <ItemGroup label="System Status">
                <Item separator={true}>
                    <ItemContent>
                        <ItemTitle>Express API</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        {renderBadge(expressStatus, 'danger')}
                    </ItemActions>
                </Item>
                <Item separator={true}>
                    <ItemContent>
                        <ItemTitle>Flask API</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        {renderBadge(flaskStatus.status, 'danger')}
                    </ItemActions>
                </Item>
                <Item separator={true}>
                    <ItemContent>
                        <ItemTitle>Supabase Database</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        {renderBadge(supabaseStatus, 'danger')}
                    </ItemActions>
                </Item>
                <Item separator={true}>
                    <ItemContent>
                        <ItemTitle>Surveiller le status</ItemTitle>
                        <ItemDescription>Le système va requêter les différents services toutes les {pingTimeout / 1000}s</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <Switch checked={repeatPing} onCheckedChange={setRepeatPing} />
                    </ItemActions>
                </Item>
                <Item separator={false}>
                    <ItemContent>
                        <ItemTitle>Theme</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        <ThemeToggle />
                    </ItemActions>
                </Item>
            </ItemGroup>
        </div>
    )
}