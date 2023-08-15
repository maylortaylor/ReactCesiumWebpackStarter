import { atom } from 'jotai';

const themeModeAtom = atom('light');
themeModeAtom.debugLabel = 'ThemeMode';

export default themeModeAtom;
