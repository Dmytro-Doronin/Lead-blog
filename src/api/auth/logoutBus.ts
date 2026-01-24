let logoutHandler: null | (() => void) = null;

export function setLogoutHandler(handler: () => void) {
    logoutHandler = handler;
}

export function triggerLogout() {
    logoutHandler?.();
}
