import { z } from 'zod';

export const FollowsChannelSchema = z.object({
  broadcaster_id: z.string(),
  broadcaster_login: z.string(),
  broadcaster_name: z.string(),
  followed_at: z.iso.datetime(),
});

export type FollowsChannel = z.infer<typeof FollowsChannelSchema>;

export const FollowsResponseSchema = z.object({
  data: FollowsChannelSchema.array(),
  pagination: z.object({
    cursor: z.string().optional(),
  }),
  total: z.number(),
});

export type FollowsResponse = z.infer<typeof FollowsResponseSchema>;
