import type { User } from "@/types";


interface UserStatsProps {
    user?: User;
}

export default function UserStats({ user }: UserStatsProps) {

    const stats = [
        { value: user?.posts ?? 0, text: "Posts" },
        { value: user?.friends ?? 0, text: "Friends" },
        { value: user?.totalLikes ?? 0, text: "Likes" },
    ] as const;

    return (
        <div className="flex justify-start space-x-8">
            {
                stats.map((item) => (
                    <StatItem key={item.text} value={item.value} text={item.text} />
                ))
            }
        </div>
    )
}

interface StatItemProps {
    value: number;
    text: string;
}

const StatItem = ({ value, text }: StatItemProps) => {
    return (
        <div className="text-center">
            <div className="text-xl font-bold text-primary">{value}</div>
            <div className="text-sm text-muted-foreground">{text}</div>
        </div>
    )
}