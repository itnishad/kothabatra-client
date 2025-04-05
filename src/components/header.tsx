import { useTheme } from '@/components/theme-provider';
import { Switch } from '@/components/ui/switch';

const Header = () => {
  const { setTheme } = useTheme();

  const handleChange = (data: boolean) => {
    if (data) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <div className="h-10 bg-amber-100 flex flex-row justify-end items-center px-5">
      <Switch onCheckedChange={handleChange} />
    </div>
  );
};

export default Header;
