import { Container, ToggleThemeButton } from '@/components';

const NavBar = () => {
  return (
    <Container className="w-full py-5 flex items-center justify-between bg-light dark:bg-dark z-10 text-dark dark:text-light fixed top-0 left-0">
      <div className="bg-primary h-16 w-16 flex items-center justify-center rounded-full dark:bg-primaryDark cursor-default">
        <div className="bg-light h-[3.7rem] w-[3.7rem] rounded-full flex items-center justify-center text-sm font-semibold text-primary dark:text-primaryDark dark:bg-dark">
          Novus
        </div>
      </div>
      <div className="flex items-center">
        <button className="mr-6 px-6 py-2 text-light bg-primary rounded-xl hover:bg-light hover:text-dark border-[3px] border-transparent hover:border-primary transition-opacity dark:bg-primaryDark dark:text-dark dark:hover:text-light dark:hover:border-primaryDark dark:hover:border-[3px] dark:hover:bg-dark">
          Connect
        </button>
        <ToggleThemeButton className="flex items-center justify-center rounded-full p-1 bg-primary dark:bg-primaryDark text-light dark:text-dark w-[1.65rem] h-[1.65rem]" />
      </div>
    </Container>
  );
};

export default NavBar;
