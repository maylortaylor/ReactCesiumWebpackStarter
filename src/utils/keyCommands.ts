import { isLeftSideDrawerOpenAtom } from '../store/leftSideDrawerAtom';
import themeModeAtom from '../store/themeModeAtom';
import { useAtom } from 'jotai';
import { useHotkeys } from 'react-hotkeys-hook';

export function escapeKey() {
	const [{}, setToggleLeftSideDrawer] = useAtom(isLeftSideDrawerOpenAtom);
	const esc = useHotkeys('Escape', () => {
		console.log('escape');

		setToggleLeftSideDrawer((prevState) => !prevState);
	});
	return esc;
}

export function rightSquareBracket() {
	const [themeMode, setTheme] = useAtom(themeModeAtom);
	const esc = useHotkeys(']', () => {
		console.log(']');

		setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
	});
	return esc;
}
