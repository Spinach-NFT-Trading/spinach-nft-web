export const fileUploadGrantExpirySecs = 86400;

// Activating a grant means that at least a file was uploaded using the grant.
// Not "consuming" the grant because it's possible that the browser initiates multiple file uploads at once.
// In this case, multiple grants should not be needed.
export const fileUploadGrantExpiryAfterActivatedSecs = 60;
