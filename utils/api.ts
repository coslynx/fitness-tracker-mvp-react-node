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

      res.status(200).json(goals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      res.status(500).json({ message: 'Error fetching goals' });
    }
  } else if (req.method === 'POST') {
    try {
      const { type, target, deadline } = req.body;

      const goal = await prisma.goal.create({
        data: {
          type,
          target,
          deadline: new Date(deadline),
          user: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });

      res.status(201).json(goal);
    } catch (error) {
      console.error('Error creating goal:', error);
      res.status(500).json({ message: 'Error creating goal' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, progress } = req.body;

      const goal = await prisma.goal.update({
        where: {
          id,
        },
        data: {
          progress,
        },
      });

      res.status(200).json(goal);
    } catch (error) {
      console.error('Error updating goal:', error);
      res.status(500).json({ message: 'Error updating goal' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      await prisma.goal.delete({
        where: {
          id,
        },
      });

      res.status(204).end();
    } catch (error) {
      console.error('Error deleting goal:', error);
      res.status(500).json({ message: 'Error deleting goal' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}