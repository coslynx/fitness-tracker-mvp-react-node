import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const goals = await prisma.goal.findMany({
        where: { userId: session.user.id },
        orderBy: { deadline: 'asc' },
        include: { user: true },
      });

      const progressData = goals.map((goal) => {
        const progress = goal.progress;
        const target = goal.target;
        const percentage = (progress / target) * 100;
        return {
          goalId: goal.id,
          type: goal.type,
          target: goal.target,
          progress: goal.progress,
          percentage,
          deadline: goal.deadline,
        };
      });

      res.status(200).json(progressData);
    } catch (error) {
      console.error('Error fetching progress data:', error);
      res.status(500).json({ message: 'Error fetching progress data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}