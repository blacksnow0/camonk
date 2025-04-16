import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/quiz");
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md text-center">
        <div className="mb-6">
          <div className="text-4xl mb-2">📝</div>
          <h1 className="text-2xl font-bold mb-2">Sentence Construction</h1>
          <p className="text-gray-500">
            Select the correct words to complete the sentence by arranging the
            provided options in the right order.
          </p>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-6">
          <div>
            <p className="font-medium">Time Per Question</p>
            <p>30 sec</p>
          </div>
          <div>
            <p className="font-medium">Total Questions</p>
            <p>10</p>
          </div>
          <div>
            <p className="font-medium">Coins</p>
            <p className="flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>
              0
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleStart}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
