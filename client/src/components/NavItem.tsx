import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import type { NavItemInterface } from '@/types';


export default function NavItem({ NavIcon, helperText, src, badge }: NavItemInterface) {
    const content = <span className="relative inline-flex">
        <NavIcon className="h-5 w-5" />
        {
            badge &&
            <span className="absolute -top-2 -right-2 h-2 w-2 rounded-full bg-red-500" />
        }
    </span>
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-accent" asChild>
                    {
                        src
                            ?
                            <Link to={src}>
                                {content}
                            </Link>
                            :
                            content
                    }

                </Button>
            </HoverCardTrigger>
            <HoverCardContent>
                {helperText}
            </HoverCardContent>
        </HoverCard>
    )
}