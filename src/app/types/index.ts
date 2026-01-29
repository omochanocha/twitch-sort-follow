import { z } from 'zod';

export type FollowsChannel = {
  broadcaster_id: string;
  broadcaster_login: string;
  broadcaster_name: string;
  followed_at: string;
};

export const FollowsChannelSchema = z.object({
  broadcaster_id: z.string(),
  broadcaster_login: z.string(),
  broadcaster_name: z.string(),
  followed_at: z.string(),
});

export const FollowsResponseSchema = z.object({
  data: FollowsChannelSchema.array(),
  pagination: z.object({
    cursor: z.string(),
  }),
});

export type FollowsResponse = z.infer<typeof FollowsResponseSchema>;
