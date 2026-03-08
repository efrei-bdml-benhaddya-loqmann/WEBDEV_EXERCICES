import { DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/Item";
import { Theme } from "@/components/ui/Theme";
import { Alert } from "@openai/apps-sdk-ui/components/Alert";
import { Badge } from "@openai/apps-sdk-ui/components/Badge";
import { Switch } from "@openai/apps-sdk-ui/components/Switch";
import { TextLink } from "@openai/apps-sdk-ui/components/TextLink";
import { useAppStore } from "@/store/useAppStore";
import type { ServiceStatus } from "@/types";


export function GeneralSettings() {
    const {
        repeatPing,
        setRepeatPing,
        expressStatus,
        flaskStatus,
        supabaseStatus
    } = useAppStore();
    const pingTimeout = 30000;

    const renderBadge = (status: ServiceStatus | 'warning', offlineColor: 'danger' | 'warning' = 'danger') => {

        if (status === 'checking') return <Badge variant="soft" color="secondary">Checking</Badge>;
        if (status === 'online') return <Badge variant="soft" color="success">Online</Badge>;
        if (status === 'warning') return <Badge variant="soft" color="warning">Warning</Badge>;
        return <Badge variant="soft" color={offlineColor}>Offline</Badge>;
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>General</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-2 py-4 px-6">
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

            <ItemGroup>
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
                        <ItemTitle>Monitor the status</ItemTitle>
                        <ItemDescription>The system will check the status of the different services every {pingTimeout / 1000}s</ItemDescription>
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
                        <Theme />
                    </ItemActions>
                </Item>
            </ItemGroup>
        </>
    )
}