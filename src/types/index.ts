import { z } from 'zod';

export const FollowsSchema = z.object({
  broadcaster_id: z.string(),
  broadcaster_login: z.string(),
  broadcaster_name: z.string(),
  followed_at: z.iso.datetime(),
});

export type Follows = z.infer<typeof FollowsSchema>;

export const FollowsResponseSchema = z.object({
  data: FollowsSchema.array(),
  pagination: z.object({
    cursor: z.string().optional(),
  }),
  total: z.number(),
});

export type FollowsResponse = z.infer<typeof FollowsResponseSchema>;

export const UserSchema = z.object({
  broadcaster_type: z.string(),
  created_at: z.iso.datetime(),
  description: z.string(),
  display_name: z.string(),
  id: z.string(),
  login: z.string(),
  offline_image_url: z.string(),
  profile_image_url: z.string(),
  type: z.string(),
  view_count: z.number(),
});

export type User = z.infer<typeof UserSchema>;

export const UsersResponseSchema = z.object({
  data: UserSchema.array(),
});

export const TwitchResponseSchema = z.object({
  id: z.string(),
  display_name: z.string(),
  login: z.string(),
  profile_image_url: z.string(),
  offline_image_url: z.string(),
  followed_at: z.string(),
});

export const TwitchResponseListSchema = TwitchResponseSchema.array();

export type TwitchResponse = z.infer<typeof TwitchResponseSchema>;
export type TwitchResponseList = z.infer<typeof TwitchResponseListSchema>;
