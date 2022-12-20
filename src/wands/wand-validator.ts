import { Wand } from './data';

export function isWand(wand: unknown) {
    if (!wand) {
        return false;
    }

    if (!(wand as Wand).owner) {
        return false;
    }

    if (!(wand as Wand).wood) {
        return false;
    }

    return true;
}


export function isWandMiddleware(req, res, next) {
    if (isWand(req.body)) {
         next()
    } else {
        next(new Error('your wand is invalid'));
    }
    // next(isWand(req.body) ? undefined : new Error('your wand is invalid'));
}
