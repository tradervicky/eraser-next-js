import { ChevronDown, LogOut, Settings, Users } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

const SideNavTopSection = ({ user, setActiveTeamInfo }: { user: any, setActiveTeamInfo: (team: TEAM) => void }) => {
  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: '/teams/create',
      icon: Users,
    },
    {
      id: 2,
      name: 'Settings',
      path: '',
      icon: Settings,
    },
  ];

  const convex = useConvex();
  const router = useRouter();
  const [activeTeam, setActiveTeam] = useState<TEAM | null>(null);
  const [teamList, setTeamList] = useState<TEAM[]>([]);

  useEffect(() => {
    if (user) {
      getTeamList();
    }
  }, [user]);

  const getTeamList = async () => {
    try {
      const result = await convex.query(api.teams.getTeam, { email: user?.email });
      console.log('Query result:', result); // Log the result for debugging
      setTeamList(result); // Set the state to the array of teams
      if (result.length > 0) {
        setActiveTeam(result[0]); // Set the first team as active by default
        setActiveTeamInfo(result[0]);
      }
    } catch (error) {
      console.error('Error fetching team list:', error);
      setTeamList([]); // Optionally set to an empty array or handle the error state
    }
  };

  const handleTeamClick = (team: TEAM) => {
    setActiveTeam(team);
    setActiveTeamInfo(team);
  };

  const onMenuClick = (item: any) => {
    if (item?.path) {
      router.push(item.path);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className='flex items-center gap-3 hover:bg-slate-100 p-3 rounded-md cursor-pointer'>
          <Image src='/eraser-logo.png' alt="Logo" width={40} height={40} />
          <h2 className='flex gap-2 items-center font-bold text-[17px]'>{activeTeam?.teamName} <ChevronDown /></h2>
        </div>
      </PopoverTrigger>
      <PopoverContent className='ml-7 p-4'>
        <div>
          {Array.isArray(teamList) && teamList.map((team, index) => (
            <h2
              key={index}
              className={`p-2 hover:bg-blue-500 hover:text-white rounded-lg mb-1 cursor-pointer font-medium ${activeTeam?._id === team._id && 'bg-blue-500 text-white'}`}
              onClick={() => handleTeamClick(team)}
            >
              {team.teamName}
            </h2>
          ))}
        </div>
        <Separator className="my-2 bg-slate-100" />
        <div>
          {menu.map((item, index) => (
            <h2
              onClick={() => onMenuClick(item)}
              key={index}
              className='flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-sm'
            >
              <item.icon className='h-4 w-4' />
              {item.name}
            </h2>
          ))}
          <LogoutLink>
            <h2 className='flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-sm'>
              <LogOut className='h-4 w-4' />
              Logout
            </h2>
          </LogoutLink>
        </div>
        <Separator className="my-2 bg-slate-200" />
        {user && (
          <div className='mt-2 flex gap-2 items-center'>
            <Image src={user?.picture} alt='user' width={30} className='rounded-full' height={30} />
            <div>
              <h2 className='text-[14px] font-bold'>{user?.given_name} {user?.family_name}</h2>
              <h2 className='text-[12px] text-gray-500'>{user?.email}</h2>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default SideNavTopSection;
