/**
 * Routes that should be hidden while the UI is locked down.
 */
export const restrictedRoutes = [
        "/",                   // Dashboard
        "/Status",             // Status
        "/Job/Webcam",         // Webcam
        "/Files/Macros",       // Macros
        "/Files/System",       // System
        "/Settings/General",   // Settings (General)
        "/Settings/Machine",   // Settings (Machine)
        "/Settings/Plugins",   // Settings (Plugins)
        "/Plugins/ObjectModel"  // Object Model Browser
];

/**
 * Path of the locked-down landing page.
 */
export const lockedLandingPage = "/BtnCmd";
