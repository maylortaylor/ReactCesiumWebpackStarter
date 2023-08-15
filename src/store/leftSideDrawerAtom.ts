import { atom } from 'jotai';

const isLeftSideDrawerOpenAtom = atom(false);
isLeftSideDrawerOpenAtom.debugLabel = 'IsLeftSideDrawerOpen';

export { isLeftSideDrawerOpenAtom };
