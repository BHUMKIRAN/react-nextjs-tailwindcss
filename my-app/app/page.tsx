'use client';
import Button from './components/Button';

export default function HomePage() {
  return (
    <div className="text-center">
      <p className='bg-gradient-to-r from-red-200 via-green-200 rounded-3xl h-50 w-50 shadow-2xl shadow-amber-500 text-green-700 flex justify-center'>Mah nigam ho </p>
      <select name="kiran" id="kiran">
        <option value="kiran1">kiran1</option>
        <option value="name">name</option>
        <option value='address'> address </option>
      </select>
    </div>
  );
}
