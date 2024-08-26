import { z } from 'zod';

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 8;
};

export const validateGoal = (goal: any) => {
  const goalSchema = z.object({
    type: z.enum(['weightLoss', 'muscleGain', 'distanceRun']),
    target: z.number().min(1),
    deadline: z.date(),
  });
  return goalSchema.safeParse(goal).success;
};

export const validateProgress = (progress: any) => {
  const progressSchema = z.object({
    goalId: z.string(),
    progress: z.number().nonnegative(),
  });
  return progressSchema.safeParse(progress).success;
};