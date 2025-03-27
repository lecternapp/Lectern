export default function AddLecture() {
  const [summary, setSummary] = useState('');
  const router = useRouter();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload a Lecture</h1>
      {/* form and upload logic here */}
    </div>
  );
}
