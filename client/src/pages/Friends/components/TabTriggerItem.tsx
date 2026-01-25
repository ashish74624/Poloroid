import { TabsTrigger } from "@/components/ui/tabs";

export interface TabTriggerItemProps {
    NavIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    text: string;
    value: string;
}

export default function TabTriggerItem({ NavIcon, text, value }: TabTriggerItemProps) {
    return (
        <TabsTrigger value={value} className="flex items-center space-x-2  ">
            <NavIcon className="h-4 w-4 hidden md:inline" />
            <span>{text}</span>
        </TabsTrigger>
    )
}
