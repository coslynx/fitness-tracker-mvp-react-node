import { useState, useEffect } from 'react';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { useStore } from '@/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getGoals, getUserData } from '@/utils/api';
import Header from '@/components/Header';
import GoalInput from '@/components/GoalInput';
import ProgressChart from '@/components/ProgressChart';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const { addGoal, updateProgress } = useStore();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const goalsData = await getGoals();
        const userData = await getUserData();

        setGoals(goalsData);
        setUserData(userData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error gracefully, potentially display an error message to the user
      }
    };
    fetchData();
  }, []);

  const handleOpenGoalModal = () => {
    setIsGoalModalOpen(true);
  };

  const handleCloseGoalModal = () => {
    setIsGoalModalOpen(false);
  };

  const handleGoalSubmit = (newGoal) => {
    addGoal(newGoal);
    handleCloseGoalModal();
  };

  const handleProgressUpdate = (progressData) => {
    updateProgress(progressData);
  };

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-gray-100">
        <Head>
          <title>Fitness Tracker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-screen">Loading...</div>
          ) : (
            <>
              {/* Display Goals */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => (
                  <div key={goal.id} className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-bold mb-2">{goal.type}</h3>
                    <p className="text-gray-700 mb-4">Target: {goal.target}</p>
                    <p className="text-gray-700 mb-4">Deadline: {goal.deadline.toLocaleDateString()}</p>
                    <ProgressChart
                      data={{
                        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Example data
                        datasets: [
                          {
                            label: 'Progress',
                            data: [5, 10, 15, 20], // Example progress data
                            borderColor: '#2980b9',
                            backgroundColor: '#2980b9',
                          },
                        ],
                      }}
                      title={goal.type}
                    />
                  </div>
                ))}
              </div>

              {/* Add Goal Button */}
              <button onClick={handleOpenGoalModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Add New Goal
              </button>

              {/* Goal Input Modal */}
              {isGoalModalOpen && (
                <GoalInput onClose={handleCloseGoalModal} onSubmit={handleGoalSubmit} />
              )}
            </>
          )}
        </main>
      </div>
    </SessionProvider>
  );
};

export default Layout;