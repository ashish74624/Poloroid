import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import type { NavItemInterface } from '@/types';


export default function NavItem({ NavIcon, helperText, src, badge }: NavItemInterface) {
    const content = <span className="relative inline-flex">
        <span className=' w-full flex justify-center items-center gap-2 ' >
            <NavIcon className="h-5 w-5" />
            <span className=' inline md:hidden'>{helperText}</span>
        </span>
        {
            badge &&
            <span className="absolute -top-2 -right-2 h-2 w-2 rounded-full bg-red-500" />
        }
    </span>
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button
                    variant="ghost"
                    className="hover:bg-accent w-full md:w-auto md:size-icon"
                    asChild
                >
                    {
                        src
                            ?
                            <Link to={src} className="flex items-center justify-center w-full " >
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