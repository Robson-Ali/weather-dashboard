export default function ErrorMessage({ message }) {
  return (
    <p className="bg-red-500/80 text-white p-3 rounded-lg mb-4">
      {message}
    </p>
  );
}