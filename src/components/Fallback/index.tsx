import { FaPersonFallingBurst } from 'react-icons/fa6';

export const Fallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  descriptor?: string;
  resetErrorBoundary?: () => void;
}) => {
  return (
    <div>
      <FaPersonFallingBurst />
      <p>Oof-dah: {error.message}</p>
      {resetErrorBoundary && (
        <button onClick={resetErrorBoundary}>Try Again</button>
      )}
    </div>
  );
};
