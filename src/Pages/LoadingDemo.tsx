import { useState } from 'react';
import PageLayout from '../Components/Layout/PageLayout';
import Loading, { Spinner } from '../Components/Loading/Loading';
import { useTranslation } from 'react-i18next';

export default function LoadingDemo() {
  const [showFullScreen, setShowFullScreen] = useState(false);
  const { t } = useTranslation();

  return (
    <PageLayout title="Loading Demo - JinStore" description="Loading component demonstration">
      <div className="p-8 space-y-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Loading Components Demo
          </h1>
          <p className="text-gray-600">
            Different loading states for your application
          </p>
        </div>

        {/* Full Screen Loading Demo */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Full Screen Loading
          </h2>
          <p className="text-gray-600 mb-6">
            Click the button to see the full-screen loading overlay
          </p>
          <button
            onClick={() => setShowFullScreen(true)}
            className="px-6 py-3 bg-primary-100 text-white rounded-lg font-medium hover:bg-primary-200 transition-colors"
          >
            Show Full Screen Loading
          </button>
          {showFullScreen && (
            <>
              <Loading fullScreen message={t('loading.pleaseWait')} size="large" />
              {/* Auto hide after 3 seconds */}
              {setTimeout(() => setShowFullScreen(false), 3000)}
            </>
          )}
        </div>

        {/* Medium Size Loading */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Medium Loading (Default)
          </h2>
          <Loading message={t('loading.fetchingData')} size="medium" />
        </div>

        {/* Small Size Loading */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Small Loading
          </h2>
          <Loading message="Loading data..." size="small" />
        </div>

        {/* Inline Spinner */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Inline Spinner
          </h2>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-primary-100 text-white rounded-lg font-medium">
              <Spinner className="w-5 h-5" />
              <span>Processing...</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg font-medium">
              <Spinner className="w-5 h-5" />
              <span>Saving...</span>
            </button>
          </div>
        </div>

        {/* Usage Example Code */}
        <div className="bg-gray-900 text-white rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>
          <pre className="text-sm overflow-x-auto">
{`// Full screen loading
<Loading fullScreen message="Loading..." size="large" />

// Inline loading
<Loading message="Fetching data..." size="medium" />

// Simple spinner in button
<button>
  <Spinner className="w-5 h-5" />
  Processing...
</button>`}
          </pre>
        </div>
      </div>
    </PageLayout>
  );
}

