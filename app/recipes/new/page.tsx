import ImageUploader from '../../../components/ImageUploader';

export default function NewRecipePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">新增食譜</h1>
      <ImageUploader />
    </div>
  );
}
