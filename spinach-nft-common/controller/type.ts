export type ControllerOptionalElevationOpts = ({
  requiresElevated: true,
  executorUserId: string,
} | {
  requiresElevated: false,
  executorUserId?: never,
});
