// types.ts
export interface KpiCardProps {
    title: string;
    value: string;
    trend: string;
    trendUp: boolean;
    description: string;
    icon: React.ReactNode;
    linkHref: string;
}

export interface QuickAccessButtonProps {
    icon: React.ReactNode;
    label: string;
    href: string;
}

export interface EventItemProps {
    title: string;
    date: string;
    time: string;
    location: string;
}

export interface TaskItemProps {
    title: string;
    count: number;
    priority: 'high' | 'medium' | 'low';
}

export interface ActivityUser {
    name: string;
    role: string;
    avatar: string;
}

export interface ActivityItemProps {
    user: ActivityUser;
    action: string;
    resource: string;
    time: string;
}

export interface StatusItemProps {
    title: string;
    status: 'operational' | 'degraded' | 'down' | 'upcoming';
    details: string;
}