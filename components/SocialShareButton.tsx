import { useState } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { EmailShareButton, EmailIcon } from 'react-share';

interface SocialShareButtonProps {
  title: string;
  url: string;
  children: React.ReactNode;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({ title, url, children }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button onClick={handleShareClick} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        {children}
      </button>

      {isShareModalOpen && (
        <div className="absolute z-10 bg-white shadow-md rounded-md mt-2">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Share This</h2>
            <div className="flex space-x-4">
              <FacebookShareButton url={url} quote={title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <EmailShareButton url={url} subject={title}>
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
            <button onClick={handleCloseShareModal} className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShareButton;